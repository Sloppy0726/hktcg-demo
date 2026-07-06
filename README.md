# HKTCG — scroll-cinema hero prototype

Scroll-driven cinematic landing page for [hktcg.com](https://www.hktcg.com/en).
Per the boss's brief: the page opens on the HKTCG logo wall and scroll slowly
pushes forward, arriving beside the boxed **T** — then doors, museum, showcase
hall, and the grand-floor reveal.

**The raw videos are NOT used on the site.** All six scenes are AI-generated
(Higgsfield **GPT Image 2**, `gpt_image_2`, 2k) using frames from the two
source videos as reference images, so they match the real venue's look:
white space, crimson accents, backlit shelving, the card-tile wordmark with
the boxed T, tagline "PLAY. COLLECT. CONNECT."

## Files
```
index.html            hero + landing (collections / new store / services / visit)
styles.css            white + signage-crimson palette
main.js               scroll-camera engine (push/pan per scene + crossfades)
assets/scenes/        scene-1-logo … scene-6-vending (1800px JPEG, ~1.3 MB total)
```

## Engine
Each scene is a full-bleed `object-fit: cover` image; scroll drives a
per-scene camera (`scale` + `translate` between `from`/`to` keys in
`SCENES`, main.js) with short crossfades at the window edges. Native scroll,
no dependencies, IO reveals below the fold. Reduced motion collapses the
hero to one viewport.

## Regenerating scenes
References were video frames uploaded via the Higgsfield MCP
(`media_upload` → `media_confirm`), then `generate_image` with
`model: gpt_image_2, aspect_ratio: 3:2, resolution: 2k, quality: medium`
(3 credits each). Prompts describe: logo wall / slat-door entrance /
red-cube museum / stocked showcase hall / grand floor with ring light /
vending aisle. Regenerate any scene and drop it into `assets/scenes/`.

## Facts used in copy (from the Grand Opening video, 2026-07-04)
26,000 sq ft (兩萬六千呎) · 零售 鑑定 收藏 對戰 展覽 · HK$80M museum
collection · tagline PLAY. COLLECT. CONNECT. · Mackenyu appeared at opening.

## Preview
Any static server, e.g. `python3 -m http.server 4710`.

## Ship options
A. Standalone page (GitHub Pages) linking into the Shopify store — zero risk.
B. Shopify Dawn custom section (site is Dawn 15.4.1).
C. Alternate Shopify homepage template.
