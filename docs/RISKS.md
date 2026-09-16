# Risks

The things that could slow the build or hurt the result, and what is done about each.

| Risk                                                                               | Likelihood | Impact | How it is handled                                                                                                                               |
| ---------------------------------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope creep from three languages, the command palette, live data, and case studies | High       | High   | Portuguese ships first. Features are gated by priority. Italian and end to end tests are stretch. The roadmap enforces one working slice a day. |
| Hosting or deploy limits                                                           | Medium     | Medium | Vercel free tier is enough. Cloudflare Pages is a fallback. No server secrets reach the client. Rollback is documented.                         |
| SEO and crawlability                                                               | Medium     | High   | Static rendering, the Metadata API, per language hreflang, a sitemap, robots, and JSON-LD.                                                      |
| Performance from fonts and motion                                                  | Medium     | High   | A performance budget, fonts subset and self hosted, reduced motion support, and next image. Checked with Lighthouse.                            |
| The terminal look breaking on small screens                                        | Medium     | High   | Mobile first. Tested at 375 pixels. The palette becomes a bottom sheet. No fixed width monospace blocks.                                        |
| Content drifting between languages                                                 | High       | Medium | One typed source of truth, a key parity script, and a status table in the content inventory.                                                    |
| GitHub API rate limit or failure during the build                                  | Medium     | Low    | Responses are cached and fall back to a static snapshot, so a build never breaks.                                                               |
| Contact form spam                                                                  | Low        | Medium | No raw public form. Email link and copy to clipboard instead. A serverless form with a honeypot only if it is ever needed.                      |
| Time pressure alongside coursework                                                 | Medium     | High   | Buffer is built into the stretch items. The most important sections are built first.                                                            |
| The site reading as a generic template or AI output                                | Medium     | Medium | An enforced style guide, hand picked fonts and color, and a list of banned patterns in the style guide.                                         |

## Review

This list is checked at the end of each milestone. New risks are added as they appear and closed
ones are marked done.
