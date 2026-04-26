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

  function hideDiscountForm(btn) {
    const group = btn.closest('.discount-input-group');
    const link = group.previousElementSibling;
    const val = group.querySelector('input').value;
    
    if (val) {
      link.innerText = val + (link.innerText.includes('Percent') ? '%' : '');
      link.style.color = 'var(--primary)';
      link.style.borderBottom = 'none';
    }
    
    group.style.display = 'none';
    link.style.display = 'inline';
  }
