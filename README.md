# HKTCG — one-shot scroll hero prototype

Scroll-driven cinematic landing page for [hktcg.com](https://www.hktcg.com/en).
The hero is shaped after the website shown in the reference reel: a continuous
moving-camera walkthrough with refined copy over the scene and a small "scroll
to take the tour" prompt.

The page does not autoplay a video. Scroll maps directly to still frames from a
continuous walkthrough, making the website itself feel like a one-shot camera
tour of the HKTCG flagship.

**The raw store videos are not shipped.** The walkthrough is AI-generated:
a movement-only cut of the real venue video drives Seedance 2.0 as a *video
reference* (camera path and spatial order), the GPT Image 2 stills drive it
as *image references* (the clean person-free look), and the resulting
15s 1080p one-shot tour is cut into the frames in `assets/walk/`.

## Files
```
index.html            hero + landing (collections / new store / services / visit)
styles.css            moving-camera hero + white/signage-crimson landing palette
main.js               scroll-film engine (canvas frame scrub + blend)
assets/walk/          walk-0001 … walk-0387 (continuous walkthrough frames)
assets/film/          legacy generated walkthrough frames
assets/scenes/        the 6 master stills (also used in landing cards)
PRODUCT.md            project context for future design work
```

## Engine
Canvas frame scrub (from the SolaraLab site): scroll maps to a fractional
frame index, base frame + alpha-blended next frame, nearest-loaded fallback.
Native scroll, no dependencies, IO reveals below the fold. Reduced motion
collapses the hero to one viewport.

## Regenerating the walkthrough
1. Movement reference: concatenate caption-free camera-move segments of the
   venue video with ffmpeg (`-nostdin` in loops; segments used: 4.4+2.6,
   19.5+2.0, 22.9+2.0, 45.4+3.0 — the presenter's door segment is EXCLUDED,
   or Seedance copies him into the output).
2. Generate: `generate_video` `seedance_2_0` (15s, 1080p, std, silent, 16:9,
   135 cr) with the reference as `video_references` and the GPT Image 2
   stills (logo wall / doors / museum / hall) as `image_references`; prompt
   the full tour order and hammer "completely vacant, no people, no captions".
   If a `preset_recommendation` notice comes back, retry with
   `declined_preset_id` to generate literally.
3. Frames: `ffmpeg -i tour.mp4 -vf "fps=12,scale=1280:720" -q:v 6
   assets/walk/walk-%04d.jpg`, update `__FRAME_COUNT` in `index.html`.

Legacy generated clips:
1. Stills: `generate_image` `gpt_image_2` (3:2, 2k medium, 3 cr) with a venue
   frame as reference — prompts describe logo wall / doors / museum / hall /
   grand floor / vending.
2. Motion: `generate_video` `kling3_0` (std, sound off, 5s, 7.5 cr) with the
   still's job_id as `start_image` and a camera-move prompt
   (dolly-in / walk-through / orbit / lateral pan / aisle dolly).
3. Frames: `ffmpeg -i clip.mp4 -vf "fps=7" -frames:v 35 -q:v 6 c%d-%03d.jpg`,
   rename sequentially into `assets/film/`, update `__FRAME_COUNT` in
   `index.html` if counts change.

## Facts used in copy (from the Grand Opening video, 2026-07-04)
26,000 sq ft (兩萬六千呎) · 零售 鑑定 收藏 對戰 展覽 · HK$80M museum
collection · tagline PLAY. COLLECT. CONNECT. · Mackenyu appeared at opening.

## Preview
Any static server, e.g. `python3 -m http.server 4710`.

## Ship options
A. Standalone page (GitHub Pages) linking into the Shopify store — zero risk.
B. Shopify Dawn custom section (site is Dawn 15.4.1).
C. Alternate Shopify homepage template.
