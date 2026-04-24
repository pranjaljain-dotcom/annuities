# Ethos Annuities — Mobile Funnel Prototype

Static HTML prototype of the Ethos annuities onboarding funnel. Designed for 375×812 (iPhone 14 viewport), viewed in a browser at desktop size with a simulated phone frame.

---

## Structure

```
Annuities/
├── components.css        ← All shared CSS (fonts, layout, inputs, keyboards, footer)
├── components.js         ← All shared JS (window.EDS namespace)
├── fonts/                ← Hauss and Portada font files
├── index.html            ← Entry point / flow selector
├── v1/                   ← V1 funnel: keyboard slides up with the footer
│   ├── goals-step/
│   ├── dependents-step/
│   ├── familiarity-step/
│   ├── return-type-step/
│   ├── income-age-step/
│   ├── growth-period-step/
│   ├── investment-amount-step/
│   ├── funding-source-step/
│   ├── state-step/
│   ├── zip-step/
│   ├── birthdate-step/
│   ├── spouse-age-step/
│   ├── email-step/
│   ├── phone-step/
│   ├── otp-step/
│   └── name-step/
└── v2/                   ← V2 funnel: keyboard slides independently, CTA stays pinned
    ├── goals-step/
    ├── dependents-step/
    ├── familiarity-step/
    ├── return-type-step/
    ├── income-age-step/
    ├── growth-period-step/
    ├── investment-amount-step/
    ├── funding-source-step/
    ├── state-step/
    ├── zip-step/
    ├── birthdate-step/
    ├── spouse-age-step/
    ├── email-step/
    ├── phone-step/
    ├── otp-step/
    └── name-step/
```

---

## Live Preview (GitHub Pages)

- [V1 funnel](https://pranjaljain-dotcom.github.io/annuities/v1/goals-step/) — `https://pranjaljain-dotcom.github.io/annuities/v1/goals-step/`
- [V2 funnel](https://pranjaljain-dotcom.github.io/annuities/v2/goals-step/) — `https://pranjaljain-dotcom.github.io/annuities/v2/goals-step/`

---

## Viewing the Prototype Locally

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
goals-step → dependents-step → familiarity-step → return-type-step → [income-age-step OR growth-period-step] → investment-amount-step → funding-source-step → state-step → zip-step → birthdate-step → [spouse-age-step] → email-step → phone-step → otp-step → name-step
```

Branch at return-type-step: goal=`retirement` → income-age-step; goal=`wealth` → growth-period-step; else → investment-amount-step.

Branch at birthdate-step: dependents includes `spouse` → spouse-age-step; else → email-step.

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
| goals-step | None (card selection) | 10% | 3 selectable goal cards, auto-advances on tap, saves `annuities_goal` to sessionStorage |
| dependents-step | None (multi-select cards) | 35% | 4 options (spouse/children/parent/other), ≥1 required, saves `annuities_dependents` to sessionStorage |
| familiarity-step | None (card selection) | 12% | 3 tap-to-advance cards, auto-advances to return-type-step |
| return-type-step | None (card selection) | 15% | 3 icon cards (Fixed rate / Index-linked / Not sure), branches on `annuities_goal` |
| income-age-step | None (dropdown) | 18% | `EDS.initDropdown`, ages 55–85; shown when goal=retirement |
| growth-period-step | None (card selection) | 18% | 2×2 grid: 3/5/7/10 Years; shown when goal=wealth |
| investment-amount-step | Numeric (V1) / iOS (V2) | 22% | Currency input with 3 quick-fill pills ($100K/$500K/$1M), saves to sessionStorage |
| funding-source-step | None (multi-select cards) | 25% | 5 options (employer/personal/bank/brokerage/other), ≥1 required, saves `annuities_funding_source` |
| state-step | None (dropdown) | 2% | `EDS.initDropdown` for 50 US states |
| zip-step | Numeric (V1) / iOS (V2) | 4% | 5-digit validation |
| birthdate-step | iOS phone pad | 6% | `EDS.formatDate`, heading + subtext; branches to spouse-age-step if spouse in dependents |
| spouse-age-step | iOS phone pad | 48% | Conditional screen; same format as birthdate-step; advances to email-step |
| email-step | QWERTY | 10% | `top-group` + security row + legal text |
| phone-step | iOS phone pad | 20% | `EDS.formatPhone`, 10-digit validation, legal text |
| otp-step | iOS phone pad | 30% | 6-digit OTP boxes, 30s resend timer, phone number masked from `sessionStorage`, CTA: "Get my report" |
| name-step | QWERTY | 5% | Final step; `top-group` + security row |

---

## Adding a New Screen

1. Create `v1/your-step/index.html` and `v2/your-step/index.html`
2. Reference shared files with `../../components.css` and `../../components.js`
3. Add only the progress width inline: `<style>.progress__fill { width: X%; }</style>`
4. Copy the status bar and nav HTML from any existing screen (never changes)
5. Use the appropriate keyboard builder and init function for the input type
6. Navigate with `EDS.navigate('../next-step/')`

See `CLAUDE.md` for full boilerplate and detailed per-screen specs.
