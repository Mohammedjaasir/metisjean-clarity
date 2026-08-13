# Graph Report - .  (2026-08-13)

## Corpus Check
- Corpus is ~21,260 words - fits in a single context window. You may not need a graph.

## Summary
- 628 nodes · 805 edges · 84 communities (33 shown, 51 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.79)
- Token cost: 40,000 input · 17,935 output

## Community Hubs (Navigation)
- Brand Brief & Homepage Spec
- Hero, Wordmark & Footer Components
- Sheet, Sidebar & Form Inputs (UI kit)
- Lovable Error Reporting
- ESLint & Build Tooling Config
- TypeScript Compiler Config
- Carousel Component
- Overlay Primitives (Accordion, Popover, etc.)
- Button, Calendar & Pagination
- shadcn Component Registry Config
- Command Palette & Dialog
- Menubar Component
- Form Field System
- Styling & Icon Dependencies
- Package Scripts & Metadata
- Context Menu Component
- Dropdown Menu Component
- Alert Dialog Component
- Table Component
- Breadcrumb Component
- Drawer Component
- Navigation Menu Component
- Select Component
- Card Component
- Toggle & Toggle Group
- Alert Component
- Input OTP Component
- Avatar Component
- Badge Component
- Scroll Area Component
- Toast Notifications (Sonner)
- clsx Dependency
- cmdk Dependency
- date-fns Dependency
- Embla Carousel Dependency
- React Hook Form Resolvers
- Input OTP Dependency
- Motion Animation Dependency
- Radix Accordion Primitive
- Radix Alert Dialog Primitive
- Radix Aspect Ratio Primitive
- Radix Avatar Primitive
- Radix Collapsible Primitive
- Radix Context Menu Primitive
- Radix Dialog Primitive
- Radix Dropdown Menu Primitive
- Radix Hover Card Primitive
- Radix Label Primitive
- Radix Menubar Primitive
- Radix Navigation Menu Primitive
- Radix Popover Primitive
- Radix Progress Primitive
- Radix Scroll Area Primitive
- Radix Select Primitive
- Radix Separator Primitive
- Radix Slider Primitive
- Radix Slot Primitive
- Radix Switch Primitive
- Radix Tabs Primitive
- Radix Toggle Group Primitive
- Radix Tooltip Primitive
- React Day Picker Dependency
- React DOM Dependency
- React Hook Form Dependency
- React Resizable Panels Dependency
- Sonner Dependency
- Tailwind Merge Dependency
- Tailwind CSS Dependency
- Tailwind Vite Plugin Dependency
- TanStack React Query Dependency
- TanStack Router Dependency
- TanStack Start Dependency
- TanStack Router Plugin Dependency
- Three.js Dependency
- Tailwind Animate CSS Dependency
- Vaul Drawer Dependency
- Vite Tsconfig Paths Dependency
- Zod Validation Dependency
- robots.txt
- Accessibility Guidelines

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 22 edges
3. `Technical Stack (React, TS, Vite, Tailwind, Framer Motion, Three.js)` - 16 edges
4. `react` - 8 edges
5. `Reveal()` - 8 edges
6. `scripts` - 7 edges
7. `Metis Jean Brand Guidelines PDF` - 7 edges
8. `Hero Particle Animation (Three.js)` - 7 edges
9. `Blue Stripe Visual System` - 7 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `TanStack Start File-Based Routing` --semantically_similar_to--> `Technical Stack (React, TS, Vite, Tailwind, Framer Motion, Three.js)`  [INFERRED] [semantically similar]
  src/routes/README.md → README.md
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage Section Composition Flow** — readme_hero_section, readme_about_section, readme_mission_vision_section, readme_brand_values_section, readme_calm_authority_section, readme_capabilities_section, readme_insights_section, readme_contact_section, readme_footer_section [EXTRACTED 1.00]
- **Recommended React Components Implementing Sections** — readme_component_navbar, readme_component_hero, readme_component_particlefield, readme_component_paginationdots, readme_component_brandintroduction, readme_component_missionvision, readme_component_values, readme_component_capabilities, readme_component_philosophy, readme_component_insights, readme_component_contact, readme_component_stripedecoration, readme_component_footer [EXTRACTED 1.00]
- **Brand Identity Pillars from Guidelines PDF** — readme_dodger_blue_color, readme_space_grotesk_typography, readme_blue_stripe_visual_system, readme_brand_message, readme_brand_restrictions [EXTRACTED 1.00]

## Communities (84 total, 51 thin omitted)

### Community 0 - "Brand Brief & Homepage Spec"
Cohesion: 0.06
Nodes (46): Lovable Git History Sync Notice, About / Brand Introduction Section, Animation Guidelines, Blue Stripe Visual System, Metis Jean Brand Guidelines PDF, MetisJean Brand Messaging (Mission/Vision/Positioning), Brand Restrictions (Do NOT List), Brand Values Section (+38 more)

### Community 1 - "Hero, Wordmark & Footer Components"
Cohesion: 0.08
Nodes (27): Props, StripeDecoration(), Props, Wordmark(), Footer(), LINKS, ArcGallery(), IMAGES (+19 more)

### Community 2 - "Sheet, Sidebar & Form Inputs (UI kit)"
Cohesion: 0.05
Nodes (39): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+31 more)

### Community 3 - "Lovable Error Reporting"
Cohesion: 0.06
Nodes (33): consumeLastCapturedError(), describeError(), describeStatus(), originalConsoleError, safeStringify(), renderErrorPage(), LovableErrorOptions, LovableEvents (+25 more)

### Community 4 - "ESLint & Build Tooling Config"
Cohesion: 0.05
Nodes (37): eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @lovable.dev/vite-tanstack-config (+29 more)

### Community 5 - "TypeScript Compiler Config"
Cohesion: 0.06
Nodes (31): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+23 more)

### Community 6 - "Carousel Component"
Cohesion: 0.07
Nodes (25): react, react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem (+17 more)

### Community 7 - "Overlay Primitives (Accordion, Popover, etc.)"
Cohesion: 0.08
Nodes (15): AccordionContent, AccordionItem, AccordionTrigger, Checkbox, HoverCardContent, PopoverContent, Progress, RadioGroup (+7 more)

### Community 8 - "Button, Calendar & Pagination"
Cohesion: 0.19
Nodes (16): Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent, PaginationEllipsis() (+8 more)

### Community 9 - "shadcn Component Registry Config"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 10 - "Command Palette & Dialog"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 11 - "Menubar Component"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 12 - "Form Field System"
Cohesion: 0.15
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 13 - "Styling & Icon Dependencies"
Cohesion: 0.15
Nodes (13): class-variance-authority, lucide-react, dependencies, class-variance-authority, lucide-react, @radix-ui/react-checkbox, @radix-ui/react-radio-group, @radix-ui/react-toggle (+5 more)

### Community 14 - "Package Scripts & Metadata"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, build:dev, dev, format, lint (+3 more)

### Community 15 - "Context Menu Component"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 16 - "Dropdown Menu Component"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 17 - "Alert Dialog Component"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 18 - "Table Component"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 19 - "Breadcrumb Component"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 20 - "Drawer Component"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 21 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 22 - "Select Component"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 23 - "Card Component"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 24 - "Toggle & Toggle Group"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 25 - "Alert Component"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 26 - "Input OTP Component"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 27 - "Avatar Component"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 28 - "Badge Component"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

## Knowledge Gaps
- **331 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+326 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Styling & Icon Dependencies` to `Carousel Component`, `Package Scripts & Metadata`, `clsx Dependency`, `cmdk Dependency`, `date-fns Dependency`, `Embla Carousel Dependency`, `React Hook Form Resolvers`, `Input OTP Dependency`, `Motion Animation Dependency`, `Radix Accordion Primitive`, `Radix Alert Dialog Primitive`, `Radix Aspect Ratio Primitive`, `Radix Avatar Primitive`, `Radix Collapsible Primitive`, `Radix Context Menu Primitive`, `Radix Dialog Primitive`, `Radix Dropdown Menu Primitive`, `Radix Hover Card Primitive`, `Radix Label Primitive`, `Radix Menubar Primitive`, `Radix Navigation Menu Primitive`, `Radix Popover Primitive`, `Radix Progress Primitive`, `Radix Scroll Area Primitive`, `Radix Select Primitive`, `Radix Separator Primitive`, `Radix Slider Primitive`, `Radix Slot Primitive`, `Radix Switch Primitive`, `Radix Tabs Primitive`, `Radix Toggle Group Primitive`, `Radix Tooltip Primitive`, `React Day Picker Dependency`, `React DOM Dependency`, `React Hook Form Dependency`, `React Resizable Panels Dependency`, `Sonner Dependency`, `Tailwind Merge Dependency`, `Tailwind CSS Dependency`, `Tailwind Vite Plugin Dependency`, `TanStack React Query Dependency`, `TanStack Router Dependency`, `TanStack Start Dependency`, `TanStack Router Plugin Dependency`, `Three.js Dependency`, `Tailwind Animate CSS Dependency`, `Vaul Drawer Dependency`, `Vite Tsconfig Paths Dependency`, `Zod Validation Dependency`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **Why does `cn()` connect `Button, Calendar & Pagination` to `Sheet, Sidebar & Form Inputs (UI kit)`, `Carousel Component`, `Overlay Primitives (Accordion, Popover, etc.)`, `Command Palette & Dialog`, `Menubar Component`, `Form Field System`, `Context Menu Component`, `Dropdown Menu Component`, `Alert Dialog Component`, `Table Component`, `Breadcrumb Component`, `Drawer Component`, `Navigation Menu Component`, `Select Component`, `Card Component`, `Toggle & Toggle Group`, `Alert Component`, `Input OTP Component`, `Avatar Component`, `Badge Component`, `Scroll Area Component`?**
  _High betweenness centrality (0.248) - this node is a cross-community bridge._
- **Why does `react` connect `Carousel Component` to `Button, Calendar & Pagination`, `Sheet, Sidebar & Form Inputs (UI kit)`, `Styling & Icon Dependencies`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _331 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Brand Brief & Homepage Spec` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._
- **Should `Hero, Wordmark & Footer Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08405797101449275 - nodes in this community are weakly interconnected._
- **Should `Sheet, Sidebar & Form Inputs (UI kit)` be split into smaller, more focused modules?**
  _Cohesion score 0.05217391304347826 - nodes in this community are weakly interconnected._