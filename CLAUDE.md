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

## 3. Current state

`main` is pushed and the site is live and correct. The five design/content
commits (§3.1) plus three fixes made while deploying them are all on
`origin/main`, the Deploy workflow is green, and GitHub Pages is publishing.

Verified live on 2026-08-31: homepage (quick links, internship callout, news,
4 selected publications), author's own name `<em>`-highlighted in all 8
publication entries, `/publications/` `/research/` `/news/` `/gallery/`
`/repositories/` all 200, venue badges rendering, dark-mode news-table
override present in the deployed `main.css` (it survives purgecss).

`/cv/` is deliberately **not** deployed. See §7.1.

### 3.1 What shipped

| Commit | Summary |
|---|---|
| `8785b84` | Replaced all al-folio demo content with real content; deleted 31 demo posts, 9 demo projects, Einstein bibliography; `assets/img` 32 MB → 464 KB |
| `0121a8f` | Layout A homepage structure; slate blue accent; `projects` → `research` |
| `cee20c6` | Swiss editorial restyle |
| `05d530c` | **Reverted** `cee20c6` back to the modern academic style (this is the style Weijian chose) |
| `159db4b` | This handoff guide |
| `34ffb36` | Stopped excluding `_pages/publications.md` and `_pages/repositories.md`; dropped demo `external_sources` |
| `aaef649` | Added `.nojekyll`; kept `CLAUDE.md`/`requirements.txt` out of `_site` |

`cee20c6` and `05d530c` cancel out stylistically. Leave both in history; do not
try to squash them.

### 3.2 Two deployment bugs that were fixed — do not reintroduce

Both predated the design work and both were silent: the Deploy workflow went
green while the live site was wrong.

**`_config.yml` `exclude:` shipped from upstream al-folio excluding real
pages.** It listed `_pages/publications.md`, `_pages/repositories.md`,
`_pages/blog.md`, `_pages/projects.md`, `_pages/teaching.md`,
`_pages/profiles.md`, `_pages/dropdown.md` and `_pages/cv.md`. So
`/publications/` and `/repositories/` were never generated and 404'd on the
live site, while the nav linked to them. Publications and repositories are now
un-excluded. If you add a page and it 404s despite building fine, **check this
list first.**

**No `.nojekyll` in the published output.** `Deploy site` pushed a correct
`_site` to `gh-pages`, but GitHub's own `pages build and deployment` run then
tried to build that already-built site with Jekyll and failed every time, so
Pages kept serving the November 2025 build. Nothing in the `Deploy site` logs
showed this — it is a *separate* workflow run, on branch `gh-pages`.

**When checking a deploy, check both workflows:**

```bash
gh run list --limit 10
```

`Deploy site` (on `main`) green is not sufficient. `pages build and deployment`
(on `gh-pages`) must also be green, or nothing you pushed is actually live.
Jekyll skips dotfiles, so `.nojekyll` only survives because it is named in
`include:` in `_config.yml`. Do not remove it from that list.

### 3.3 Routine deploy check

```bash
git pull --rebase origin main     # picks up any citation-bot commits
bundle install                    # see §6 if this fails
bundle exec jekyll build          # the real check — must succeed
git push origin main
gh run list --limit 10            # both workflows, see §3.2
```

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

1. **CV — currently withheld from the live site.** `_data/cv.yml` is still
   Albert Einstein's ("Full Name: Albert Einstein", PhD Zurich 1905) and
   `_pages/cv.md` still points at the placeholder
   `assets/pdf/example_pdf.pdf`. `_pages/cv.md` is therefore left in the
   `_config.yml` `exclude:` list on purpose, so `/cv/` does not exist and
   `cv` is absent from the nav. Publishing placeholder content on a site being
   used for an internship search is worse than a missing page.

   When he supplies his CV PDF: put it in `assets/pdf/`, update `cv_pdf:` in
   `_pages/cv.md`, transcribe it into `_data/cv.yml`, **and remove
   `_pages/cv.md` from `exclude:` in `_config.yml`** — the last step is easy to
   miss and the page will silently stay a 404 without it.

2. **Publication teaser figures** — the highest-value item remaining. The
   selected-publications list on the homepage has no images, and in
   computational imaging the figures are the argument. For each paper: put an
   image in `assets/img/publication_preview/` and add `preview={filename.png}`
   to the bib entry. **Only add the field once the file exists** — a missing
   file breaks the build.

3. **Gallery photos** — `assets/img/gallery/` contains only `.gitkeep`. The page
   renders a "coming soon" note until images are added.

4. **Thin pages** — `/repositories/` lists only two public repos. It was kept
   at Weijian's request and is now actually live (it used to 404, see §3.2).

   `/blog/` is **not** built: `_pages/blog.md` is still in `exclude:`, and
   `_posts/` is empty, so there is no blog and no nav entry. The two demo posts
   that used to appear under `/blog/` came from `external_sources` in
   `_config.yml` pulling al-folio's own Medium feed and a Google AI blog post;
   those feeds were removed. Worth asking Weijian whether he wants a blog at
   all — an empty one in the nav is worse than none.

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
