# IronCore Fitness — CST 2309 Final Project

A three-page gym website built with HTML, CSS, and JavaScript for the Spring 2026 final project.

## Pages

| Page | File | Description |
|------|------|-------------|
| About Us | `index.html` | Mission, values, programs, staff |
| Membership | `membership.html` | Registration form with JS validation |
| Creativity | `creativity.html` | Slideshow, WOD generator, countdown, goal tracker, theme toggle |

## Images

All photos are stored locally in `images/` (sourced from [Pexels](https://www.pexels.com) — free for personal and commercial use). Include this folder when pushing to GitHub so images display on GitHub Pages.

| File | Used for |
|------|----------|
| `hero.jpg` | Homepage hero background |
| `gym-floor.jpg` | Mission section |
| `group-class.jpg` | Programs & slideshow |
| `personal-training.jpg` | Programs section |
| `spin-studio.jpg` | Slideshow |
| `yoga-studio.jpg` | Slideshow |
| `staff-marcus.jpg` | Head coach portrait |
| `staff-elena.jpg` | Group fitness director |
| `staff-james.jpg` | Nutrition specialist |

## Local Preview

Open any HTML file in a browser, or run a simple server:

```bash
cd GYM_Final
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

## GitHub Pages Deployment

1. Create a new repository on GitHub (e.g. `gym-website`).
2. Push this folder:

```bash
cd GYM_Final
git init
git add .
git commit -m "Add IronCore Fitness final project website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gym-website.git
git push -u origin main
```

3. In GitHub: **Settings → Pages → Source**: deploy from branch `main`, folder `/ (root)`.
4. Your site will be live at: `https://YOUR_USERNAME.github.io/gym-website/`

## Project Checklist

- [x] Three pages with shared navigation
- [x] External CSS (`css/styles.css`)
- [x] External JavaScript (`js/validation.js`, `js/creativity.js`, `js/nav.js`)
- [x] Form validation (all fields, email, phone, age, etc.)
- [x] Creativity page: slideshow, WOD generator, countdown, progress bar, theme toggle
- [ ] Publish on GitHub Pages (submit URLs to your instructor)

## Submission URLs (fill in after deploy)

- **GitHub Pages:** `https://YOUR_USERNAME.github.io/REPO_NAME/`
- **Repository:** `https://github.com/YOUR_USERNAME/REPO_NAME`
