# Ethos Design System — Reference

Figma file: `https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-`

---

## Library Keys

| Library | Key | Priority |
|---------|-----|----------|
| **EDSv2 new colors & fonts** | `lk-c3d605b291d50217b851551d5a34139a41964a102686a0be187ad398641856a3cb31bc3ab20c12b4715fbc5affdf1057f7ec1dfc82c7cdc24b7209aae51d85ff` | 1st — colors, fonts, button |
| **Ethos Design System (EDS)** | `lk-b940626b7b4a5264fc1c90eed3496f62e4845d00ab8c7701cd0195dbb9af531654d08b8630717027029590abdf89598ca0f0e5934e1a04c6a50de541482922ee` | 2nd — all other components |
| **Agent portal Design system** | `lk-ba1c532548e80f87097a1b416e662fcb3648e5ebcaa1100696ce9e1ef9ca23340385fcdb700569cf0859955d00fc3d38e5e445a27fc4a88dd728bc5481356022` | Last resort only |

**Search order (mandatory):** EDSv2 → EDS → Agent portal DS. Never skip to Agent portal DS without confirming a component is absent from EDSv2 and EDS.

---

## Component Keys

### EDSv2 Components

| Component | Key | Notes |
|-----------|-----|-------|
| `button` (component set) | `86785fa2ac3fa8233569e1265a45a4f2d68ec46c` | Primary CTA, all button variants |

### EDS Components

| Component | Key | Notes |
|-----------|-----|-------|
| `Input field` (component set) | `0a1fbedc47b8be83562f4ed9e6d260658ceb50f2` | Text inputs, all states |
| `Input text area` (component set) | `2e257ad73064617c0e76d530b61c639913d37166` | Multi-line text input |
| `Search input` (component set) | `2f3675e24eb986b4430383d6f40599020e044823` | Search field with icon |
| `Progress bar` (component set) | `603247f170fd3085b1e2b99b40d7279147fe56c7` | Funnel step progress |
| `Toggle` (component set) | `5143ea083ed5a1618481e30634498b40bc6a87dd` | On/off toggle switch |
| `Badge` (component set) | `87981ea93910e10c8f2ea19e35a06b4066a2728a` | Status badges |
| `Verified tick` (component set) | `e39c3c5c8b04c8f958da8e4b89edc739ad702fbb` | Verification checkmark |
| `Popovers` (component set) | `d66b5d4d4111518473f238a817a611a82ca8b414` | Popover overlays |
| `Modals & Toasts` (component set) | `ac17fac54677d029cf9d20720e4e0a75d85d835f` | Modal dialogs, toast notifications |
| `EDS.Thumbnail.Avatars` (component set) | `2e0a2130562c6378f42d130ad6db30651199d479` | User avatar / initials |
| `Carousel arrows` (component set) | `4a70245b2d85e95f51be468c3e5a9b14b358e3c6` | Prev/next carousel controls |
| `Checkbox card item` (component set) | `08c4104c00e3b3d84c60c3111ddb1ada2eed4a69` | Multi-select cards (e.g. dependents, goals) |
| `Chart` (component set) | `8cd7bd572258accbaad5175feff2b0bd2ac61623` | Data visualisation |
| `Security / security_lock_closed` | `ea780ee2ffa6fda6eab3d59d0cc74b0b9abb49a6` | Lock icon for security row |
| `Arrow / arrow_left_back` | `1592940b2c658f091c7926d6d346e0ebd153d4a2` | Back arrow in nav header |
| `Agent nav logo` (component set) | `8a004d8c02548e95458d8060d2883d74a9b10b32` | Ethos logotype for nav |

---

## EDSv2 Color Tokens

All fills/strokes must use `figma.variables.setBoundVariableForPaint()`. No hardcoded hex values.

### Primitive Tokens

| Token | Variable Key | Hex | Usage |
|-------|-------------|-----|-------|
| `Colors/Night 5` | `4b3146761d946f717cbe5d101c6039867b382157` | ~#f7f7f7 | Lightest bg tint |
| `Colors/Night 10` | `478b920ff2d6dc48c13b4e976d257a255e1b3dec` | ~#efefef | Subtle bg, dividers |
| `Colors/Night 20` | `8d87729263d94ebc9e5eeb0d73764b7eee2b04d8` | ~#d9d9d9 | Borders, strokes |
| `Colors/Night 40` | `dac17a7154d8abc0fe8170281d183a53089893ac` | ~#b3b3b3 | Disabled, placeholder |
| `Colors/Night 60` | `98942c30af0fcd2c5c47419048c1df5c892516ce` | `#8c8c8c` | Muted / hint text |
| `Colors/Night 80` | `7ff83965b0700e39ed9e56503483c06d845a57b5` | `#5d5d5d` | Secondary body text |
| `Colors/Night 100` | `89606c3c904c4b974f0d2b6bd15f27c0e5cfa1fe` | `#272727` | **Primary text, headings** |
| `Colors/White` | `c96d3d9a7cf4aebcf004abdc6de092880fa3e062` | `#ffffff` | Backgrounds, cards |
| `Colors/Black` | `fbf22a0dde59e8f8e721331c6ba291b50cbac989` | `#000000` | High-contrast only |
| `Colors/Cypress` | `866abdf92d55d806fb38304315e0a8da6c3a0290` | `#056257` | Brand teal, links, progress |
| `Colors/Clover` | `118570ab6b57bc2d0f7d32fcd3e70d0591cd4315` | — | Secondary green accent |
| `Colors/Citrine` | `ab12aef8e61cfb170cf58aa3fe06247a807fdf3c` | — | Yellow/warm accent |
| `Colors/Truffle` | `cb48805e1138c0c2a76f10e18563a403017d8b67` | — | Warm neutral |
| `Colors/CTA` | `21f376932e6e03c5d702b376579572fcce47828b` | — | CTA button backgrounds |
| `Colors/CTA 2` | `d9763aff3e1302c94af6357ed754b22e02170eb5` | — | Secondary CTA |

> **Key rule:** `Colors/Night 100` (`#272727`) for all heading/body text on white. `Colors/Black` is pure `#000000` — only for specific high-contrast needs.

### EDS Semantic Tokens (used in dropdown/menu components)

| Token | Hex | Usage |
|-------|-----|-------|
| `theme/fg/default` | `#272727` | Default foreground text |
| `theme/bg/surface` | `#ffffff` | Surface/card background |
| `theme/bg/muted` | `#D4D4D4` | Muted background, scrollbars |
| `theme/border/subtle` | `#F4F4F4` | Subtle dividers (e.g. dropdown item dividers) |
| `theme/accent/subtle-4x` | `#F3F7F7` | Selected item background in dropdown/menu |
| `theme/input/border/default` | `#D4D4D4` | Input field border (resting state) |

---

## EDSv2 Typography Styles

Apply via `figma.importStyleByKeyAsync(key)` then `node.textStyleId = style.id`.

Font family: **Portada** (headings/display) · **Hauss** (body/UI)

### Display
| Style | Key |
|-------|-----|
| `Display/Display XL` | `7ae59ded9085d24aab430a36656878b4c28878ac` |
| `Display/Display L` | `250aa6f543fe22efd2e29592d990ab2c53fde028` |

### Title
| Style | Key |
|-------|-----|
| `Title/Title L/Title L Regular` | `9efd795df45dfb08ac6d88aff2dedd5a0df1a299` |
| `Title/Title L/Title L Semi` | `4bd1d2cb47bb9fbd335a38188f49a3f053941062` |
| `Title/Title L/Title L Bold` | `d97d034b39e30b4b798066ef6a7ec494010538c0` |
| `Title/Title M/Title M ExtraBold` | `7ab30526db20c4530fdd9da7c0e96621d52d38ec` |
| `Title/Title M/Title M Bold` | `168cc3aea0a097b2a0412842742debc1517619a3` |
| `Title/Title M/Title M Semi` | `5ed9a28f827139ea9aa426da6cfa16bb1cae8ba9` |
| `Title/Title S` | `d62f158737d96e979e52e4978c97e93b76e1952f` |
| `Title/Title XS` | `17c6b0268bc7f3bcfa107a11d0219e126b436ae0` |

### Text (Body / UI)
| Style | Key |
|-------|-----|
| `Text/Text 2XL/Text 2XL Medium` | `78b0efb00a252a03146012015e64e31816c5db27` |
| `Text/Text XL/Text XL Medium` | `5ac73806cff3f57647a69959040a165c37c29e8a` |
| `Text/Text L/Text L Regular` | `673c32e9ae24d3d7b1766b7bd9618510b6c1766b` |
| `Text/Text L/Text L Medium` | `4b8e24265f73afa46e887d0cb8d835c7fb80a2a2` |
| `Text/Text L/Text L Bold` | `0dd89642e5118d51f1211a9a8b3805c606819d5f` |
| `Text/Text L/Text L AC Medium` | `06a3b174e95188659e61df71fec7e330284d35c6` |
| `Text/Text L/Text L AC Bold` | `e221ee9565de5c26b3eb6ceea42e2e79d307fd4f` |
| `Text/Text M/Text M Regular` | `36204c044fd99157b51a06b2964499e107c2f4a8` |
| `Text/Text M/Text M Medium` | `8a772cc7dbe706961383a67b1926c12c45a134ab` |
| `Text/Text M/Text M Bold` | `1c2946cf1ad0f39d4c9001d37fe3eabc1ee76df7` |
| `Text/Text S/Text S Regular` | `7b6a43a813695e8bee3ed57c061b9586e7110b70` |
| `Text/Text S/Text S Medium` | `83a23aa2397f5177f65fdbe4c7f6b6b1b060db3d` |
| `Text/Text XS/Text XS Regular` | `37e038a2bafb2658bcc016fa2d89eaed35cfcdea` |
| `Text/Text XS/Text XS Small Caps` | `9ea65b9b183c2abfd44ad93721736ea252ce9edc` |

### Quick Reference
| Use case | Style |
|----------|-------|
| Screen heading (mobile funnel) | `Title/Title M/Title M Bold` |
| Sub-heading | `Title/Title M/Title M Semi` |
| Body default | `Text/Text M/Text M Regular` |
| Body emphasis | `Text/Text M/Text M Medium` |
| Small body / helper text | `Text/Text S/Text S Regular` |
| Legal / fine print | `Text/Text S/Text S Regular` |
| Labels / captions | `Text/Text XS/Text XS Regular` |
| Nav label (bold) | `Text/Text M/Text M Bold` |

---

## Component Usage Rules

### Button (`button` from EDSv2 — key `86785fa2ac3fa8233569e1265a45a4f2d68ec46c`)
- **Default CTA variant:** `Theme=Black Solid, Breakpoint=Mobile Center, Size=md, State=Resting`
- **Hide icons for text-only:** `btn.setProperties({ "Leading Icon#38973:0": false, "Trailing Icon#38973:2": false })`
- **Never change `Breakpoint` when toggling icon booleans** — throws "Unable to find variant"
- Always inspect variant names first: `return set.children.map(c => c.name)`

### Input Field (`Input field` — key `0a1fbedc47b8be83562f4ed9e6d260658ceb50f2`)
- Common variant: `Size=md, Type=Default, Destructive=False, State=Placeholder`
- Properties: `Label text#42260:0` (TEXT), `Placeholder#42260:145` (BOOLEAN), `Label#3285:0` (BOOLEAN), `Hint text#3285:337` (BOOLEAN), `Help icon#3285:674` (BOOLEAN)
- Always set `Type=Default` to avoid a leading icon appearing unexpectedly
- Placeholder text node name is `user@ethoslife.com` — override `characters` directly after `loadFontAsync`

### Progress Bar (`Progress bar` — key `603247f170fd3085b1e2b99b40d7279147fe56c7`)
- Flush below nav, no extra padding
- Height: HUG

### Checkbox Card Item (`Checkbox card item` — key `08c4104c00e3b3d84c60c3111ddb1ada2eed4a69`)
- **Variant used:** `Breakpoint=Mobile, Size=md, Type=Icon simple, State=Default`
- **Selected node:** `41425:77342` — **Unselected node:** `41425:77624`
- **Unselected:** `background: #ffffff`, `border: 2px solid #d4d4d4`, `border-radius: 8px`, `padding: 16px`
- **Selected:** `background: #ffffff` (unchanged), `border-color: #056257`
- **Gap** between icon box and text: `16px`
- **Featured icon box:** `40×40px`, `background: #ffffff`, `border: 1px solid #f4f4f4`, `border-radius: 8px`, `box-shadow: 0px 1px 2px 0px rgba(16,24,40,0.05)`
- **Checkbox indicator:** `22×22px` circle, unselected = white + `2.75px solid #d4d4d4`; selected = filled `#056257` with white checkmark (`18×18` inner)
- **Never use** `box-shadow` for selected state — use `border-color` change

### Security Lock (`security_lock_closed` — key `ea780ee2ffa6fda6eab3d59d0cc74b0b9abb49a6`)
- Used in security row alongside text
- Row: HUG height, `paddingTop: 18, paddingBottom: 18`, `itemSpacing: 4`
- Text style: `Text/Text S/Text S Regular`, color: `Colors/Night 60`

### Back Arrow (`arrow_left_back` — key `1592940b2c658f091c7926d6d346e0ebd153d4a2`)
- Used in nav header left slot
- Size: AUTO — never use a text placeholder

### Agent Nav Logo (`Agent nav logo` — key `8a004d8c02548e95458d8060d2883d74a9b10b32`)
- **Correct variant:** `Option=Logotype, Dark mode=False` (key: `8d086fc33a6c1b7ffead75ad8d6ec64a201ae1c8`)
- **Never use** `Agent nav whitelable logo` — renders "SEQUOIA / Powered by ETHOS"
- Resize with `rescale(factor)`, NOT `resize(w, h)`
- Typical nav size: ~72×16px via `node.rescale(16 / naturalHeight)`
- Position: `layoutPositioning = "ABSOLUTE"`, centered: `x = (375 - w) / 2`, `y = (52 - h) / 2`

---

## Dropdown / Menu Pattern (EDS)

No native `<select>` — use a custom dropdown matching EDS menu style (node `39932-47261`).

**Visual spec:**
- Trigger: same styling as Input Field (2px `#D4D4D4` border, 8px radius, 56px min-height)
- Panel: `border: 1px solid #D4D4D4`, `border-radius: 8px`
- Shadow: `0px 4px 6px -2px rgba(16,24,40,0.03), 0px 12px 16px -4px rgba(16,24,40,0.08)`
- Items: `min-height: 48px`, padding `2px 6px`
- Item inner: `padding: 10px 10px 10px 8px`, `border-radius: 6px`
- Selected item background: `#F3F7F7` (`theme/accent/subtle-4x`)
- Dividers: `1px solid #F4F4F4` (`theme/border/subtle`)
- Chevron rotates 180° when open

---

## Shadows

| Name | Value |
|------|-------|
| `Shadow/lg` | `0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)` |
| Input resting | `0px 1px 2px 0px rgba(16,24,40,0.05)` |
| Input focused | `0px 1px 2px 0px rgba(16,24,40,0.05), 0 0 0 3px rgba(5,98,87,0.12)` |
| Footer | `0px -2px 4px 0px rgba(16,24,40,0.06), 0px -4px 8px 0px rgba(16,24,40,0.10)` |
