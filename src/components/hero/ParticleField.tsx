import { useEffect, useRef, useState } from "react";

/**
 * Living field of data: a morphing spherical point cloud rendered with
 * THREE.Points + BufferGeometry. Falls back to a static SVG point cloud
 * when WebGL is unavailable or reduced motion is requested.
 */

function hash3(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

// smooth value noise in 3D (cheap, dependency free)
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const c000 = hash3(xi, yi, zi);
  const c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi);
  const c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1);
  const c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1);
  const c111 = hash3(xi + 1, yi + 1, zi + 1);

  return lerp(
    lerp(lerp(c000, c100, u), lerp(c010, c110, u), v),
    lerp(lerp(c001, c101, u), lerp(c011, c111, u), v),
    w,
  );
}

function StaticFallback() {
  const points = Array.from({ length: 520 }, (_, i) => {
    const g = 2.399963;
    const t = i / 520;
    const r = 46 * Math.sqrt(t) * (0.72 + 0.28 * hash3(i, 2, 7));
    const a = i * g;
    return {
      x: 50 + r * Math.cos(a),
      y: 50 + r * Math.sin(a),
      o: 0.25 + 0.6 * hash3(i, 5, 1),
      s: 0.35 + 0.4 * hash3(i, 9, 3),
    };
  });

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="MetisJean data field">
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.s} fill="#0b90f4" opacity={p.o} />
      ))}
    </svg>
  );
}

export function ParticleField({ variant = 0 }: { variant?: number }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const variantRef = useRef(variant);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        setFallback(true);
        return;
      }
      if (disposed) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const COUNT = isMobile ? 2600 : 6500;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFallback(true);
        return;
      }
      if (!renderer.getContext()) {
        setFallback(true);
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        host.clientWidth / Math.max(host.clientHeight, 1),
        0.1,
        100,
      );
      camera.position.z = 7.2;

      // base positions on a fibonacci sphere
      const base = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        const t = (i + 0.5) / COUNT;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 2.35 * (0.86 + 0.14 * hash3(i, 3, 11));
        base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        base[i * 3 + 2] = r * Math.cos(phi);
        seeds[i] = hash3(i, 17, 5);
      }

      const positions = new Float32Array(base);
      const colors = new Float32Array(COUNT * 3);
      const brand = new THREE.Color("#0b90f4");
      const deep = new THREE.Color("#1b3f7a");
      for (let i = 0; i < COUNT; i++) {
        const mix = seeds[i]!;
        const c = deep.clone().lerp(brand, 0.35 + 0.65 * mix);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.032 : 0.026,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        sizeAttenuation: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const onResize = () => {
        if (!host.clientWidth) return;
        renderer.setSize(host.clientWidth, host.clientHeight, false);
        camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
      });
      io.observe(host);

      const start = performance.now();
      let amp = 0.42;

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;

        const t = (performance.now() - start) / 1000;
        // each hero message nudges the field's turbulence
        const targetAmp = 0.3 + variantRef.current * 0.11;
        amp += (targetAmp - amp) * 0.02;

        const pos = geometry.getAttribute("position") as import("three").BufferAttribute;
        const arr = pos.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const bx = base[ix]!;
          const by = base[ix + 1]!;
          const bz = base[ix + 2]!;
          const n = noise3(bx * 0.85 + t * 0.16, by * 0.85, bz * 0.85 - t * 0.12);
          const k = 1 + (n - 0.5) * amp;
          arr[ix] = bx * k;
          arr[ix + 1] = by * k;
          arr[ix + 2] = bz * k;
        }
        pos.needsUpdate = true;

        pointer.x += (target.x - pointer.x) * 0.035;
        pointer.y += (target.y - pointer.y) * 0.035;

        points.rotation.y = t * 0.09 + pointer.x * 0.18;
        points.rotation.x = Math.sin(t * 0.05) * 0.08 + pointer.y * 0.12;

        renderer.render(scene, camera);
      };
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={hostRef} className="h-full w-full" />
      {fallback ? (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <StaticFallback />
        </div>
      ) : null}
    </div>
  );
}
