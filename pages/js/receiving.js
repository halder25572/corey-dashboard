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

  function setMode(mode, icon) {
    const btn = document.getElementById('currentMode');
    btn.innerHTML = `<i class="bi ${icon}"></i> ${mode}`;
    
    // Optional: Change button color based on mode
    if (mode === 'Return') {
      btn.style.background = '#fffbeb';
      btn.style.color = '#d97706';
      btn.style.borderColor = '#fde68a';
    } else if (mode === 'Transfer') {
      btn.style.background = '#eff6ff';
      btn.style.color = '#2563eb';
      btn.style.borderColor = '#bfdbfe';
    } else {
      btn.style.background = '#fee2e2';
      btn.style.color = '#ef4444';
      btn.style.borderColor = '#fecaca';
    }
  }

  function switchPayment(el) {
    document.querySelectorAll('.btn-pay-method').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
  }

  function showDiscountForm(el) {
    el.style.display = 'none';
    el.nextElementSibling.style.display = 'flex';
    el.nextElementSibling.querySelector('input').focus();
  }

  let baseSubTotal = 0.00;
  let currentDiscountPercent = 0;
  let currentDiscountFlat = 0;

  function hideDiscountForm(btn) {
    const group = btn.closest('.discount-input-group');
    const link = group.previousElementSibling;
    const val = group.querySelector('input').value;
    const isPercent = link.innerText.includes('Percent');
    
    if (val) {
      link.innerText = val + (isPercent ? '%' : '');
      link.style.color = 'var(--primary)';
      link.style.borderBottom = 'none';
      
      if (isPercent) {
        currentDiscountPercent = parseFloat(val) || 0;
      } else {
        // "Discount Entire Receiving" acts as a flat amount override for this demo
        baseSubTotal = parseFloat(val) || 0;
        currentDiscountFlat = 0; 
      }

      // Reveal table items and update totals
      document.getElementById('cartItems').style.display = 'table-row-group';
      document.getElementById('emptyCart').style.display = 'none';
      
      updateCalculations();

      // Show payment area and sidebar actions
      document.getElementById('paymentArea').style.display = 'block';
      document.getElementById('sidebarActions').style.setProperty('display', 'flex', 'important');
    }
    
    group.style.display = 'none';
    link.style.display = 'inline';
  }

  function cancelDiscountForm(btn) {
    const group = btn.parentElement;
    const link = group.previousElementSibling;
    group.style.display = 'none';
    link.style.display = 'inline';
  }

  function updateCalculations() {
    const payVal = parseFloat(document.getElementById('payAmountInput').value) || 0;
    
    // Percent calculation: Base - (Base * Percent / 100)
    let totalAfterPercent = baseSubTotal - (baseSubTotal * (currentDiscountPercent / 100));
    let finalTotal = totalAfterPercent; 
    let amountDue = finalTotal - payVal;

    // Update UI
    document.querySelector('.sub-total-val').innerText = '-$' + baseSubTotal.toFixed(2);
    document.querySelector('.total-val.text-success').innerText = '-$' + finalTotal.toFixed(2);
    document.querySelector('.total-val.text-orange').innerText = '-$' + amountDue.toFixed(2);

    // Sync input box with final total
    const payInput = document.getElementById('payAmountInput');
    if (payInput) {
      payInput.value = finalTotal.toFixed(2);
    }

    // Revert Finish button text
    const finishBtn = document.querySelector('.btn-pay-finish');
    if (finishBtn) {
      finishBtn.innerText = 'Finish';
    }
  }

  // Add event listener to payment input
  document.getElementById('payAmountInput')?.addEventListener('input', updateCalculations);

  function switchPaymentTab(btn) {
    // Reset all tabs to light style
    document.querySelectorAll('.btn-pay-item-final').forEach(t => {
      t.classList.remove('btn-primary');
      t.classList.add('btn-light', 'border-0');
      t.style.background = '#f1f5f9';
      t.style.color = '#64748b';
    });

    // Set active tab to primary style
    btn.classList.remove('btn-light', 'border-0');
    btn.classList.add('btn-primary');
    btn.style.background = ''; // Revert to primary blue
    btn.style.color = '#fff';
  }

  function toggleDatePicker() {
    const isChecked = document.getElementById('changeDateCheck').checked;
    document.getElementById('datePickerGroup').style.display = isChecked ? 'block' : 'none';
  }
