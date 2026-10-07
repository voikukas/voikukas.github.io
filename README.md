# Personal website

A small Jekyll site for GitHub Pages: a home page with photo, intro and contact
details, plus Publications and Visuals pages. No plugins, no theme gem —
GitHub builds it automatically.

## Publish it (one time)

1. On GitHub, create a **public** repository named exactly `<your-username>.github.io`.
2. Upload the contents of this folder to it (drag-and-drop in the GitHub web UI works,
   or `git push`). `_config.yml` should be at the top level of the repo.
3. In the repo go to **Settings → Pages** and check that *Source* is
   **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. After a minute or two the site is live at `https://<your-username>.github.io`.
   Build progress is visible under the repo's **Actions** tab.

## Where to edit things

| What                         | File                                   |
| ---------------------------- | -------------------------------------- |
| Name, tagline, menu          | `_config.yml`                          |
| Intro text, contact links    | `index.md`                             |
| Profile picture              | `assets/img/` + `photo:` in `index.md` |
| Publications                 | `_data/publications.yml`               |
| Visuals (art, posters)       | `_data/visuals.yml` + images in `assets/img/visuals/`, PDFs in `assets/pdf/` |
| Colours & fonts              | top of `assets/css/style.css`          |

Everything you can edit is marked ✏️ PLACEHOLDER. You can edit any file directly
on github.com (pencil icon) — the site rebuilds on every commit.

**Images:** square photo ≥ 600 px; visuals around 1600 px on the long side,
saved as JPG/WebP (keeps pages fast). Cards are square crops; the detail view
shows the whole image. Delete the placeholder SVGs and PDF when done.

**Posters / PDFs:** export the poster's first page as a JPG for `image`, put the
PDF in `assets/pdf/`, and set `pdf:`. The card gets a PDF tag and the detail
view an "Open PDF" button. Keep PDFs under ~20 MB (compress large posters).

**Descriptions:** `description` can be as long as you like and uses Markdown;
it appears when someone clicks a card. Filter buttons are created from the
`category` values automatically.

**Publications:** your name in the `authors` field is bolded automatically if it
matches one of the `author_names` in `_config.yml`.

**Dark mode** follows the visitor's system setting; its colours are in the
`prefers-color-scheme: dark` block of the stylesheet.

## Custom domain later

Add the domain under **Settings → Pages → Custom domain**, then point your DNS at
GitHub Pages as described in GitHub's docs. Nothing in the site needs changing.

## Preview locally (optional)

With Ruby installed: `gem install jekyll webrick` then `jekyll serve` in this folder, and
open http://localhost:4000.

