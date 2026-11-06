# Studio Northwind: A Responsive, Accessible Multi-Page Website for a Design Agency

A fictional independent design studio portfolio, built as a static website with no framework or build step.

## Features

- Six responsive pages with shared visual language, navigation and footer.
- Accessible landmarks, skip links, keyboard-visible focus and active page navigation.
- Mobile menu with Escape-to-close and focus return.
- Portfolio category filters and keyboard-accessible project details dialog.
- Client-side enquiry form validation, inline errors and simulated confirmation.
- Reduced-motion support and IntersectionObserver scroll reveals with a no-JavaScript fallback.
- Responsive image candidates, lazy-loaded below-the-fold images and reserved image dimensions.
- Custom SVG data favicon on every page and a friendly custom 404 page.

## Tech stack

- HTML5 semantic elements
- CSS3 with Flexbox, Grid and custom properties
- Vanilla JavaScript ES6+ modules
- Git & GitHub
- Figma for wireframes

## Pages

| Page | Contents |
|---|---|
| `index.html` | Studio introduction, hero, six featured projects, services strip, clients and contact CTA |
| `about.html` | Studio story, six-person team, values and timeline |
| `services.html` | Brand strategy, visual identity, web design, packaging, motion and editorial |
| `work.html` | Filterable portfolio and project details dialog |
| `contact.html` | Contact details and validated enquiry form |
| `404.html` | Friendly page-not-found message and home link |

## Run locally

Open `index.html` directly in a modern browser, or serve this folder from a local static server. For example, with Python installed:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Lighthouse results

The requested Lighthouse audits have not yet been run in this environment. No scores are reported as measured results.

| Page | Device | Performance | Accessibility | Best Practices | SEO |
|---|---|---:|---:|---:|---:|
| `index.html` | Mobile | Not run | Not run | Not run | Not run |
| `index.html` | Desktop | Not run | Not run | Not run | Not run |
| `work.html` | Mobile | Not run | Not run | Not run | Not run |
| `work.html` | Desktop | Not run | Not run | Not run | Not run |
| `contact.html` | Mobile | Not run | Not run | Not run | Not run |
| `contact.html` | Desktop | Not run | Not run | Not run | Not run |

## Deploy on GitHub Pages

1. Push the project files to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for the Pages URL to appear in the Pages settings.

**Live URL:** _Add the published GitHub Pages URL here._

The site uses relative asset and page links, so it works from a GitHub Pages project subpath. GitHub Pages uses `404.html` for missing routes.

Images are placeholders from [picsum.photos](https://picsum.photos) and require an internet connection.
