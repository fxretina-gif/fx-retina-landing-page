# FX Retina — Landing Page

Static landing page (plain HTML/CSS/JS, no build step).

- `index.html` — the sales page; every "Book a strategy call" button goes to `book-a-call.html`
- `book-a-call.html` — the qualifying form + booking calendar (Calendly: calendly.com/fxretina/clinics-growth-call), shown only to qualified clinics; the form answers are pre-filled into Calendly questions 1–4 and 7
- `privacy-policy.html`, `terms-and-conditions.html` — legal pages linked from the footer
- `Content/` — images and videos used by the pages

Already set up: the FX Retina Meta Pixel (`914793297213138`) and its funnel events, and phone/email checks on the form.

## Run locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

## Before going live

1. **Lead sheet:** set `SHEET_ENDPOINT` in the `CONFIG` block near the bottom of `book-a-call.html` to your Google Apps Script `/exec` URL (see the "Lead Sheet & Form Connection" guide).
2. **Hosting:** follow the "How to host your website on GitHub" guide and point your subdomain at it.
