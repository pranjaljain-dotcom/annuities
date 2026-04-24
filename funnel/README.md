# Ethos Annuities — Mobile Funnel Prototype

Static HTML prototype of the Ethos annuities onboarding funnel. Designed for 375×812 (iPhone 14 viewport), viewed in a browser at desktop size with a simulated phone frame.

**GitHub Pages (V1):** https://pranjaljain-dotcom.github.io/annuities-funnel/v1/state-step/
**GitHub Pages (V2):** https://pranjaljain-dotcom.github.io/annuities-funnel/v2/state-step/

---

## Structure

```
annuities-funnel/
├── components.css        ← All shared CSS (fonts, layout, inputs, keyboards, footer)
├── components.js         ← All shared JS (window.EDS namespace)
├── fonts/                ← Hauss and Portada font files
├── v1/                   ← V1 funnel: keyboard slides up with the footer
│   ├── goals-step/
│   ├── state-step/
│   ├── zip-step/
│   ├── birthdate-step/
│   ├── name-step/
│   ├── email-step/
│   ├── phone-step/
│   └── otp-step/
└── v2/                   ← V2 funnel: keyboard slides independently, CTA stays pinned
    ├── goals-step/
    ├── state-step/
    ├── zip-step/
    ├── birthdate-step/
    ├── name-step/
    ├── email-step/
    ├── phone-step/
    └── otp-step/
```

---

## Viewing the Prototype

Serve the project from a local static server (required for font loading):

```bash
# Python
python3 -m http.server 3000

# Node
npx serve .
```

Then open:
- `http://localhost:3000/v1/goals-step/` — V1 funnel
- `http://localhost:3000/v2/goals-step/` — V2 funnel

---

## Screen Flow

Both versions follow the same linear flow:

```
goals-step → state-step → zip-step → birthdate-step → name-step → email-step → phone-step → otp-step
```

---

## V1 vs V2

| | V1 | V2 |
|---|---|---|
| **Keyboard** | Slides up with the footer as one unit | Slides up independently, over the CTA |
| **CTA** | Moves up with keyboard | Always pinned at bottom |
| **Keyboard container** | `.bottom-wrapper` (inside `slide-inner`) | `.keyboard-wrapper` (outside `slide-container`) |
| **CTA container** | `.bottom-wrapper` | `.bottom-wrapper--v2` |
| **JS init** | `EDS.initV1Keyboard(...)` | `EDS.initV2Keyboard(...)` |
| **Auto-focus** | Manual — `EDS.autoFocus(input)` | Built into `initV2Keyboard` |

---

## Shared Components (`components.js`)

All utilities live on `window.EDS`:

| Function | Description |
|---|---|
| `EDS.navigate(url)` | Slide-out animation then navigate |
| `EDS.buildQwertyKeyboard(el)` | Renders QWERTY keyboard into element |
| `EDS.buildIosKeyboard(el)` | Renders iOS phone pad (3×4, letter subtexts) |
| `EDS.buildNumericKeyboard(el)` | Renders plain numeric grid |
| `EDS.initV1Keyboard(input, wrapper, kb, onKey)` | V1 keyboard behavior |
| `EDS.initV2Keyboard(input, kbWrapper, footer, onKey)` | V2 keyboard behavior |
| `EDS.formatDate(digits)` | `"12312000"` → `"12/31/2000"` |
| `EDS.formatPhone(digits)` | `"4155551234"` → `"(415) 555-1234"` |
| `EDS.autoFocus(input, delay?)` | Focus input after optional delay |
| `EDS.initDropdown(config)` | Custom select dropdown — returns `{ getValue, showError }` |
| `EDS.initMobileFooter(wrapper)` | Sticky footer via `visualViewport` on real mobile |

---

## Per-Screen Reference

| Screen | Keyboard | Progress | Notes |
|---|---|---|---|
| goals-step | None (card selection) | 10% | 3 selectable goal cards, auto-advances on tap |
| state-step | None (dropdown) | 2% | `EDS.initDropdown` for 50 US states |
| zip-step | Numeric (V1) / iOS (V2) | 4% | 5-digit validation |
| birthdate-step | iOS phone pad | 6% | `EDS.formatDate`, heading + subtext |
| name-step | QWERTY | 5% | `top-group` + security row |
| email-step | QWERTY | 10% | `top-group` + security row + legal text |
| phone-step | iOS phone pad | 20% | `EDS.formatPhone`, 10-digit validation, legal text |
| otp-step | iOS phone pad | 30% | 6-digit OTP boxes, 30s resend timer, "Get my report" CTA |

---

## Related

- **LP Report Preview:** https://github.com/pranjaljain-dotcom/annuities-lp-report-preview
