// ─── Dummy Data ───────────────────────────────────────────────
const dummyReceivings = [
  { id: 'RCV-1001', date: '28 Apr 2026', supplier: 'Hakim Group',    items: 5,  total: '$1,250.00' },
  { id: 'RCV-1002', date: '27 Apr 2026', supplier: 'ACI Limited',    items: 3,  total: '$740.00'   },
  { id: 'RCV-1003', date: '26 Apr 2026', supplier: 'Pran Foods',     items: 8,  total: '$3,200.00' },
  { id: 'RCV-1004', date: '25 Apr 2026', supplier: 'Hakim Group',    items: 2,  total: '$480.00'   },
  { id: 'RCV-1005', date: '24 Apr 2026', supplier: 'Square Pharma',  items: 6,  total: '$2,100.00' },
];

const dummyReturns = [
  { id: 'RET-2001', date: '29 Apr 2026', supplier: 'Hakim Group',    items: 2,  total: '-$320.00'  },
  { id: 'RET-2002', date: '27 Apr 2026', supplier: 'Pran Foods',     items: 1,  total: '-$150.00'  },
  { id: 'RET-2003', date: '25 Apr 2026', supplier: 'ACI Limited',    items: 3,  total: '-$560.00'  },
];

// ─── Current Mode ─────────────────────────────────────────────
let currentMode = 'Receive'; // 'Receive' or 'Return'

// ─── Toggle: Receive / Return ──────────────────────────────────
function setReceivingMode(mode) {
  currentMode = mode;

  // Update toggle button styles
  const btnReceive = document.getElementById('modeReceive');
  const btnReturn  = document.getElementById('modeReturn');
  btnReceive.classList.toggle('active', mode === 'Receive');
  btnReturn.classList.toggle('active',  mode === 'Return');

  // Update empty cart label
  const cartLabel = document.getElementById('cartModeLabel');
  if (cartLabel) cartLabel.textContent = mode === 'Receive' ? '[Receiving]' : '[Return]';

  // Update Finish button label
  const finishBtn = document.getElementById('finishBtn');
  if (finishBtn) {
    finishBtn.innerHTML = mode === 'Receive'
      ? '<i class="bi bi-check-circle"></i> Finish Receiving'
      : '<i class="bi bi-check-circle"></i> Finish Return';
  }

  // Update history table
  renderHistory(mode);
}

// ─── Render History Table ─────────────────────────────────────
function renderHistory(mode) {
  const tbody      = document.getElementById('historyBody');
  const titleEl    = document.getElementById('historyTitle');
  const data       = mode === 'Receive' ? dummyReceivings : dummyReturns;
  const isReceive  = mode === 'Receive';

  titleEl.textContent = isReceive ? 'Recent Receivings' : 'Recent Returns';

  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding: 20px;">No records found</td></tr>`;
    return;
  }

  data.forEach(row => {
    const badgeHTML = isReceive
      ? `<span class="badge-receive">Receive</span>`
      : `<span class="badge-return">Return</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="history-id">${row.id}</span></td>
      <td>${row.date}</td>
      <td>${row.supplier}</td>
      <td style="text-align:center;">${row.items}</td>
      <td style="font-weight:700; color:${isReceive ? '#166534' : '#d97706'};">${row.total}</td>
      <td>${badgeHTML}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── Filter (Category / Tags / Suppliers / Favorites) ─────────
function switchFilter(el, viewId) {
  document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.filter-view').forEach(view => view.style.display = 'none');
  document.getElementById(viewId).style.display = 'block';
}

// ─── Show / Hide Filters Grid ──────────────────────────────────
function toggleGrid() {
  const grid = document.getElementById('filtersCard');
  grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
}

// ─── Discount Form ─────────────────────────────────────────────
function showDiscountForm(el) {
  el.style.display = 'none';
  el.nextElementSibling.style.display = 'flex';
  el.nextElementSibling.querySelector('input').focus();
}

function hideDiscountForm(btn) {
  const group = btn.closest('.discount-input-group');
  const link  = group.previousElementSibling;
  const val   = group.querySelector('input').value;

  if (val) {
    const parentRow = btn.closest('.discount-row');
    const labelText = parentRow.querySelector('span:first-child').innerText;
    const isPercent = labelText.includes('Percent');

    link.innerText = isPercent ? (val.endsWith('%') ? val : val + '%') : '$' + val;
    link.style.color = 'var(--primary)';
    link.style.borderBottom = 'none';

    const cartTable = document.getElementById('cartItems');
    const emptyMsg  = document.getElementById('emptyCart');
    if (cartTable && emptyMsg) {
      cartTable.style.display = 'table-row-group';
      emptyMsg.style.display  = 'none';
    }

    const subTotalEl  = document.querySelector('.totals-section .total-row:nth-child(1) span:last-child');
    const totalEl     = document.querySelector('.totals-section .total-row:nth-child(3) span:first-child');
    const amountDueEl = document.querySelector('.totals-section .total-row:nth-child(3) span:last-child');
    const firstRow    = cartTable.querySelector('tr');
    const cells       = firstRow ? firstRow.cells : null;

    if (!isPercent) {
      const flatVal = parseFloat(val) || 0;
      window.currentDemoBase    = flatVal;
      window.currentDemoPercent = window.currentDemoPercent || 0;
      if (subTotalEl)  subTotalEl.innerText  = '-$' + flatVal.toFixed(2);
      if (totalEl)     totalEl.innerText     = '-$' + flatVal.toFixed(2);
      const finalAmount = flatVal - flatVal * (window.currentDemoPercent / 100);
      if (amountDueEl) amountDueEl.innerText = '-$' + finalAmount.toFixed(2);
      if (cells && cells.length >= 6) {
        cells[2].innerText = '$' + flatVal.toFixed(2);
        cells[3].innerText = '1';
        cells[4].innerText = window.currentDemoPercent + '%';
        cells[5].innerText = '-$' + finalAmount.toFixed(2);
      }
    } else {
      const percentVal  = parseFloat(val) || 0;
      window.currentDemoPercent = percentVal;
      const currentBase = window.currentDemoBase || 0;
      const finalAmount = currentBase - currentBase * (percentVal / 100);
      if (amountDueEl) amountDueEl.innerText = '-$' + finalAmount.toFixed(2);
      if (cells && cells.length >= 6) {
        cells[4].innerText = percentVal + '%';
        cells[5].innerText = '-$' + finalAmount.toFixed(2);
      }
    }
  }

  group.style.display = 'none';
  link.style.display  = 'inline';
}

// ─── Finish Receiving / Return ─────────────────────────────────
function finishReceiving() {
  const cartItems = document.getElementById('cartItems');
  const rows = cartItems ? cartItems.querySelectorAll('tr') : [];

  if (rows.length === 0 || cartItems.style.display === 'none') {
    alert('No items in the list.');
    return;
  }

  rows.forEach(row => {
    const cells    = row.cells;
    if (!cells || cells.length < 4) return;
    const itemName = row.querySelector('.item-name')?.innerText || 'Unknown';
    const qty      = parseInt(cells[3]?.innerText) || 0;

    if (currentMode === 'Return') {
      // Return → stock decreases
      console.log(`Return: ${itemName} → stock -${qty}`);
      // TODO: connect to backend
    } else {
      // Receive → stock increases, NO payment
      console.log(`Receive: ${itemName} → stock +${qty}`);
      // TODO: connect to backend
    }
  });

  location.href = 'receiving-receipt.html';
}

// ─── Init on page load ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHistory('Receive'); // default: show Receivings
});