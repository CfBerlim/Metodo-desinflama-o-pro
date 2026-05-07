---
name: nano-banana-images
description: Generate hyper-realistic images via the Kie.ai Nano Banana 2 (Gemini 3.1 Flash) model using a structured JSON prompt schema. Use this skill whenever the user asks to generate, create, produce, render, or "make" any kind of realistic image — product/advertising photography, portraits, food photography, lifestyle scenes, macro shots, infographics, or any visual where photorealism, precise camera/lighting control, or avoiding the typical "AI look" (plastic skin, anatomy averaging, beautification filters) matters. Use even when the user just says "make a photo of X" or "generate an image of X" — the structured JSON prompting drives dramatically better results than freeform prompting. Use even if the user writes in Portuguese ("gere uma imagem", "criar uma foto", "imagem realista de X").
---

# Nano Banana 2 — Hyper-Realistic Image Generation

## What this skill does

Builds a tightly structured JSON prompt and dispatches it to the Kie.ai `nano-banana-2` (Gemini 3.1 Flash) image endpoint. The schema neutralizes the model's bias toward smoothed, beautified, dataset-averaged output by demanding camera physics, explicit imperfections, and a heavy negative-prompt stack. Default to using it whenever realism matters — including when the user doesn't explicitly request realism but is asking for a photograph of something real.

## Prerequisites

- `KIE_AI_API_KEY` available either as an environment variable or in a `.env` file in the project root or `~`.
- Python 3 with `requests` installed (`pip install requests`).

## Workflow

1. **Read intent.** When the user asks for an image, infer the *kind* (product shot, portrait, food, infographic, etc.). The kind drives which schema fields matter.
2. **Build the JSON prompt** following the dense-narrative schema below — that is the only format the script accepts.
3. **Save it** at `nano-banana2/prompts/<category>/<descriptive_name>.json` (relative to the project root, which is the default cwd in this project). If you cannot categorize, use `miscellaneous`.
4. **Run the script** to generate the image and download it.
5. **Save the image** at `nano-banana2/images/<category>/<descriptive_name>.<ext>`, mirroring the prompt's subfolder.
6. **Run multiple generations in parallel** when the user asks for several images — fire each `python` invocation as a separate Bash call in the same turn. Don't serialize them; Kie.ai handles concurrent tasks.

## The dense-narrative JSON schema (required format)

```json
{
  "prompt": "Dense, ultra-descriptive narrative. Pack in subject details, environment, camera math (focal length/aperture/ISO), lighting behavior, explicit imperfections, and direct imperative commands.",
  "negative_prompt": "comma, separated, list, of, AI-look, blockers",
  "image_input": ["optional jpg/png/webp URLs (≤30MB each, ≤14 total) used as references"],
  "api_parameters": {
    "resolution": "1K | 2K | 4K (default 1K)",
    "output_format": "jpg | png (default jpg)",
    "aspect_ratio": "e.g., 4:5, 16:9, 1:1, auto",
    "google_search": false
  },
  "settings": {
    "style": "e.g., 'documentary realism', 'flash photography'",
    "lighting": "e.g., 'natural golden hour', 'direct on-camera flash'",
    "camera_angle": "e.g., 'eye-level', 'high-angle arm-extended selfie'",
    "depth_of_field": "e.g., 'shallow depth of field'",
    "quality": "e.g., 'high detail, unretouched skin'"
  }
}
```

`image_input`, `api_parameters`, and `settings` are stripped from the JSON before it is stringified into the API call — they configure the request and the script, not the model. The model only sees `prompt` + `negative_prompt`.

## Writing the `prompt` field — six things every good prompt has

The `prompt` field carries roughly 80% of the realism. Treat it like a paragraph of a photography textbook crossed with a director's note.

1. **Camera mathematics.** Pick focal length, aperture, ISO and state them: `85mm lens, f/1.8, ISO 200`. This forces the model into optical-physics mode rather than digital-render mode. Keep ISO ≤800 unless grain is the goal — high ISO flips the model into "stylized realism" failure mode.
2. **Explicit imperfections.** "Realistic" is too soft. Name the flaws: `visible pores, mild redness, subtle freckles, light acne marks, peach fuzz, asymmetrical eyebrows`. For products: `micro-scratches on the anodized finish, fingerprints near the bezel`.
3. **Lighting behavior, not just type.** Not "studio light" — say what the light *does*: `direct on-camera flash creating sharp specular highlights on skin, slightly underexposing the background`.
4. **Direct imperative commands embedded in the positive prompt.** `Do not beautify or alter facial features. No makeup styling. No skin smoothing.` These work better inside the positive paragraph than relegated to the negative prompt alone.
5. **Documentary framing tags.** `Candid, documentary realism, unposed.` Counters the model's pull toward editorial fashion proportions.
6. **Subject-specific physics.** Humans: skin texture, light scattering through hair, fabric draping. Objects: surface scoring, anodization, weathering. Nature: dew, micro-shadows, leaf imperfections, browning edges.

## Writing the `negative_prompt` field

A dense, comma-separated list — never a sentence. Combats AI-style failure modes. Use this baseline stack for any human subject and add subject-specific blockers on top:

```
plastic skin, skin smoothing, beautification filters, airbrushed texture, anatomy normalization, dataset-average proportions, body proportion averaging, editorial fashion proportions, stylized realism, oversaturated colors, depth flattening, wide-angle distortion not in reference, lens compression not in reference, CGI, cartoon, illustration, painting, blurry, low resolution, distorted face, extra fingers, overexposed, heavy makeup, more realistic reinterpretation
```

Subject-specific add-ons:
- Products: `no studio key light unless described, no glossy reflections unless described, no perfectly clean surfaces`
- Food: `no glossy syrup overlay, no unnatural sheen, no editorial restaurant lighting`
- Nature: `no oversaturated greens, no fantasy lighting, no over-sharpened leaves`

Every prompt — even a quick one — must populate `negative_prompt`. An empty negative defeats the point of the skill.

## Running the generation

Run from the project root (the default cwd Claude Code opens this project at):

```bash
python nano-banana2/scripts/generate_kie.py nano-banana2/prompts/<category>/<name>.json nano-banana2/images/<category>/<name>.jpg "4:5"
```

- **Arg 1:** path to the prompt JSON (relative to cwd).
- **Arg 2:** image output path (script creates parent dirs).
- **Arg 3 (optional):** aspect ratio. Defaults to `auto`. `api_parameters.aspect_ratio` inside the JSON overrides this.

The script handles task creation, polling (every 4s, up to 4 minutes), and download. Exit 0 on success.

To re-fetch an image from a previous task without regenerating:

```bash
python nano-banana2/scripts/get_kie_image.py <taskId> nano-banana2/images/<category>/<name>.jpg
```

## Common failure modes

- **Over-degradation.** Pushing extreme noise (`ISO 3200`, `heavy film grain`) in already-complex scenes (neon, low light) flips the model into "digital art" mode. Stay below ISO 800 and rely on subject imperfections to sell realism.
- **Empty negative prompt.** Defaults the model to airbrushed AI aesthetics.
- **Vague subjects.** "A woman" yields dataset-average output. Spell out skin texture, ethnicity, age, hair, expression — the more specific, the further from the average.
- **Forgetting `image_input` for variations.** When the user says "use this photo as reference" or "make a variation," pass the URL(s) in `image_input`.
- **Saving prompt and image to mismatched folders.** They must mirror — `nano-banana2/prompts/portraits/jane.json` ↔ `nano-banana2/images/portraits/jane.jpg`.

## Project conventions

Everything image-related lives inside `nano-banana2/`. The convention:

```
nano-banana2/
├── SKILL.md                     ← this file
├── scripts/                     ← generate_kie.py, get_kie_image.py
├── references/                  ← master_prompt_reference.md
├── prompts/<category>/          ← JSON prompt files
└── images/<category>/           ← generated outputs (mirror category)
```

Use the same `<category>` for both `prompts/` and `images/`. Default to `miscellaneous` when uncertain. The script auto-creates missing parent directories — you don't need to `mkdir` the category folders ahead of time.

## Advanced: Deep-Grid (V3) format

For multi-panel grids (`2x2_grid`, side-by-side) or scenes needing explicit structural-preservation locks, there is a richer JSON shape with separate `subject`, `environment`, `multi_panel_layout`, `controlnet`, and `structural_preservation` blocks. Consult `references/master_prompt_reference.md` for the full schema. The dense-narrative format above is the correct default — escalate to Deep Grid only when grids or hard structural preservation are explicitly required.

## When this skill is invoked but realism isn't the goal

If the user asks for an explicitly stylized image (`anime`, `oil painting`, `watercolor`, `pixel art`, `flat illustration`), this skill still applies — but in those cases drop the heavy realism scaffolding (camera math, imperfections, the realism negative stack) and lean into the requested style in `prompt` and `settings.style`. The schema and the script remain the same.
