(function () {
  "use strict";

  const PRODUCTS = [
    {
      id: "p1",
      brand: "Nike",
      name: "Air Max Pulse",
      price: 5290,
      oldPrice: null,
      gender: "men",
      category: ["lifestyle", "running"],
      tags: ["featured"],
      image:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80",
      colors: "3 สี",
    },
    {
      id: "p2",
      brand: "Adidas",
      name: "Ultraboost Light",
      price: 6490,
      oldPrice: 6990,
      gender: "men",
      category: ["running"],
      tags: ["sale"],
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      colors: "4 สี",
    },
    {
      id: "p3",
      brand: "New Balance",
      name: "574 Core",
      price: 3490,
      oldPrice: null,
      gender: "women",
      category: ["lifestyle"],
      tags: ["featured"],
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      colors: "6 สี",
    },
    {
      id: "p4",
      brand: "Puma",
      name: "RS-X Reinvent",
      price: 4190,
      oldPrice: null,
      gender: "women",
      category: ["lifestyle"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      colors: "2 สี",
    },
    {
      id: "p5",
      brand: "Jordan",
      name: "Air Jordan 1 Low",
      price: 4590,
      oldPrice: null,
      gender: "men",
      category: ["lifestyle", "basketball"],
      tags: ["featured"],
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      colors: "8 สี",
    },
    {
      id: "p6",
      brand: "Converse",
      name: "Chuck 70 High",
      price: 3190,
      oldPrice: 3490,
      gender: "women",
      category: ["lifestyle"],
      tags: ["sale"],
      image:
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80",
      colors: "5 สี",
    },
    {
      id: "p7",
      brand: "Vans",
      name: "Old Skool",
      price: 2890,
      oldPrice: null,
      gender: "kids",
      category: ["lifestyle"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      colors: "หลากสี",
    },
    {
      id: "p8",
      brand: "Asics",
      name: "Gel-Kayano 30",
      price: 5990,
      oldPrice: null,
      gender: "women",
      category: ["running"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      colors: "4 สี",
    },
    {
      id: "p9",
      brand: "Reebok",
      name: "Classic Leather",
      price: 2590,
      oldPrice: null,
      gender: "men",
      category: ["lifestyle"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      colors: "3 สี",
    },
    {
      id: "p10",
      brand: "Under Armour",
      name: "Curry Flow 10",
      price: 5590,
      oldPrice: null,
      gender: "men",
      category: ["basketball"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80",
      colors: "2 สี",
    },
    {
      id: "p11",
      brand: "Birkenstock",
      name: "Arizona EVA",
      price: 1890,
      oldPrice: null,
      gender: "women",
      category: ["sandals"],
      tags: [],
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      colors: "6 สี",
    },
    {
      id: "p12",
      brand: "Crocs",
      name: "Classic Clog",
      price: 1490,
      oldPrice: 1790,
      gender: "kids",
      category: ["sandals", "lifestyle"],
      tags: ["sale"],
      image:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80",
      colors: "หลากสี",
    },
  ];

  const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

  const STORAGE_KEY = "soleStudioCart";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const els = {
    productGrid: $("#productGrid"),
    resultCount: $("#resultCount"),
    sortSelect: $("#sortSelect"),
    brandFilters: $("#brandFilters"),
    cartToggle: $("#cartToggle"),
    cartDrawer: $("#cartDrawer"),
    drawerOverlay: $("#drawerOverlay"),
    cartClose: $("#cartClose"),
    cartList: $("#cartList"),
    cartBadge: $("#cartBadge"),
    cartTotal: $("#cartTotal"),
    checkoutBtn: $("#checkoutBtn"),
    navToggle: $("#navToggle"),
    mainNav: $(".main-nav"),
    searchToggle: $("#searchToggle"),
    searchBar: $("#searchBar"),
    searchInput: $("#searchInput"),
    searchClose: $("#searchClose"),
    brandTrack: $(".brand-track"),
    openFilters: $("#openFilters"),
    filters: $(".filters"),
    filtersClose: $("#filtersClose"),
    resetFilters: $("#resetFilters"),
    quickView: $("#quickView"),
    quickViewContent: $("#quickViewContent"),
    toast: $("#toast"),
    finderBudget: $("#finderBudget"),
    finderBudgetLabel: $("#finderBudgetLabel"),
    finderActivity: $("#finderActivity"),
    finderApply: $("#finderApply"),
    year: $("#year"),
  };

  let cart = loadCart();
  let searchQuery = "";
  let selectedBrands = new Set();
  /** @type {number | null} null = ไม่จำกัดงบ (จนกว่าจะใช้ตัวช่วยหา) */
  let maxBudget = null;
  let finderActivity = "";
  let finderBudgetActive = false;

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function formatMoney(n) {
    return (
      "฿" +
      n.toLocaleString("th-TH", {
        maximumFractionDigits: 0,
      })
    );
  }

  function getFilterState() {
    const gender = $('input[name="gender"]:checked')?.value || "";
    const categories = $$('input[name="category"]:checked').map((c) => c.value);
    return { gender, categories };
  }

  function productMatches(p) {
    const { gender, categories } = getFilterState();
    if (gender && p.gender !== gender) return false;
    if (selectedBrands.size && !selectedBrands.has(p.brand)) return false;
    if (categories.length) {
      const ok = categories.some((c) => p.category.includes(c));
      if (!ok) return false;
    }
    if (finderBudgetActive && maxBudget !== null && p.price > maxBudget) return false;
    if (finderActivity && !p.category.includes(finderActivity)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const blob = `${p.brand} ${p.name}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  }

  function sortProducts(list) {
    const mode = els.sortSelect.value;
    const out = [...list];
    if (mode === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (mode === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (mode === "name") out.sort((a, b) => a.name.localeCompare(b.name, "th"));
    else out.sort((a, b) => (b.tags.includes("featured") ? 1 : 0) - (a.tags.includes("featured") ? 1 : 0));
    return out;
  }

  function renderProducts() {
    const filtered = PRODUCTS.filter(productMatches);
    const sorted = sortProducts(filtered);
    els.resultCount.textContent =
      sorted.length === 0
        ? "ไม่พบสินค้าที่ตรงกับตัวกรอง"
        : `พบ ${sorted.length} รายการ`;
    els.productGrid.innerHTML = "";
    sorted.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("role", "listitem");
      const sale = p.oldPrice && p.oldPrice > p.price;
      card.innerHTML = `
        <div class="product-card__media">
          <img src="${p.image}" alt="${escapeHtml(p.name)} — ${escapeHtml(p.brand)}" loading="lazy" width="400" height="440" onerror="this.onerror=null;this.src='https://placehold.co/400x440/f5f5f5/aaa?text=No+Image'" />
          <div class="product-card__badges">
            ${p.tags.includes("featured") ? '<span class="badge">เด่น</span>' : ""}
            ${sale ? '<span class="badge badge--sale">ลด</span>' : ""}
          </div>
        </div>
        <div class="product-card__body">
          <p class="product-card__brand">${escapeHtml(p.brand)}</p>
          <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
          <p class="product-card__meta">${escapeHtml(p.colors)} · ${genderLabel(p.gender)}</p>
          <p class="product-card__price">
            ${sale ? `<del>${formatMoney(p.oldPrice)}</del>` : ""}
            ${formatMoney(p.price)}
          </p>
          <div class="product-card__actions">
            <button type="button" class="btn-sm btn-sm--ghost" data-action="qv" data-id="${p.id}">ดูรายละเอียด</button>
            <button type="button" class="btn-sm btn-sm--primary" data-action="add" data-id="${p.id}">ใส่ตะกร้า</button>
          </div>
        </div>
      `;
      els.productGrid.appendChild(card);
    });

    els.productGrid.querySelectorAll('[data-action="add"]').forEach((btn) => {
      btn.addEventListener("click", () => addToCart(btn.dataset.id));
    });
    els.productGrid.querySelectorAll('[data-action="qv"]').forEach((btn) => {
      btn.addEventListener("click", () => openQuickView(btn.dataset.id));
    });
  }

  function genderLabel(g) {
    if (g === "men") return "ผู้ชาย";
    if (g === "women") return "ผู้หญิง";
    if (g === "kids") return "เด็ก";
    return g;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderBrandFilters() {
    els.brandFilters.innerHTML = BRANDS.map(
      (b) => `
      <label>
        <input type="checkbox" name="brand" value="${escapeHtml(b)}" />
        ${escapeHtml(b)}
      </label>
    `
    ).join("");
    $$('input[name="brand"]', els.brandFilters).forEach((input) => {
      input.addEventListener("change", () => {
        selectedBrands.clear();
        $$('input[name="brand"]:checked', els.brandFilters).forEach((i) =>
          selectedBrands.add(i.value)
        );
        renderProducts();
        syncBrandPills();
      });
    });
  }

  function renderBrandTrack() {
    els.brandTrack.innerHTML = BRANDS.map(
      (b) =>
        `<button type="button" class="brand-pill" data-brand="${escapeHtml(b)}" role="listitem">${escapeHtml(
          b
        )}</button>`
    ).join("");
    els.brandTrack.querySelectorAll(".brand-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const b = btn.dataset.brand;
        selectedBrands = new Set([b]);
        $$('input[name="brand"]', els.brandFilters).forEach((i) => {
          i.checked = i.value === b;
        });
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
        renderProducts();
        syncBrandPills();
      });
    });
  }

  function syncBrandPills() {
    els.brandTrack.querySelectorAll(".brand-pill").forEach((btn) => {
      const b = btn.dataset.brand;
      btn.classList.toggle("is-active", selectedBrands.size === 1 && selectedBrands.has(b));
    });
  }

  function addToCart(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const line = cart.find((l) => l.id === id);
    if (line) line.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartUi();
    showToast(`เพิ่ม ${p.name} ลงตะกร้าแล้ว`);
  }

  function setQty(id, qty) {
    const line = cart.find((l) => l.id === id);
    if (!line) return;
    line.qty = Math.max(1, qty);
    saveCart();
    updateCartUi();
  }

  function removeLine(id) {
    cart = cart.filter((l) => l.id !== id);
    saveCart();
    updateCartUi();
  }

  function cartTotalAmount() {
    let sum = 0;
    cart.forEach((line) => {
      const p = PRODUCTS.find((x) => x.id === line.id);
      if (p) sum += p.price * line.qty;
    });
    return sum;
  }

  function updateCartUi() {
    const count = cart.reduce((a, l) => a + l.qty, 0);
    els.cartBadge.textContent = String(count);
    els.cartBadge.hidden = count === 0;
    els.cartTotal.textContent = formatMoney(cartTotalAmount());

    if (!cart.length) {
      els.cartList.innerHTML = '<p style="color:#757575;font-size:0.9rem">ยังไม่มีสินค้าในตะกร้า</p>';
      return;
    }

    els.cartList.innerHTML = cart
      .map((line) => {
        const p = PRODUCTS.find((x) => x.id === line.id);
        if (!p) return "";
        return `
        <div class="cart-line" data-id="${p.id}">
          <img src="${p.image}" alt="" width="72" height="72" />
          <div>
            <p class="cart-line__title">${escapeHtml(p.name)}</p>
            <p class="cart-line__price">${formatMoney(p.price)} × ${line.qty}</p>
            <div class="qty-row">
              <button type="button" aria-label="ลดจำนวน" data-dec="${p.id}">−</button>
              <span>${line.qty}</span>
              <button type="button" aria-label="เพิ่มจำนวน" data-inc="${p.id}">+</button>
            </div>
          </div>
          <button type="button" class="cart-line__remove" data-remove="${p.id}">ลบ</button>
        </div>
      `;
      })
      .join("");

    els.cartList.querySelectorAll("[data-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.inc;
        const line = cart.find((l) => l.id === id);
        if (line) setQty(id, line.qty + 1);
      });
    });
    els.cartList.querySelectorAll("[data-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.dec;
        const line = cart.find((l) => l.id === id);
        if (line) setQty(id, line.qty - 1);
      });
    });
    els.cartList.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => removeLine(btn.dataset.remove));
    });
  }

  function syncBodyScrollLock() {
    const cartOpen = !els.cartDrawer.hidden;
    const modalOpen = !els.quickView.hidden;
    document.body.style.overflow = cartOpen || modalOpen ? "hidden" : "";
  }

  function openCart() {
    els.drawerOverlay.hidden = false;
    els.cartDrawer.hidden = false;
    syncBodyScrollLock();
  }

  function closeCart() {
    els.drawerOverlay.hidden = true;
    els.cartDrawer.hidden = true;
    syncBodyScrollLock();
  }

  function openQuickView(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    els.quickViewContent.innerHTML = `
      <div class="qv-img">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" width="600" height="660" />
      </div>
      <div class="qv-copy">
        <p class="brand">${escapeHtml(p.brand)}</p>
        <h3 id="qvTitle">${escapeHtml(p.name)}</h3>
        <p class="qv-price">${formatMoney(p.price)}</p>
        <p style="color:#757575;font-size:0.9rem;margin:0 0 1rem">${escapeHtml(
          p.colors
        )} · ${genderLabel(p.gender)} · ${p.category.join(", ")}</p>
        <button type="button" class="btn btn-primary" style="border-radius:999px" id="qvAdd">ใส่ตะกร้า</button>
      </div>
    `;
    $("#qvAdd", els.quickViewContent).addEventListener("click", () => {
      addToCart(id);
      closeModal();
    });
    els.quickView.hidden = false;
    syncBodyScrollLock();
    els.quickView.querySelector(".modal__close")?.focus();
  }

  function closeModal() {
    els.quickView.hidden = true;
    els.quickViewContent.innerHTML = "";
    syncBodyScrollLock();
  }

  let toastTimer;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    requestAnimationFrame(() => els.toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("is-visible");
      setTimeout(() => {
        els.toast.hidden = true;
      }, 400);
    }, 2600);
  }

  function bindNavAnchors() {
    $$(".nav-list a[data-filter-gender]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const g = a.dataset.filterGender;
        const input = $(`input[name="gender"][value="${g}"]`);
        if (input) {
          input.checked = true;
          renderProducts();
        }
        els.mainNav.classList.remove("is-open");
        els.navToggle.setAttribute("aria-expanded", "false");
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
      });
    });
    $$(".link-arrow[data-filter-cat]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = a.dataset.filterCat;
        $$('input[name="category"]').forEach((c) => {
          c.checked = c.value === cat;
        });
        renderProducts();
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initFinder() {
    const range = els.finderBudget;
    const label = els.finderBudgetLabel;
    function syncLabel() {
      const v = parseInt(range.value, 10);
      label.textContent = `ไม่เกิน ${formatMoney(v)}`;
    }
    range.addEventListener("input", syncLabel);
    syncLabel();

    els.finderApply.addEventListener("click", () => {
      finderActivity = els.finderActivity.value || "";
      maxBudget = parseInt(range.value, 10);
      finderBudgetActive = true;
      renderProducts();
      document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
      showToast("อัปเดตรายการตามตัวช่วยหาแล้ว");
    });
  }

  /* Events */
  $$('input[name="gender"]').forEach((el) => el.addEventListener("change", renderProducts));
  $$('input[name="category"]').forEach((el) => el.addEventListener("change", renderProducts));
  els.sortSelect.addEventListener("change", renderProducts);

  els.searchToggle.addEventListener("click", () => {
    const open = !els.searchBar.hidden;
    els.searchBar.hidden = !open;
    if (!els.searchBar.hidden) els.searchInput.focus();
  });
  els.searchClose.addEventListener("click", () => {
    els.searchBar.hidden = true;
  });
  let searchDebounce;
  els.searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = els.searchInput.value.trim();
      renderProducts();
    }, 200);
  });

  els.resetFilters.addEventListener("click", () => {
    $('input[name="gender"][value=""]').checked = true;
    $$('input[name="category"]').forEach((c) => (c.checked = false));
    $$('input[name="brand"]').forEach((c) => (c.checked = false));
    selectedBrands.clear();
    searchQuery = "";
    els.searchInput.value = "";
    finderActivity = "";
    els.finderActivity.value = "";
    maxBudget = null;
    finderBudgetActive = false;
    els.finderBudget.value = "6000";
    els.finderBudgetLabel.textContent = `ไม่เกิน ${formatMoney(6000)}`;
    renderProducts();
    syncBrandPills();
  });

  els.navToggle.addEventListener("click", () => {
    const open = els.mainNav.classList.toggle("is-open");
    els.navToggle.setAttribute("aria-expanded", String(open));
  });

  els.cartToggle.addEventListener("click", openCart);
  els.cartClose.addEventListener("click", closeCart);
  els.drawerOverlay.addEventListener("click", closeCart);

  els.checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
      showToast("ยังไม่มีสินค้าในตะกร้า");
      return;
    }
    showToast("สาธิตการชำระเงิน — ขอบคุณที่ทดลองใช้ SOLE STUDIO");
    cart = [];
    saveCart();
    updateCartUi();
    closeCart();
  });

  els.openFilters.addEventListener("click", () => els.filters.classList.add("is-open"));
  els.filtersClose.addEventListener("click", () => els.filters.classList.remove("is-open"));

  els.quickView.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close-modal]");
    if (closer) {
      e.preventDefault();
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeCart();
      els.filters.classList.remove("is-open");
    }
  });

  /* Init */
  if (els.year) els.year.textContent = String(new Date().getFullYear());
  renderBrandFilters();
  renderBrandTrack();
  renderProducts();
  updateCartUi();
  bindNavAnchors();
  initFinder();
})();
