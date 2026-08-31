# CLAUDE.md — wjzhang5464.github.io

Guidance for any Claude session working in this repository. Self-contained:
assume no memory of previous conversations.

---

## 1. What this is

The personal academic website of **Weijian Zhang**, a Ph.D. candidate at Purdue
ECE (Elmore Family School) advised by **Prof. Stanley H. Chan** in the
Intelligent Imaging Lab. Research area: **single-photon LiDAR** — statistical
forward models of photon registration under detector dead time, and the
estimators and simulators built on them.

The site's current job is supporting a search for a **Summer 2027 internship**
in LiDAR, radar, novel sensors, and depth estimation. Design decisions should
favour a technical industry reader who will spend about thirty seconds on the
page, not a general audience.

- **Stack:** Jekyll + the [al-folio](https://github.com/alshedivat/al-folio) theme
- **Live at:** https://wjzhang5464.github.io
- **Remote:** `https://github.com/wjzhang5464/wjzhang5464.github.io` (personal account)

## 2. How deployment works

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and pushes the result to the `gh-pages` branch. GitHub Pages serves `gh-pages`.

- **Never edit `gh-pages` directly.** It is generated output.
- The deploy workflow is the real build check — the site cannot be built in
  every environment (see §6).
- A separate workflow, `update-citations.yml`, commits Google Scholar citation
  counts to `_data/citations.yml` on a schedule. **Always `git pull` before
  starting work**, or you will be behind by several automated commits.

---

## 3. IMMEDIATE TASK

The working tree is clean and `main` is **4 commits ahead of `origin/main`**,
unpushed. Weijian has reviewed the design direction and approved it. Your job:

1. **Pull, verify, and push these commits to `main`.**
2. **Watch the deploy workflow** and confirm it goes green.
3. **Check the live site** once it deploys.

```bash
git pull --rebase origin main     # picks up any citation-bot commits
bundle install                    # see §6 if this fails
bundle exec jekyll build          # the real check — must succeed
git push origin main
gh run watch                      # or: gh run list --limit 1
```

If `jekyll build` fails, **fix the failure before pushing** — do not push a
broken build. The most likely causes are a Liquid error in
`_layouts/about.liquid` (customised, see §5) or a `preview={...}` field in
`_bibliography/papers.bib` pointing at an image file that does not exist.

After the deploy succeeds, verify on the live site:

- [ ] Homepage: quick-links row, internship callout, news, selected publications
- [ ] Author's own name is **highlighted** in every publication entry
- [ ] `/publications/`, `/research/`, `/news/`, `/cv/`, `/gallery/` all load
- [ ] Toggle dark mode — check the **news table** especially (see §6)
- [ ] Nav reads: about / publications / research / news / cv / gallery

### What those 4 commits contain

| Commit | Summary |
|---|---|
| `8785b84` | Replaced all al-folio demo content with real content; deleted 31 demo posts, 9 demo projects, Einstein bibliography; `assets/img` 32 MB → 464 KB |
| `0121a8f` | Layout A homepage structure; slate blue accent; `projects` → `research` |
| `cee20c6` | Swiss editorial restyle |
| `05d530c` | **Reverted** `cee20c6` back to the modern academic style (this is the style Weijian chose) |

`cee20c6` and `05d530c` cancel out stylistically. Leave both in history; do not
try to squash them.

---

## 4. Design decisions already made — do not relitigate

These were decided with Weijian. Change them only if he asks.

| Decision | Value |
|---|---|
| Theme | Stay on al-folio. Do not migrate to another template. |
| Accent | Slate blue `#1f4e79` light / `#79b8e8` dark (8.7:1 and 8.0:1) |
| Typography | **Inter** for UI and headings, **Source Serif 4** for long-form prose |
| Homepage layout | Bio + photo → quick links → internship callout → news → selected publications |
| Nav label | "research", not "projects" |
| Hero photo | The half-marathon finish photo. Deliberate — distinctive and human. |
| Style | "Modern academic". A Swiss-editorial variant was built and rejected. |

Rejected alternatives, so they are not re-proposed: Swiss editorial, journal
serif, technical/monospace; sticky-sidebar and research-card homepage layouts;
literal Purdue gold `#CEB888` (fails AA on white at 3.85:1).

## 5. Conventions

**All custom CSS goes in `_sass/_custom.scss`.** It is imported last from
`assets/css/main.scss`. Do not edit al-folio's other `_sass/` partials — keeping
changes in one file is what makes upstream theme updates mergeable. The accent
is two SCSS variables at the top of that file; changing them re-skins the site.

**`_layouts/about.liquid` is customised.** The News, Latest posts and Selected
publications headings are wrapped in a `.sec-head` div carrying an
"all news →" link. Preserve this when merging upstream changes.

**Content lives in data, not markup:**

- Publications → `_bibliography/papers.bib`. `selected={true}` puts an entry on
  the homepage (currently 4). `abbr={...}` picks the venue badge colour from
  `_data/venues.yml`.
- News → one file per item in `_news/`. `inline: true` for one-liners.
- Research threads → `_projects/` (the collection is still named `projects`
  even though the page is `/research/`; renaming the collection is riskier than
  it is worth).
- CV → `_data/cv.yml`.
- Gallery → drop images into `assets/img/gallery/`; `_pages/gallery.md`
  auto-lists them. Optional captions in `_data/gallery.yml`, keyed by filename
  without extension.

**Accessibility:** every venue colour in `_data/venues.yml` must clear WCAG AA
(4.5:1) against white, because al-folio renders badge text in white. Each entry
there carries its measured ratio in a comment. Check before adding a venue.

**Images:** keep them small. The profile photo arrived at 14 MB; it is now
463 KB at 1600px wide. `jekyll-imagemagick` generates responsive variants but
only matches **lowercase** extensions in `_config.yml` — a `.JPG` file is
silently skipped.

---

## 6. Gotchas that have already cost time

**Dark mode and Bootstrap tables.** Bootstrap hard-codes `color: #212529` on
`.table`, and al-folio never overrides it, so bare text in `<td>`/`<th>` is
near-invisible in dark mode. `_custom.scss` fixes this. If you add any new
table, verify it in dark mode.

**`scholar.last_name` in `_config.yml`** must stay `[Zhang]` / `[Weijian, W.]`.
It shipped as `[Einstein]`, which silently stopped the author's own name from
being highlighted in the publication list.

**macOS is case-insensitive.** Renaming `weijianz.JPG` → `weijianz.jpg` and then
`rm`-ing the old name deletes the new file. Write to a temp path first, then move.

**`bundle install` may fail with a 403** in sandboxed environments where
`rubygems.org` is not on the egress allowlist. On Weijian's own machine it
should work normally. If it does not, the GitHub Actions deploy is the only
available build check — push to a branch and open a PR rather than pushing a
build you could not verify. Static checks that work anywhere: YAML front matter
parses, Liquid `{% if %}`/`{% endif %}` balance, every `{% cite key %}` resolves
to an entry in `papers.bib`, and `sass --load-path=_sass` compiles.

**`.git/_stale/`** holds git lock files and temp objects that a sandboxed
session could not delete. It is inert. `rm -rf .git/_stale` when convenient.

---

## 7. Outstanding work

Blocked on Weijian providing files. Do not invent content for any of these.

1. **CV** — `_data/cv.yml` is still Albert Einstein's, and `_pages/cv.md` points
   at the placeholder `assets/pdf/example_pdf.pdf`. When he supplies his CV PDF:
   put it in `assets/pdf/`, update `cv_pdf:` in `_pages/cv.md`, and transcribe
   it into `_data/cv.yml`.

2. **Publication teaser figures** — the highest-value item remaining. The
   selected-publications list on the homepage has no images, and in
   computational imaging the figures are the argument. For each paper: put an
   image in `assets/img/publication_preview/` and add `preview={filename.png}`
   to the bib entry. **Only add the field once the file exists** — a missing
   file breaks the build.

3. **Gallery photos** — `assets/img/gallery/` contains only `.gitkeep`. The page
   renders a "coming soon" note until images are added.

4. **Thin pages** — `/repositories/` lists only two public repos and `/blog/`
   has no posts. Both were kept at Weijian's request. If they still look empty
   later, raise removing them from the nav rather than leaving them thin.

5. **Unverified facts** in content, worth confirming with him:
   - News dates for the CVPR 2024, MMSP 2024, and ICASSP 2026 items are
     plausible reconstructions, not confirmed. arXiv-derived dates are accurate.
   - He is described as "Ph.D. candidate" with no year. He self-described as
     "third-year" in Nov 2025.

---

## 8. Working style he has asked for

Say what is actually true, including when something is wrong or was done badly.
He responds well to being told a decision is a mistake and why. Explain
trade-offs rather than presenting one option. Do not push to `main` without
asking, unless a task like §3 above explicitly authorises it.
