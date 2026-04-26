// Tab switching
    document.getElementById('scTabs').addEventListener('click', function (e) {
      const btn = e.target.closest('.sc-tab');
      if (!btn) return;
      document.querySelectorAll('.sc-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sc-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });

    // Payment type pills
    function setActivePaymentPill(group, activeButton) {
      group.querySelectorAll('.sc-payment-pill').forEach(btn => {
        const isActive = btn === activeButton;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      const selectedLabel = activeButton.textContent.trim();
      const card = group.closest('.sc-payment-card');
      if (!card) return;
      const dp = card.querySelector('#defaultPaymentType');
      const drp = card.querySelector('#defaultReceivingPaymentType');
      if (dp && dp.options.length > 0) dp.options[0].textContent = selectedLabel;
      if (drp && drp.options.length > 0) drp.options[0].textContent = selectedLabel;
    }

    document.querySelectorAll('.sc-payment-pills').forEach(group => {
      const buttons = group.querySelectorAll('.sc-payment-pill');
      if (!buttons.length) return;
      buttons.forEach(button => {
        button.addEventListener('click', function () { setActivePaymentPill(group, this); });
      });
      setActivePaymentPill(group, buttons[0]);
    });

    // Add Shipping Provider row
    function addShippingProvider() {
      const tbody = document.getElementById('shippingProvidersBody');
      if (!tbody) return;
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td><input type="text" style="width:90px;height:26px;border:1px solid #d1d5db;border-radius:2px;padding:2px 6px;font-size:12px;" /></td>
      <td><input type="text" style="width:90px;height:26px;border:1px solid #d1d5db;border-radius:2px;padding:2px 6px;font-size:12px;" /></td>
      <td><input type="text" style="width:70px;height:26px;border:1px solid #d1d5db;border-radius:2px;padding:2px 6px;font-size:12px;" /></td>
      <td><input type="text" style="width:70px;height:26px;border:1px solid #d1d5db;border-radius:2px;padding:2px 6px;font-size:12px;" /></td>
      <td style="text-align:center;"><input type="radio" name="shippingProviderDefault" style="accent-color:#2563eb;" /></td>
      <td style="text-align:center;"><button onclick="this.closest('tr').remove()" style="background:none;border:none;color:#ef4444;font-size:12px;font-weight:600;cursor:pointer;">Delete</button></td>
      <td style="text-align:center;"><button style="background:none;border:none;color:#2563eb;font-size:12px;font-weight:600;cursor:pointer;">Add Rate</button></td>
      <td style="text-align:center;"><button style="background:none;border:none;font-size:15px;cursor:pointer;color:#64748b;">⇅</button></td>
    `;
      tbody.appendChild(tr);
    }

    // Reusable save feedback
    function attachSaveFeedback(id) {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', function () {
        this.textContent = 'Saved!';
        this.style.background = '#16a34a';
        setTimeout(() => { this.textContent = 'Save'; this.style.background = ''; }, 1800);
      });
    }

    attachSaveFeedback('btnSaveCompany');
    attachSaveFeedback('btnSaveTaxes');
    attachSaveFeedback('btnSaveCurrency');
    attachSaveFeedback('btnSavePaymentTypes');
    attachSaveFeedback('btnSavePriceRules');
    attachSaveFeedback('btnSaveOrdersDeliveries');
    attachSaveFeedback('btnSaveSales');
    attachSaveFeedback('btnSaveProfit');
