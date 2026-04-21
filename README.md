# 📁 POS Dashboard - Folder Structure

```
dashboard/
│
├── index.html                        ← ✅ Executive Dashboard (DONE)
│
├── assets/
│   ├── css/
│   │   ├── style.css                 ← ✅ Main design system & all shared styles
│   │   └── pages/                   ← Page-specific CSS files go here
│   │       ├── sales.css
│   │       ├── items.css
│   │       └── ...
│   │
│   ├── js/
│   │   ├── main.js                   ← ✅ Sidebar toggle, nav, charts (shared)
│   │   └── pages/                   ← Page-specific JS files go here
│   │       ├── sales.js
│   │       ├── items.js
│   │       └── ...
│   │
│   ├── images/                      ← Logo, product images, avatars, etc.
│   └── fonts/                       ← Self-hosted fonts (if any)
│
├── components/
│   ├── sidebar.html                  ← ✅ Sidebar HTML snippet (reference)
│   └── page-template.html           ← ✅ Blank page template (copy for new pages)
│
└── pages/                           ← All inner pages go here
    │
    ├── — CONTACTS —
    ├── customers.html
    ├── customers-add.html
    ├── customers-edit.html
    ├── customers-view.html
    ├── suppliers.html
    ├── suppliers-add.html
    ├── suppliers-edit.html
    ├── suppliers-view.html
    │
    ├── — INVENTORY —
    ├── items.html
    ├── items-add.html
    ├── items-edit.html
    ├── items-view.html
    ├── item-kits.html
    ├── item-kits-add.html
    ├── item-kits-edit.html
    ├── categories.html
    ├── categories-add.html
    │
    ├── — REPORTS —
    ├── reports.html
    ├── reports-sales.html
    ├── reports-inventory.html
    ├── reports-closeout.html
    ├── reports-detailed-sales.html
    ├── reports-summary-items.html
    ├── reports-vat.html
    │
    ├── — RECEIVING —
    ├── receiving.html
    ├── receiving-add.html
    ├── receiving-view.html
    │
    ├── — SALES —
    ├── sales.html
    ├── sales-new.html              ← POS / New Sale screen
    ├── sales-view.html
    ├── sales-receipt.html
    │
    ├── — TRANSFER —
    ├── transfer-out.html
    ├── transfer-out-add.html
    ├── transfer-out-view.html
    ├── transfer-in.html
    ├── transfer-in-add.html
    ├── transfer-in-view.html
    │
    ├── — EMPLOYEES —
    ├── employees.html
    ├── employees-add.html
    ├── employees-edit.html
    ├── employees-view.html
    │
    ├── — VAT REPORT —
    ├── vat-report.html
    │
    ├── — STORE CONFIG —
    ├── store-config.html
    ├── store-config-general.html
    ├── store-config-taxes.html
    ├── store-config-payment.html
    │
    ├── — LOCATIONS —
    ├── locations.html
    ├── locations-add.html
    ├── locations-edit.html
    │
    └── — MESSAGES —
        └── messages.html
```

---

## 🚀 How to Create a New Page

1. **Copy** `components/page-template.html`
2. **Paste** into the correct folder under `pages/`
3. **Rename** the file (e.g. `customers.html`)
4. Replace all **`PAGE TITLE`** placeholders with the actual page name
5. Add your page content inside the `<!-- YOUR PAGE CONTENT GOES HERE -->` section
6. Mark the correct **nav-link as active** in the sidebar

---

## 🎨 Design System Quick Reference

### Colors (CSS Variables)
| Token | Value | Usage |
|---|---|---|
| `--primary` | `#2563EB` | Buttons, active states, links |
| `--success` | `#10B981` | Success badges, positive values |
| `--danger`  | `#EF4444` | Errors, delete actions |
| `--warning` | `#F59E0B` | Warnings |
| `--gray-900`| `#0F172A` | Headings |
| `--gray-500`| `#64748B` | Body text, labels |

### Utility Classes
```html
<!-- Badges -->
<span class="badge badge-primary">Active</span>
<span class="badge badge-success">Paid</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Cancelled</span>

<!-- Buttons -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-outline">Cancel</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- Cards -->
<div class="card">
  <div class="card-header">
    <div class="card-title">Title</div>
  </div>
  <div class="card-body">Content</div>
</div>
```

### CDN Libraries Included
- **Bootstrap 5.3.3** — Grid, utilities, modals, dropdowns
- **Bootstrap Icons 1.11.3** — Icon set (`bi bi-*`)
- **Chart.js 4.4.3** — Line, bar, doughnut charts
- **Plus Jakarta Sans** — Font (Google Fonts)

---

## 📌 Notes
- The sidebar HTML is **duplicated** in each page for simplicity (no server-side includes needed)
- For large projects, consider using a JS-based include: `fetch('components/sidebar.html')`
- All pages in `pages/` must use `../assets/css/style.css` (one level up)
- `index.html` at root uses `assets/css/style.css` (no `../`)
# corey-dashboard
