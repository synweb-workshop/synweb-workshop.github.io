# SynWeb @ TheWebConf 2027

Website for the 1st Workshop on Trustworthy Synthetic Data for the Web: Generation, Verification, and Governance.

Static site. No build step, no dependencies.

## Deploy on GitHub Pages

1. Create a repository.
   - For `https://<name>.github.io/`, name the repo `<name>.github.io` (e.g. create a GitHub organization `synweb` and a repo `synweb.github.io`).
   - Any other repo name gives `https://<user>.github.io/<repo>/`. All links are relative, so both work.
2. Push the contents of this folder to the `main` branch (the `.nojekyll` file must be included).
3. Repository Settings > Pages > Build and deployment > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`.
4. The site is live within a minute or two.

## Updating content

Almost everything that changes over the workshop cycle is in `assets/js/data.js`:

| Field | Effect |
|---|---|
| `dates[].date` | `"YYYY-MM-DD"` or `null` (shows "To be announced"). Passed deadlines are struck through and marked Closed; the next one is highlighted and drives the countdown on the home page. Deadlines close at 23:59 AoE. |
| `submissionUrl` | Enables every "Submit a paper" button. Empty string shows "Submission portal opens soon". |
| `announcement` | Banner on the home page. `""` hides it. |
| `program` | Rows of the schedule table. `isBreak: true` styles a break row. |
| `papers` | Accepted papers list. Empty list shows a placeholder. |
| `pc` | Program committee. Only `confirmed: true` entries are displayed, sorted by surname. Optional `url` links the name. |
| `contactEmail` | All contact links. |

Prose (about, CfP text, organizer bios) is in the HTML files directly.

Organizer photos: replace a `<span class="monogram">SA</span>` in `committee.html` with
`<img class="monogram" src="assets/img/abdaljalil.jpg" alt="">` and add the image to `assets/img/`.
