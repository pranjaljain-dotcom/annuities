# Annuities Project — Claude Context

## Project
Mobile annuities funnel (375×812). Static HTML prototype at `index.html`, Figma implementation at `https://www.figma.com/design/TDTRU2WqDgW1cgaBJnwmiR/Untitled`.

**Design system reference:** See [`EDS.md`](./EDS.md) for all component keys, color tokens, typography styles, and usage rules. Do not duplicate DS info here — always read EDS.md first.

---

## Figma Layout Patterns

### Mobile frame (375×812)
```
Wrapper (VERTICAL auto-layout, FIXED 375×812, itemSpacing=0)
├── Status bar       44px   FIXED height
├── Nav header       52px   FIXED height
├── Progress bar     HUG    (flush below nav, no extra padding)
├── Content area     FILL   (layoutGrow=1, paddingTop=36, paddingLeft=16, paddingRight=16)
│   ├── Heading group        (heading + subtext wrapped together, gap=8px between them)
│   ├── Input Group          (gap=36px below heading-group; gap=12px between input/fields and security row)
│   ├── Flex Spacer          (layoutGrow=1) ← pushes content up, footer stays pinned
│   └── Legal text
└── Footer           HUG   (sticky, white bg, paddingTop=16, paddingBottom=16, paddingLeft=16, paddingRight=16)
    └── Button (FILL width)
```

**Spacing rules:**
- Gap between heading (or heading+subtext group) and the input content below: always **36px**
- If a screen has heading + subtext: wrap them in a `heading-group` container with `gap: 8px` so the 36px parent gap doesn't bleed between heading and subtext
- Inner input spacing (input → security row): **12px**

### Nav header — left / center / right pattern
Auto-layout HORIZONTAL on a 375×52 frame, `paddingLeft: 16`, `paddingRight: 16`:
1. Left: **DS back arrow** — `importComponentByKeyAsync("1592940b2c658f091c7926d6d346e0ebd153d4a2")` (`AUTO`) — **never use a text placeholder**
2. Spacer: invisible frame, `layoutGrow = 1`
3. Right: "NEED HELP?" + phone number vertical stack (`AUTO`, right-aligned)
4. Logo: `layoutPositioning = "ABSOLUTE"`, centered:
   ```js
   logo.x = Math.round((375 - logo.width) / 2);
   logo.y = Math.round((52 - logo.height) / 2);
   ```
   **Do NOT use `layoutSizingHorizontal = "FILL"` on the logo.**

### Content area — flex spacer pattern
```js
const flexSpacer = figma.createFrame();
flexSpacer.fills = [];
contentFrame.appendChild(flexSpacer);
flexSpacer.layoutGrow = 1;           // AFTER appendChild
flexSpacer.layoutSizingVertical = "FILL";
```

### Sticky footer
```js
footer.layoutMode = "VERTICAL";
footer.paddingTop = footer.paddingBottom = footer.paddingLeft = footer.paddingRight = 16;
footer.fills = [whiteColorFill];  // bound to Colors/White token
```

---

## HTML Prototype — Screen Architecture

All screens live under `v1/` or `v2/`. Each version is a complete, self-contained funnel. Shared code lives at the root:

```
Annuities/
├── components.css        ← all shared CSS (fonts, layout, inputs, keyboards, footer)
├── components.js         ← all shared JS (window.EDS namespace)
├── fonts/
├── v1/                   ← V1 funnel (keyboard slides with footer as one unit)
│   ├── goals-step/
│   ├── familiarity-step/
│   ├── return-type-step/
│   ├── income-age-step/
│   ├── growth-period-step/
│   ├── dependents-step/
│   ├── state-step/
│   ├── zip-step/
│   ├── birthdate-step/
│   ├── name-step/
│   ├── email-step/
│   ├── phone-step/
│   └── otp-step/
└── v2/                   ← V2 funnel (keyboard slides independently, CTA never moves)
    ├── goals-step/
    ├── familiarity-step/
    ├── return-type-step/
    ├── income-age-step/
    ├── growth-period-step/
    ├── dependents-step/
    ├── state-step/
    ├── zip-step/
    ├── birthdate-step/
    ├── name-step/
    ├── email-step/
    ├── phone-step/
    └── otp-step/
```

### Navigation flow (both versions)
`goals-step` → `familiarity-step` → `return-type-step` → `[income-age-step OR growth-period-step]` → `dependents-step` → `state-step` → `zip-step` → `birthdate-step` → `name-step` → `email-step` → `phone-step` → `otp-step`

All navigation uses `EDS.navigate('../next-step/')` (relative, same-version folder).

---

## HTML Prototype — Shared Files

Every screen imports both shared files with `../../` prefix (two levels up from `v1/screen/` or `v2/screen/`):
```html
<link rel="stylesheet" href="../../components.css" />
<script src="../../components.js"></script>
```

The only inline `<style>` allowed per screen is the progress fill width:
```html
<style>.progress__fill { width: X%; }</style>
```

### Progress fill widths
| Screen | Width |
|---|---|
| state-step | 2% |
| zip-step | 4% |
| birthdate-step | 6% |
| name-step | 5% |
| email-step | 10% |
| phone-step | 20% |

---

## HTML Prototype — V1 vs V2 Keyboard Patterns

### V1 — keyboard slides up with footer as one unit
```
.bottom-wrapper  (position: absolute, bottom: 0, z-index: 100)
  └── .footer  (Next button)
  └── keyboard div  (appended by JS)
```

The entire `bottom-wrapper` translates up on input focus, hiding the keyboard by default. The keyboard is appended inside `bottom-wrapper` via JS, never in HTML.

**HTML structure:**
```html
<div class="bottom-wrapper" id="bottomWrapper">
  <div class="footer">
    <button class="btn-next" id="btnNext">Next</button>
  </div>
</div>
```

**JS pattern:**
```js
var keyboard = document.createElement('div');
EDS.buildXxxKeyboard(keyboard);
bottomWrapper.appendChild(keyboard);
EDS.initV1Keyboard(inputEl, bottomWrapper, keyboard, function(key) { /* handle key */ });
EDS.autoFocus(inputEl);          // V1 does NOT auto-focus — must call separately
```

### V2 — keyboard slides independently, CTA never moves
```
.keyboard-wrapper  (position: absolute, bottom: 0, z-index: 250 — slides up)
  └── keyboard div
.bottom-wrapper--v2  (position: absolute, bottom: 0, z-index: 200 — always visible)
  └── .footer  (Next button)
```

Keyboard slides up over the CTA. The CTA stays pinned at the bottom at all times.

**HTML structure:**
```html
<!-- slide-container / slide-inner wraps content only, then OUTSIDE: -->
<div class="keyboard-wrapper" id="keyboardWrapper"></div>
<div class="bottom-wrapper--v2" id="bottomWrapper">
  <div class="footer">
    <button class="btn-next" id="btnNext">Next</button>
  </div>
</div>
```

**JS pattern:**
```js
var keyboard = document.createElement('div');
EDS.buildXxxKeyboard(keyboard);
keyboardWrapper.appendChild(keyboard);
EDS.initV2Keyboard(inputEl, keyboardWrapper, bottomWrapper, function(key) { /* handle key */ });
// NO separate EDS.autoFocus — initV2Keyboard handles it internally
```

---

## HTML Prototype — EDS Keyboard Builders

| Function | Keyboard type | Used for |
|---|---|---|
| `EDS.buildQwertyKeyboard(el)` | Full QWERTY | name, email |
| `EDS.buildIosKeyboard(el)` | Numeric phone pad (3×4 grid, letter subtexts) | birthdate, zip (v2), phone |
| `EDS.buildNumericKeyboard(el)` | Plain numeric grid (no subtexts) | zip (v1) |

### Key handler signatures
`initV1Keyboard(inputEl, bottomWrapper, keyboardEl, onKey)`
`initV2Keyboard(inputEl, keyboardWrapper, bottomWrapper, onKey)`

Both call `onKey(key)` where `key` is a string: a character, `"delete"`, `"return"`, `"space"`, `"shift"`, `"alt"`, or `"noop"`.

### Other EDS utilities
```js
EDS.navigate('../next-step/')        // slide-out animation then location change
EDS.formatDate(digits)               // "12312000" → "12/31/2000"
EDS.formatPhone(digits)              // "4155551234" → "(415) 555-1234"
EDS.autoFocus(inputEl, delay?)       // focuses input after optional delay (ms)
EDS.initDropdown(config)             // builds custom select; returns { getValue, showError }
EDS.initMobileFooter(bottomWrapper)  // activates visualViewport sticky footer on mobile
```

---

## HTML Prototype — Per-Screen Reference

### goals-step (card selection — no keyboard)
- 3 tap-to-advance cards: Guaranteed retirement income (`retirement`), Build wealth tax deferred (`wealth`), I'm not sure yet (`unsure`)
- Saves selection to `sessionStorage.setItem('annuities_goal', value)` on tap
- Auto-advances to `../familiarity-step/` after 300ms
- No footer/CTA

### familiarity-step (card selection — no keyboard)
- 3 tap-to-advance cards: "I'm just starting to learn", "I know the basics", "I'm very familiar"
- Auto-advances to `../return-type-step/` after 300ms
- No footer/CTA

### return-type-step (card selection — no keyboard)
- 3 icon cards (icon left 40×40 + text right): Fixed rate (Shield Check icon), Index-linked (Financial Growth icon), Not sure (Lightbulb icon)
- Conditional navigation: reads `sessionStorage.getItem('annuities_goal')` → `retirement` → `../income-age-step/`; `wealth` → `../growth-period-step/`; else → `../dependents-step/`
- Auto-advances after 300ms
- No footer/CTA

### income-age-step (dropdown — no keyboard)
- Shown when goal=`retirement`
- Input: `EDS.initDropdown`, label "Age", placeholder "Select an age", options 55–85 years old
- V1: uses `bottom-wrapper`; V2: uses `bottom-wrapper--v2`
- Navigates to `../dependents-step/`

### growth-period-step (card selection — no keyboard)
- Shown when goal=`wealth`
- 2×2 grid of 4 cards: 3 Years, 5 Years, 7 Years, 10 Years
- Auto-advances to `../dependents-step/` after 300ms
- No footer/CTA

### state-step (dropdown — no keyboard)
- Input: custom EDS dropdown (`EDS.initDropdown`)
- No keyboard builder needed
- V1: uses `bottom-wrapper`; V2: uses `bottom-wrapper--v2`
- No `EDS.autoFocus`

### zip-step
- Input: numeric, maxlength 5
- V1: `EDS.buildNumericKeyboard` + `EDS.initV1Keyboard` + `EDS.autoFocus(zipInput)`
- V2: `EDS.buildIosKeyboard` + `EDS.initV2Keyboard`
- Validation: must be exactly 5 digits

### birthdate-step
- Input: `type="text"` `inputmode="numeric"` `placeholder="mm/dd/yyyy"` `maxlength="10"`
- Both versions use `EDS.buildIosKeyboard`
- Uses `EDS.formatDate(digits)` to auto-format as user types
- Has `heading-group` wrapper (heading + subtext, gap: 8px)
- V1: `EDS.autoFocus(bdInput)` (no delay); V2: handled by initV2Keyboard

### name-step
- Input: `type="text"` `autocomplete="name"` `autocapitalize="words"`
- Both versions use `EDS.buildQwertyKeyboard`
- Key handler: `delete`, `return` (blur), `space` (append ' '), ignore `shift`/`alt`, else append key
- V1: `EDS.autoFocus(nameInput, 100)` (100ms delay); V2: handled by initV2Keyboard
- Has `top-group` wrapper (question-and-input + security-row, gap: 12px)

### email-step
- Input: `type="email"` `autocomplete="off"`
- Both versions use `EDS.buildQwertyKeyboard`
- Same key handler as name-step
- Has `top-group` + `security-row` + `.legal` consent text
- Validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- V1: `EDS.autoFocus(emailInput, 100)`;  V2: handled by initV2Keyboard

### phone-step
- Input: `type="tel"` `inputmode="tel"` `placeholder="(212) 555-1234"` `autocomplete="tel"`
- Both versions use `EDS.buildIosKeyboard`
- Uses `EDS.formatPhone(digits)` on every key press
- Key handler: digits only (skip `noop`), max 10 digits; `delete` strips last digit then reformats
- Has `top-group` + `security-row` + `.legal` consent text
- Validation: must be exactly 10 digits
- V1: `EDS.autoFocus(phoneInput, 350)` (350ms delay for slide-in animation); V2: handled by initV2Keyboard

---

## HTML Prototype — Boilerplate Reference

Every screen follows this exact HTML skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Annuities – [Screen title]</title>
  <link rel="stylesheet" href="../../components.css" />
  <style>.progress__fill { width: X%; }</style>
</head>
<body>
  <div class="phone">
    <!-- status-bar (copy from any existing screen — never changes) -->
    <!-- nav (copy from any existing screen — never changes) -->
    <div class="progress">
      <div class="progress__track"><div class="progress__fill"></div></div>
    </div>
    <div class="slide-container">
    <div class="slide-inner" id="slideInner">
    <div class="content">
      <!-- screen-specific content -->
      <div class="spacer"></div>
      <!-- optional: legal text -->
    </div>
    <!-- V1 only: bottom-wrapper goes INSIDE slide-inner -->
    </div></div>
    <!-- V2 only: keyboard-wrapper and bottom-wrapper--v2 go OUTSIDE slide-inner, inside .phone -->
  </div>
  <script src="../../components.js"></script>
  <script>/* screen-specific JS */</script>
</body>
</html>
```

**Key structural rule:** In V1 the `bottom-wrapper` is the last child inside `slide-inner`. In V2 the `keyboard-wrapper` and `bottom-wrapper--v2` are children of `.phone`, outside `slide-container` entirely.

---

## Pre-Flight Checklist for Figma Work

- [ ] Read EDS.md before starting — confirm component keys and tokens
- [ ] Searched for existing DS component before building manually
- [ ] Used `return set.children.map(c => c.name)` to inspect variant names before choosing
- [ ] EDSv2 searched first → EDS second → Agent portal DS only as last resort
- [ ] All text nodes have an EDSv2 text style applied (not raw font)
- [ ] All fill colors bound to EDSv2 variable tokens (not hardcoded hex)
- [ ] Heading/body text uses `Colors/Night 100`, not `Colors/Black`
- [ ] Component instance resizing uses `rescale(factor)`, not `resize(w, h)`
- [ ] Button instances: `Leading Icon` and `Trailing Icon` set to `false` if text-only
- [ ] Nav logo: `Agent nav logo` → `Option=Logotype, Dark mode=False`
- [ ] `layoutSizingHorizontal/Vertical = "FILL"` set **after** `parent.appendChild(child)`
- [ ] New top-level nodes positioned away from (0,0)
- [ ] Every `use_figma` script `return`s all created/mutated node IDs
