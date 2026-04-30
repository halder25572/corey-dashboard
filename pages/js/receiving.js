function switchFilter(el, viewId) {
  // Update active button
  document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');

  // Show corresponding view
  document.querySelectorAll('.filter-view').forEach(view => view.style.display = 'none');
  document.getElementById(viewId).style.display = 'block';
}

function toggleGrid() {
  const grid = document.getElementById('filtersCard');
  if (grid.style.display === 'none') {
    grid.style.display = 'block';
  } else {
    grid.style.display = 'none';
  }
}

// ✅ CHANGED: Purchase Order mode removed
function setMode(mode, icon) {
  const btn = document.getElementById('currentMode');
  btn.innerHTML = `<i class="bi ${icon}"></i> ${mode}`;

  if (mode === 'Return') {
    btn.style.background = '#fffbeb';
    btn.style.color = '#d97706';
    btn.style.borderColor = '#fde68a';
  } else if (mode === 'Transfer') {
    btn.style.background = '#eff6ff';
    btn.style.color = '#2563eb';
    btn.style.borderColor = '#bfdbfe';
  } else {
    // Receive mode (default)
    btn.style.background = '#fee2e2';
    btn.style.color = '#ef4444';
    btn.style.borderColor = '#fecaca';
  }
}

// ✅ REMOVED: switchPayment() function deleted
// Payment is no longer part of receiving

function showDiscountForm(el) {
  el.style.display = 'none';
  el.nextElementSibling.style.display = 'flex';
  el.nextElementSibling.querySelector('input').focus();
}

function hideDiscountForm(btn) {
  const group = btn.closest('.discount-input-group');
  const link = group.previousElementSibling;
  const val = group.querySelector('input').value;

  if (val) {
    const parentRow = btn.closest('.discount-row');
    const labelText = parentRow.querySelector('span:first-child').innerText;
    const isPercent = labelText.includes('Percent');

    link.innerText = isPercent ? (val.endsWith('%') ? val : val + '%') : '$' + val;
    link.style.color = 'var(--primary)';
    link.style.borderBottom = 'none';

    // Reveal table items
    const cartTable = document.getElementById('cartItems');
    const emptyMsg = document.getElementById('emptyCart');
    if (cartTable && emptyMsg) {
      cartTable.style.display = 'table-row-group';
      emptyMsg.style.display = 'none';
    }

    const subTotalEl = document.querySelector('.totals-section .total-row:nth-child(1) span:last-child');
    const totalEl = document.querySelector('.totals-section .total-row:nth-child(3) span:first-child');
    const amountDueEl = document.querySelector('.totals-section .total-row:nth-child(3) span:last-child');

    const firstRow = cartTable.querySelector('tr');
    const cells = firstRow ? firstRow.cells : null;

    if (!isPercent) {
      const flatVal = parseFloat(val) || 0;
      window.currentDemoBase = flatVal;
      window.currentDemoPercent = window.currentDemoPercent || 0;

      if (subTotalEl) subTotalEl.innerText = '-$' + flatVal.toFixed(2);
      if (totalEl) totalEl.innerText = '-$' + flatVal.toFixed(2);

      const calculatedDiscount = flatVal * (window.currentDemoPercent / 100);
      const finalAmount = flatVal - calculatedDiscount;
      if (amountDueEl) amountDueEl.innerText = '-$' + finalAmount.toFixed(2);

      if (cells && cells.length >= 6) {
        cells[2].innerText = '$' + flatVal.toFixed(2);
        cells[3].innerText = '1';
        cells[4].innerText = window.currentDemoPercent + '%';
        cells[5].innerText = '-$' + finalAmount.toFixed(2);
      }
    } else {
      const percentVal = parseFloat(val) || 0;
      window.currentDemoPercent = percentVal;
      const currentBase = window.currentDemoBase || 0;
      const calculatedDiscount = currentBase * (percentVal / 100);
      const finalAmount = currentBase - calculatedDiscount;

      if (amountDueEl) amountDueEl.innerText = '-$' + finalAmount.toFixed(2);

      if (cells && cells.length >= 6) {
        cells[4].innerText = percentVal + '%';
        cells[5].innerText = '-$' + finalAmount.toFixed(2);
      }
    }
  }

  group.style.display = 'none';
  link.style.display = 'inline';
}

// ✅ NEW: Finish Receiving — only updates stock, no payment
function finishReceiving() {
  const cartItems = document.getElementById('cartItems');
  const rows = cartItems ? cartItems.querySelectorAll('tr') : [];

  if (rows.length === 0 || cartItems.style.display === 'none') {
    alert('No items in the receiving list.');
    return;
  }

  // Get current mode (Receive or Return)
  const modeBtn = document.getElementById('currentMode');
  const modeText = modeBtn ? modeBtn.innerText.trim() : 'Receive';
  const isReturn = modeText.includes('Return');

  // Loop through each item and update stock
  rows.forEach(row => {
    const cells = row.cells;
    if (!cells || cells.length < 4) return;

    const itemName = row.querySelector('.item-name')?.innerText || 'Unknown';
    const qty = parseInt(cells[3]?.innerText) || 0;

    if (isReturn) {
      // Return mode: stock DECREASES
      console.log(`Return: ${itemName} → stock -${qty}`);
      // TODO: call your backend/localStorage here to decrease stock
    } else {
      // Receive mode: stock INCREASES, NO payment
      console.log(`Receive: ${itemName} → stock +${qty}`);
      // TODO: call your backend/localStorage here to increase stock
    }
  });

  // Redirect to receipt page after stock update
  location.href = 'receiving-receipt.html';
}