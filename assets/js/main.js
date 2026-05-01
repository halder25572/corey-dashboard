/**
 * Dashboard Main JS
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sidebar Toggle (Mobile) ── */
  const toggleBtn    = document.querySelector('.sidebar-toggle');
  const sidebar      = document.querySelector('.sidebar');
  const overlay      = document.querySelector('.sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  /* ── Nav Dropdowns ── */
  document.querySelectorAll('.nav-link[data-toggle="submenu"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.closest('.nav-item');
      const isOpen = parent.classList.contains('open');

      // Close all
      document.querySelectorAll('.nav-item.open').forEach(item => {
        item.classList.remove('open');
      });

      if (!isOpen) parent.classList.add('open');
    });
  });

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
      // User specifically requested NOT to auto-open the dropdown when navigating to child pages
      // like Item Kits or Order. The dropdown should only open when explicitly clicking Inventory.
    }
  });

  /* ── Init Charts (if page has canvas#salesChart) ── */
  const salesCanvas = document.getElementById('salesChart');
  if (salesCanvas && window.Chart) {
    initSalesChart(salesCanvas);
  }

  /* ── Tooltip init (Bootstrap) ── */
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(el => new bootstrap.Tooltip(el));

  /* ── Dropdown init (Bootstrap) ── */
  const dropdownEls = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  dropdownEls.forEach(el => new bootstrap.Dropdown(el));

  /* ── Sync Theme Color Picker ── */
  const picker = document.getElementById('themeColorPicker');
  if (picker) picker.value = localStorage.getItem('themeColor') || '#2563EB';

});

function changeThemeColor(color) {
  localStorage.setItem('themeColor', color);
  applyThemeColor(color);
}

function applyThemeColor(color) {
  const root = document.documentElement;
  root.style.setProperty('--primary', color);
  
  // Generate variations (Simplified simulation)
  root.style.setProperty('--primary-dark', shadeColor(color, -20));
  root.style.setProperty('--primary-light', shadeColor(color, 90));
  root.style.setProperty('--primary-soft', shadeColor(color, 80));
}

// Helper to lighten/darken hex color
function shadeColor(color, percent) {
  if (!color || color.startsWith('var')) return color;
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  if (isNaN(R) || isNaN(G) || isNaN(B)) return color;

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

/* ── Initial Theme Application (Run as early as possible) ── */
const savedThemeColor = localStorage.getItem('themeColor') || '#2563EB';
applyThemeColor(savedThemeColor);


/* ── Sales Chart ── */
function initSalesChart(canvas) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data   = [120, 145, 130, 155, 140, 170, 165, 180, 160, 175, 185, 190];

  const themeColor = localStorage.getItem('themeColor') || '#2563EB';
  let r = parseInt(themeColor.slice(1, 3), 16),
      g = parseInt(themeColor.slice(3, 5), 16),
      b = parseInt(themeColor.slice(5, 7), 16);

  const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Total Sales',
        data: data,
        borderColor: themeColor,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: themeColor,
        fill: true,
        backgroundColor: gradient,
        tension: 0.45,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          titleColor: '#94A3B8',
          bodyColor: '#fff',
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: ctx => `$${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#94A3B8', font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" } }
        },
        y: {
          grid: { color: '#F1F5F9', drawBorder: false },
          border: { display: false, dash: [4,4] },
          ticks: {
            color: '#94A3B8',
            font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" },
            callback: v => v
          },
          min: 0,
          max: 200,
        }
      }
    }
  });
}

/* ── Utility: format currency ── */
function formatCurrency(val, symbol = '$') {
  return symbol + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 });
}




