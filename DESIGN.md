# HKTCG Design System

## Style Prompt

Build a full-screen architectural retail film that carries the visitor through HKTCG as one controlled camera journey. The real store is the visual language: illuminated card walls, people crossing the entrance, white display plinths, mirrored ceilings, and the suspended translucent plaque T. Typography behaves like bold Hong Kong wayfinding and trading-card packaging. The experience is cinematic and precise, but human activity keeps it welcoming rather than luxury-cold.

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

- Opening composition: edge-to-edge store film with independent semantic HTML copy placed directly in the scene. Use localized edge and lower-third scrims only where copy needs contrast; never reserve a permanent split panel.
- Use a 4px spacing base with `8, 12, 16, 24, 32, 48, 64, 96` increments and fluid section spacing through `clamp()`.
- The cinematic walkthrough uses a sticky `100svh` stage inside a `600–700svh` native-scroll section. Scroll position maps to authored film time through narrative keyframes so each chapter receives useful reading time. No wheel hijacking or hard scroll snap.
- Keep an always-available route out: “Skip walkthrough.” Primary action: “Plan your visit.”
- After the walkthrough, return to normal document flow for Visit, Play, Trade/Grade/Consign, Events, specialist stores, Shop, hours, and directions.
- Avoid repeated equal cards. Prefer full-width chapters, paired media/copy compositions, lists, rails, and architectural rules.

## Signature Components

### Cinematic Threshold

The store entrance fills the viewport. A restrained edge scrim supports the line “Enter Hong Kong's card destination” while the authored camera settles forward through the real red portal. A slim progress line and chapter count are the only persistent walkthrough controls.

### Red T Reveal

The emotional midpoint. Approach the plaque sculpture as abstraction, then align to its recognizable T sightline. Dim the surrounding frame while preserving the real red plaques. Reveal the semantic HTML line in two beats: “The T stands for” then “Trading.” Reduced motion shows the final photograph and complete sentence immediately.

### Practical Actions

Rectangular, direct buttons with minimal rounding (`0–4px`). Primary actions use Signal Red with Obsidian text or Obsidian with Architectural White text. Hover and focus invert color or move a directional arrow; no wide soft shadows.

## Motion

- One custom-produced 19-second film, not a raw handheld clip. The film combines sharp HEIC anchors, the calmest native-60fps spans at 45–65% speed, soft continuity dissolves, and one Signal Red occlusion.
- Scroll position controls authored film time. Narrative keyframes deliberately give Entrance, Trading, Collect, Services, and Community different shares of the film while equalizing their reading distance.
- The desktop and mobile films are separate compositions: 16:9 at `1440×810` and 9:16 at `720×1280`. Both are H.264, muted, BT.709, fast-start, and GOP 6 for responsive seeking.
- Continuous progress writes video time, progress, and cue CSS custom properties inside one `requestAnimationFrame`; React state changes only when the active chapter changes.
- Preferred easing: ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` and ease-out-quint `cubic-bezier(0.22, 1, 0.36, 1)`.
- Interaction feedback: `100–250ms`; hero/scene entrances: `500–800ms`.
- No autoplay audio. Owner narration, if exposed, is user-initiated and captioned.

## Responsive Behavior

- Mobile is a dedicated portrait camera path, not a crop of the desktop film. Copy sits in the lower third while the store, plaque T, card walls, counter, and community tables retain their own intentional framing.
- Use the dedicated portrait master and portrait posters. Never request both desktop and mobile films.
- Shorten the pinned scroll distance to about `600svh` and reduce persistent controls on touch devices.
- All controls are at least 44×44px and do not depend on hover.
- Respect safe-area insets and mobile browser chrome with `svh`/`dvh` units.
- Reduced motion, slow connections, and data-saver use full-height semantic poster chapters in normal document flow instead of a frozen sticky film.

## Accessibility

- WCAG 2.2 AA contrast and focus visibility.
- All essential chapter copy is semantic HTML; visual-stage media is decorative to assistive technology.
- Preserve keyboard order, browser zoom, native scrolling, and a visible skip link.
- `prefers-reduced-motion` removes the sticky film, camera travel, parallax, scale, and plaque alignment while preserving content and chapter order as full-height poster scenes.
- Captions and a text transcript are required for any owner video.

## What NOT to Do

- No raw handheld video scrubbed by scroll position. Only the short, authored cinematic master with dense seek keyframes may be scroll-controlled.
- No split-screen chapter rail, permanent opaque copy panel, or card-based walkthrough UI.
- No free-roam 3D store as the primary experience.
- No neon gamer/cyberpunk styling, franchise fan art, or simulated card-game UI.
- No beige/cream body background, editorial serif styling, gradient text, glass cards, or decorative grid overlays.
- No repeated rounded SaaS cards, ghost-card shadows, or 32px section radii.
- No unverified “world's largest,” square-footage, investment, collection-value, or financial-return claims.
- Do not literalize preview defects such as clipped headline text or exact desktop geometry on mobile.
