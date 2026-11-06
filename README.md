# Studio Northwind: A Responsive, Accessible Multi-Page Website for a Design Agency

Studio Northwind is a fictional independent design agency presented through a responsive, image-led static website. It uses a restrained editorial layout, original copy, and Picsum placeholder photography. The project is built without a framework, backend, or build step.

## Problem statement overview

Internship Problem Statement 01 is addressed by creating a polished multi-page website for a fictional design studio. The site introduces the studio, showcases its work and services, and provides an accessible enquiry form while adapting to mobile, tablet, and desktop screens.

## Project objectives

- Present a clear studio identity and portfolio across dedicated pages.
- Provide responsive navigation and layouts using semantic HTML and CSS.
- Make portfolio browsing and project details keyboard accessible.
- Validate an enquiry form on the client without implying that submissions are delivered.
- Document performance, testing evidence, deployment readiness, and known limitations accurately.

## Technology stack

- HTML5 semantic elements
- CSS3, including Flexbox, Grid, custom properties, and fluid typography
- Vanilla JavaScript ES6+ modules
- Git and GitHub
- Figma for wireframes

## Website pages and features

| Page | Contents |
|---|---|
| `index.html` | Studio introduction, hero image, six featured projects, services strip, text-based client list, and contact CTA |
| `work.html` | Portfolio with category filters and links to reusable project case studies |
| `project.html` | Shared project case study template, selected by its `?id=` query parameter |
| `about.html` | Studio story, six-person team, values, and timeline |
| `services.html` | Brand strategy, visual identity, web design, packaging, motion, and editorial services |
| `contact.html` | Studio contact details and a validated enquiry form |
| `404.html` | Friendly not-found content with a link back home |

Shared features include active-page navigation, a mobile menu, skip links, responsive images, reduced-motion support, scroll reveals with a no-JavaScript fallback, and a custom inline favicon.

The six project stories are described as fictional portfolio concepts. Their outcome statements are qualitative design summaries only; no business results, client testimonials, awards, or performance metrics were supplied.

## Project folder structure

```text
studio-northwind-website/
├── .gitignore
├── 404.html
├── about.html
├── contact.css
├── contact.html
├── contact.js
├── index.html
├── main.js
├── project.html
├── project.js
├── projects.js
├── README.md
├── reveal.js
├── services.html
├── style.css
├── work.html
├── work.js
└── docs/
    ├── screenshots/
    │   ├── README.md
    │   ├── desktop/
    │   ├── mobile/
    │   └── tablet/
    └── testing/
        ├── lighthouse-results.md
        └── submission-checklist.md
```

The screenshot folders contain checklists only; screenshot captures have not been added.

## Responsive design implementation

The layout uses a mobile-first approach, fluid spacing and type via `clamp()`, and CSS Grid for project, team, and service cards. Styles define responsive breakpoints at 480px, 768px, 1024px, and 1280px. The mobile navigation is used below 768px. Images have intrinsic dimensions to reserve layout space, and the project/team images offer responsive source candidates where applicable.

## Performance optimization

- Contact uses its page-specific `contact.css` and `contact.js`; portfolio behavior is isolated in `work.js`.
- The shared navigation/year behavior and scroll-reveal behavior are loaded as ES modules. `projects.js` separates case-study content from its reusable `project.html` renderer.
- The home page preconnects to Picsum and prioritizes its hero image. Below-the-fold images are lazy-loaded.
- Responsive image candidates, explicit image dimensions, system fonts, and no third-party JavaScript or external font requests are used.
- No production minification or custom cache headers are configured. GitHub Pages response headers and deployed performance have not been measured in this documentation update.

These are implementation details, not a guarantee of a particular Lighthouse score or network transfer size.

### Adding a project

1. Add the project object and its image gallery to `projects.js`, using a unique kebab-case `id`, category filter values (`branding`, `web`, `packaging`, `motion`), descriptive alt text, and intrinsic image dimensions.
2. Provide the overview, challenge, strategy, process, deliverables, qualitative outcome, and supported project credits in that same object. Leave unknown dates or credits out rather than guessing.
3. Add a corresponding filter button only if the new project introduces a filter category not already used. `work.js` renders all cards and links from `projects.js`; the Next Project link follows the array order and wraps from its end to its beginning.
4. Open `project.html?id=your-project-id` directly and test the card, images, lightbox, responsive layouts, and browser history.

## Performance and Lighthouse Testing

The following measured scores were provided for this project and are transcribed as given; they were not independently rerun during this documentation update. Performance, Accessibility, Best Practices, and SEO are reported in that order.

### Mobile — Lighthouse device preset

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | 91 | 100 | 100 | 100 |
| Work | 88 | 100 | 100 | 100 |
| Contact | 93 | 100 | 100 | 100 |

### Tablet — custom 768 × 1024 viewport

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | 99 | 100 | 100 | 100 |
| Work | 98 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |

### Desktop — Lighthouse device preset

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | 99 | 100 | 100 | 100 |
| Work | 99 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |

Mobile and desktop scores use Lighthouse device presets; tablet scores use the stated custom responsive viewport. Lighthouse scores can vary between runs, browsers, and environments. No Lighthouse audit was run as part of this update, so the supplied results should not be interpreted as a fresh audit of the current checkout. See [the score record](docs/testing/lighthouse-results.md).

## Contact form functionality and limitations

The form requires a name, valid email, service, budget, project description of at least 20 characters, and consent. Phone is optional. Fields receive client-side validation on blur and submit, with inline accessible errors. A valid submission briefly enters a loading state and then displays a demo confirmation.

**The form only validates and displays feedback. It does not store submissions, send email, or connect to an external form service.** No enquiry is delivered to an inbox. The displayed email (`hello@studionorthwind.example`), address, and phone number are fictional placeholders and must be replaced with approved real contact details before public deployment.

## How to Install, Open and Run the Project

Follow these steps to download the project, open it in Visual Studio Code, and run it locally.

### 1. Prerequisites

You will need:

- A computer running Windows, macOS, or Linux.
- Python 3 installed to run the recommended local HTTP server.
- A modern web browser, such as Chrome, Edge, or Firefox.
- Git only if you choose to clone the project from GitHub.

Node.js, npm, React, and a database are **not required**. This is a static website built with HTML, CSS, and vanilla JavaScript.

### 2. Download the project from GitHub

To download a ZIP archive:

1. Open the [Studio Northwind GitHub repository](https://github.com/sravan875/studio-northwind-website).
2. Select the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file.
5. Open the extracted `studio-northwind-website` folder in VS Code.

Alternatively, if Git is installed, clone the repository from a terminal:

```sh
git clone https://github.com/sravan875/studio-northwind-website.git
cd studio-northwind-website
```

### 3. Open the project in VS Code

1. Open Visual Studio Code.
2. Select **File → Open Folder**.
3. Choose the `studio-northwind-website` folder you extracted or cloned.
4. Confirm that files such as `index.html`, `style.css`, `main.js`, and `README.md` appear in the Explorer.

### 4. Run the website locally on Windows

Open a PowerShell terminal in VS Code (**Terminal → New Terminal**) and run:

```powershell
cd D:\path\to\studio-northwind-website
py --version
py -m http.server 8000
```

Replace `D:\path\to\studio-northwind-website` with the actual location of your project folder. The server runs in that terminal; leave it open while using the site.

If `py` is not available but Python is installed, try:

```powershell
python --version
python -m http.server 8000
```

### 5. Open the website in a browser

After the server starts, open the [Home page](http://localhost:8000/index.html) in your browser. The other pages and project case studies are available at:

- Home: [http://localhost:8000/index.html](http://localhost:8000/index.html)
- About: [http://localhost:8000/about.html](http://localhost:8000/about.html)
- Services: [http://localhost:8000/services.html](http://localhost:8000/services.html)
- Work: [http://localhost:8000/work.html](http://localhost:8000/work.html)
- Contact: [http://localhost:8000/contact.html](http://localhost:8000/contact.html)

Project case studies:

- Field Notes: [http://localhost:8000/project.html?id=field-notes](http://localhost:8000/project.html?id=field-notes)
- Common Ground: [http://localhost:8000/project.html?id=common-ground](http://localhost:8000/project.html?id=common-ground)
- Stillform: [http://localhost:8000/project.html?id=stillform](http://localhost:8000/project.html?id=stillform)
- Goodweather: [http://localhost:8000/project.html?id=goodweather](http://localhost:8000/project.html?id=goodweather)
- Openhouse: [http://localhost:8000/project.html?id=openhouse](http://localhost:8000/project.html?id=openhouse)
- Blue Hour: [http://localhost:8000/project.html?id=bluehour](http://localhost:8000/project.html?id=bluehour)

### 6. Stop the local server

Return to the PowerShell terminal where the server is running and press **Ctrl + C**.

### 7. Troubleshooting

- **Python command not recognized:** Install Python 3 and ensure it is available on your `PATH`. On Windows, try the `py` launcher first; if that is unavailable, try `python`. Close and reopen the terminal after installation.
- **Port 8000 is already in use:** Start the server on another port with `py -m http.server 8001`, then open [http://localhost:8001](http://localhost:8001).
- **The browser shows a directory listing:** The server may have been started from the wrong folder. Stop it with **Ctrl + C**, open the `studio-northwind-website` project folder in the terminal, and start the server again. You can also open `/index.html` directly in the address bar.
- **Project images do not load:** The portfolio and team images are external Picsum placeholders. Check your internet connection; the local pages can still open without it, but those images need network access.
- **JavaScript module errors when opening an HTML file with `file://`:** Run the site through the local HTTP server instead. ES modules are subject to browser origin restrictions when pages are opened directly from disk, while the local server gives the pages an HTTP origin and lets their module imports load correctly.

### 8. Main project files

| File | Purpose |
|---|---|
| `index.html` | Home page |
| `about.html` | About page |
| `services.html` | Services page |
| `work.html` | Portfolio and project filters |
| `project.html` | Reusable project case-study page |
| `projects.js` | Centralized project content |
| `project.js` | Project rendering and gallery behavior |
| `work.js` | Portfolio cards and filters |
| `main.js` | Shared navigation and footer year |
| `contact.js` | Contact form validation |
| `contact.css` | Contact page styling |
| `reveal.js` | Scroll reveal behavior |
| `style.css` | Shared website styling |

### 9. Important clarification

This is a **frontend-only static website**. No backend setup or database configuration is needed. The contact form is a demonstration: it validates entries and displays feedback, but does not send or store actual enquiries. Internet access is needed to load the external Picsum placeholder images.

## Local installation, execution, and case-study testing

No dependencies or build tools are required. Because the site uses ES modules, use a local HTTP server rather than opening the pages directly with `file://`:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

Open each case study directly, for example `http://localhost:8000/project.html?id=field-notes`. Supported IDs are `field-notes`, `common-ground`, `stillform`, `goodweather`, `openhouse`, and `bluehour`. An unknown ID shows an in-page not-found state with a link back to Work.

## Browser compatibility

The site is designed for current browsers supporting ES modules, CSS Grid, `IntersectionObserver`, and the native HTML dialog element. A complete cross-browser/device lab matrix has not been run; verify the target browsers before a production launch.

## Testing and verification

The six original page routes (Home, About, Services, Work, Contact, and 404) were checked in browser automation at these viewport sizes: 375 × 812, 390 × 844, 768 × 1024, 820 × 1180, and 1440 × 900. The reusable project detail route and each project ID were also exercised during implementation; see the verified case-study checks below. On those six original routes at each size:

- Exactly one `h1`, a non-empty title, a meta description, and a skip link were present.
- No horizontal overflow was detected.
- Every image had an `alt` attribute and explicit width/height attributes.

Interactive checks on those six original routes confirmed that the mobile menu opens, closes on Escape, and returns focus to its button; portfolio filters update the visible project count; and the contact form reports required-field, invalid-email, and short-message errors, enters its disabled/busy state, and displays its demo success message with the phone field left empty. The custom `404.html` content was opened directly; server-level 404 routing depends on the hosting provider.

For the case-study enhancement, browser checks confirmed that all six IDs render distinct titles and descriptions with three gallery items each, and that all 18 gallery images loaded. Unknown IDs show a not-found state. Next Project advances (including Blue Hour wrapping to Field Notes), Back to All Projects returns to Work, and Work filters still return 6/5/2/2/2 visible cards (All/Branding/Web/Packaging/Motion). Browser back and forward restored the Work and selected case-study pages. All six case studies were checked at the five listed viewport sizes with no horizontal overflow. The gallery's previous/next controls, wrapping, scroll lock, close behavior, focus return, and Escape/arrow-key handlers were exercised using scripted browser actions and simulated keyboard events. Internal HTML page and fragment links were checked with no missing targets. Lighthouse was not rerun.

These checks do not replace Lighthouse, full screen-reader testing, deployed-link checks, or a full cross-browser test suite. Screenshot evidence is pending; see the [capture checklist](docs/screenshots/README.md).

## SEO and deployment readiness

- All seven HTML pages have `lang="en"`, a title, a meta description, and a favicon. The project case-study page sets its project-specific title, description, and Open Graph fields in JavaScript after reading its query ID.
- Open Graph and canonical metadata were not found in the inspected pages.
- `robots.txt` and `sitemap.xml` are not present. No `example.com` sitemap reference was found.
- No deployment or live URL was verified. Deployment remains pending; do not treat the repository URL as a live website URL.
- Add a sitemap and canonical URLs only after the production domain is known. Replace the fictional contact details before publishing.

## GitHub repository

Repository: [sravan875/studio-northwind-website](https://github.com/sravan875/studio-northwind-website)

The local branch is `main` and the `origin` remote is configured for this repository. Changes are currently present in the working tree; review and commit them before pushing. No push was made as part of this preparation.

## Future improvements

- Replace Picsum placeholders and fictional contact information with approved assets and real studio details.
- Connect the form to an approved backend or form provider, then test delivery and privacy handling.
- Add Open Graph and canonical metadata, and generate `robots.txt`/`sitemap.xml` after confirming the deployed domain.
- Capture and organize genuine responsive screenshots and save dated Lighthouse reports.
- Run Lighthouse on the current deployment and conduct cross-browser, keyboard, and assistive-technology testing.

## Internship submission preparation

The [submission checklist and draft message](docs/testing/submission-checklist.md) summarizes the project information, evidence status, and remaining manual tasks.

Images are placeholders from [picsum.photos](https://picsum.photos) and require an internet connection.
