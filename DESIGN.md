# HKTCG Design System

## Style Prompt

Build an architectural retail walkthrough that begins at an obsidian threshold and opens into HKTCG's bright white store through a decisive red portal. The real store is the visual language: illuminated card walls, people crossing the entrance, white display plinths, black slatted gates, and the suspended translucent plaque T. Typography behaves like bold Hong Kong wayfinding and trading-card packaging. The experience is cinematic and precise, but human activity keeps it welcoming rather than luxury-cold.

## Colors

- **Signal Red** — `oklch(0.586 0.235 22.2)` / reference `#E21B3C`. Brand fields, architectural transitions, the T, large display emphasis, and focus indicators.
- **Deep Trading Red** — `oklch(0.49 0.205 22.2)`. Accessible small red text and pressed states on light surfaces.
- **Obsidian** — `oklch(0.147 0.009 270)` / reference `#0B0C0F`. Opening threshold, primary text, and dark cinematic surfaces.
- **Architectural White** — `oklch(0.971 0.004 106)` / reference `#F5F6F4`. Main gallery surface and light text on Obsidian.
- **Cool Silver** — `oklch(0.829 0.009 255)` / reference `#C7CBD0`. Secondary rules, subdued labels, and structural wayfinding.
- **White Surface** — `oklch(0.995 0.002 106)`. Elevated light copy surfaces over media when needed.

Use a committed strategy: red owns decisive transitions and major moments, while Obsidian and Architectural White alternate as spatial chapters. Never wash the entire page red, and never use gray text directly on red.

## Typography

- **Display and wayfinding:** Barlow Condensed, weights 600–800. Short headlines, chapter names, navigation, CTAs, and large statements. Uppercase is reserved for short phrases.
- **Body and bilingual copy:** Chiron Hei HK, weights 400–600. English and Traditional Chinese prose, practical information, and interface text.
- **Fallbacks:** `Arial Narrow`, `Helvetica Neue`, `PingFang HK`, `Microsoft JhengHei`, sans-serif.
- Hero display: fluid `clamp(3.6rem, 7.2vw, 6rem)`, line-height `0.92–0.98`, letter spacing no tighter than `-0.035em`.
- Section display: fluid `clamp(2.6rem, 5vw, 5rem)`.
- Body: `1rem–1.125rem`, line-height `1.5–1.65`, maximum measure `65ch`.
- Small uppercase labels use `0.06em–0.1em` tracking; do not repeat labels above every section.

## Layout

- Opening desktop composition: 43/57 asymmetric split. Obsidian copy chamber on the left; bright real store media on the right; a Signal Red architectural gate marks the threshold.
- Use a 4px spacing base with `8, 12, 16, 24, 32, 48, 64, 96` increments and fluid section spacing through `clamp()`.
- The cinematic walkthrough uses a sticky `100svh` stage with semantic scroll chapters above it. Native scrolling only; no wheel hijacking or hard scroll snap.
- Keep an always-available route out: “Skip walkthrough.” Primary action: “Plan your visit.”
- After the walkthrough, return to normal document flow for Visit, Play, Trade/Grade/Consign, Events, specialist stores, Shop, hours, and directions.
- Avoid repeated equal cards. Prefer full-width chapters, paired media/copy compositions, lists, rails, and architectural rules.

## Signature Components

### Threshold Hero

An Obsidian copy chamber and bright entrance photograph are joined by a Signal Red gate. The entrance image settles from a slightly tighter crop as the gate reveals the store. The headline is “Enter Hong Kong's card destination.”

### Walkthrough Rail

A compact, clickable chapter rail: Entrance, The T, Collect, Play, Auction, Community. It communicates progress without behaving like numbered decorative scaffolding.

### Red T Reveal

The emotional midpoint. Approach the plaque sculpture as abstraction, then align to its recognizable T sightline. Dim the surrounding frame while preserving the real red plaques. Reveal the semantic HTML line in two beats: “The T stands for” then “Trading.” Reduced motion shows the final photograph and complete sentence immediately.

### Practical Actions

Rectangular, direct buttons with minimal rounding (`0–4px`). Primary actions use Signal Red with Obsidian text or Obsidian with Architectural White text. Hover and focus invert color or move a directional arrow; no wide soft shadows.

## Motion

- One orchestrated opening, not uniform fade-and-rise on every section.
- Walkthrough media uses short independently playing plates with matched occlusion cuts and `400–650ms` crossfades; scroll changes chapters, not video time.
- Continuous progress writes to CSS custom properties inside one `requestAnimationFrame`; React state changes only when the active chapter changes.
- Preferred easing: ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` and ease-out-quint `cubic-bezier(0.22, 1, 0.36, 1)`.
- Interaction feedback: `100–250ms`; hero/scene entrances: `500–800ms`.
- No autoplay audio. Owner narration, if exposed, is user-initiated and captioned.

## Responsive Behavior

- Mobile is a vertical portal, not a scaled desktop split: portrait media first, horizontal red threshold, copy chamber, and a shorter chapter rail.
- Use dedicated portrait crops and clips. Do not center-crop desktop media when it removes the plaque sculpture or card walls.
- Shorten pinned chapter lengths and reduce the number of simultaneous layers on touch devices.
- All controls are at least 44×44px and do not depend on hover.
- Respect safe-area insets and mobile browser chrome with `svh`/`dvh` units.
- Slow connections and data-saver use poster crossfades instead of motion clips.

## Accessibility

- WCAG 2.2 AA contrast and focus visibility.
- All essential chapter copy is semantic HTML; visual-stage media is decorative to assistive technology.
- Preserve keyboard order, browser zoom, native scrolling, and a visible skip link.
- `prefers-reduced-motion` removes sticky camera travel, parallax, scale, and plaque alignment while preserving content and chapter order.
- Captions and a text transcript are required for any owner video.

## What NOT to Do

- No long raw video scrubbed by scroll position.
- No free-roam 3D store as the primary experience.
- No neon gamer/cyberpunk styling, franchise fan art, or simulated card-game UI.
- No beige/cream body background, editorial serif styling, gradient text, glass cards, or decorative grid overlays.
- No repeated rounded SaaS cards, ghost-card shadows, or 32px section radii.
- No unverified “world's largest,” square-footage, investment, collection-value, or financial-return claims.
- Do not literalize preview defects such as clipped headline text or exact desktop geometry on mobile.
