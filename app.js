// DESTINAVIA - Application Logic & Interaction Engine (app.js)

document.addEventListener("DOMContentLoaded", () => {
  // Global Image Fallback Handler for any network drops
  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      const img = e.target;
      if (!img.dataset.failed) {
        img.dataset.failed = "true";
        img.src = "Img/gallery_kashmir.jpg";
      }
    }
  }, true);

  // 1. INITIALIZE ICONS
  lucide.createIcons();

  // 2. STATE MANAGEMENT (Wishlist & Compare)
  let wishlist = JSON.parse(localStorage.getItem("destinavia_wishlist")) || [];
  let compareList = JSON.parse(localStorage.getItem("destinavia_compare")) || [];
  let activeWeatherIndex = 0;
  let currency = localStorage.getItem("destinavia_currency") || "INR";
  let language = localStorage.getItem("destinavia_language") || "EN";

  const currencyRates = { INR: 1, USD: 0.012, EUR: 0.011 };
  const currencySymbols = { INR: "₹", USD: "$", EUR: "€" };

  // 3. THEME MANAGEMENT (Dark / Light Mode)
  const initTheme = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  document.querySelectorAll("#theme-toggle, #theme-toggle-mobile").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });
  initTheme();

  // 4. LENIS SMOOTH SCROLL & GSAP REGISTER
  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      if (lenis && typeof lenis.raf === "function") {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== "undefined") {
      lenis.on('scroll', ScrollTrigger.update);
    }
  } else {
    // Graceful fallback if Lenis CDN is blocked, slow, or offline
    lenis = {
      raf: () => {},
      on: () => {},
      stop: () => {},
      start: () => {},
      scrollTo: (target, options = {}) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (typeof target === 'string') {
          const el = document.querySelector(target);
          if (el) {
            const offset = options.offset || 0;
            const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    };
  }

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 5. AMBIENT GLOW CANVAS (Lightweight canvas animation)
  const initAmbientCanvas = () => {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 200 + 200,
      color: Math.random() > 0.5 ? "rgba(96, 183, 57, 0.08)" : "rgba(126, 217, 87, 0.08)"
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  };
  initAmbientCanvas();

  // 6. DYNAMIC FORMATTERS
  const formatPrice = (priceINR) => {
    const rate = currencyRates[currency];
    const converted = Math.round(priceINR * rate);
    const symbol = currencySymbols[currency];
    return `${symbol}${converted.toLocaleString(language === "HI" ? "en-IN" : "en-US")}`;
  };

  // 7. RENDER FUNCTIONS

  // 7a. Destinations
  const renderDestinations = (category = "all") => {
    const grid = document.getElementById("destinations-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = DESTINAVIA_DATA.destinations.filter(d => 
      category === "all" || d.category === category
    );

    filtered.forEach(d => {
      const card = document.createElement("div");
      card.className = "dest-card glass-panel rounded-3xl overflow-hidden group cursor-pointer relative aspect-[4/5]";
      card.innerHTML = `
        <img src="${d.image}" alt="${d.name}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out select-none">
        <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-85 z-10"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 z-20 text-left flex flex-col justify-end h-full">
          <span class="text-brand-cyan text-[10px] uppercase font-bold tracking-wider mb-1">${d.tagline}</span>
          <h3 class="text-white text-2xl font-black mb-2">${d.name}</h3>
          <p class="text-slate-300 text-xs line-clamp-2 max-h-0 group-hover:max-h-12 group-hover:mb-3 transition-all duration-500 ease-in-out font-medium">${d.description}</p>
          <div class="flex justify-between items-center text-white text-xs pt-2 border-t border-white/10 mt-1">
            <span class="flex items-center gap-1"><i data-lucide="cloud-sun" class="w-3.5 h-3.5 text-brand-cyan"></i> ${d.weather}</span>
            <span class="bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-semibold">${d.packagesCount} Packages</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        filterByDestination(d.name);
        lenis.scrollTo("#packages", { offset: -80 });
      });
      grid.appendChild(card);
    });
    lucide.createIcons();
  };

  // 7b. Packages Grid
  const renderPackages = (catFilter = "all", searchQ = "", budgetVal = "") => {
    const grid = document.getElementById("packages-grid");
    const noMsg = document.getElementById("no-packages-message");
    if (!grid) return;
    grid.innerHTML = "";

    let filtered = DESTINAVIA_DATA.packages;

    // Category Filter
    if (catFilter !== "all") {
      filtered = filtered.filter(p => p.category === catFilter);
    }

    // Search Query Filter
    if (searchQ) {
      const q = searchQ.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.destination.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    // Budget Filter
    if (budgetVal) {
      if (budgetVal === "50000") {
        filtered = filtered.filter(p => p.priceINR <= 50000);
      } else if (budgetVal === "100000") {
        filtered = filtered.filter(p => p.priceINR > 50000 && p.priceINR <= 100000);
      } else if (budgetVal === "200000") {
        filtered = filtered.filter(p => p.priceINR > 100000 && p.priceINR <= 200000);
      } else if (budgetVal === "max") {
        filtered = filtered.filter(p => p.priceINR > 200000);
      }
    }

    if (filtered.length === 0) {
      noMsg.classList.remove("hidden");
    } else {
      noMsg.classList.add("hidden");
    }

    filtered.forEach(p => {
      const isWishlisted = wishlist.includes(p.id);
      const isCompared = compareList.includes(p.id);

      const card = document.createElement("article");
      card.className = "package-card glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group shadow-md hover:shadow-xl transition-all duration-300 relative bg-white dark:bg-brand-navy";
      card.innerHTML = `
        <div class="relative overflow-hidden aspect-[4/3]">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none">
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          ${p.badge ? `<span class="absolute top-4 left-4 bg-brand-blue text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">${p.badge}</span>` : ''}
          
          <!-- Hover controls for wishlist and compare -->
          <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="wishlist-btn p-2 bg-white/90 dark:bg-brand-navy/90 hover:bg-white text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:scale-110 transition-all" data-id="${p.id}" aria-label="Add to wishlist">
              <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}"></i>
            </button>
            <button class="compare-btn p-2 bg-white/90 dark:bg-brand-navy/90 hover:bg-white text-slate-700 dark:text-slate-200 rounded-full shadow-md hover:scale-110 transition-all" data-id="${p.id}" aria-label="Add to comparison">
              <i data-lucide="git-compare" class="w-4 h-4 ${isCompared ? 'text-brand-cyan font-bold' : ''}"></i>
            </button>
          </div>
        </div>

        <div class="p-6 text-left flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center text-xs text-slate-400 font-bold mb-2">
              <span class="uppercase tracking-wider text-brand-blue dark:text-brand-cyan">${p.category}</span>
              <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-brand-blue"></i> ${p.durationDays}D / ${p.durationNights}N</span>
            </div>
            <h3 class="text-lg font-bold mb-3 text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">${p.title}</h3>
            
            <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4">
              <div class="flex text-brand-gold">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-brand-gold text-brand-gold"></i>
              </div>
              <span class="text-slate-800 dark:text-slate-200">${p.rating}</span>
              <span>(${p.reviewsCount} reviews)</span>
            </div>
          </div>

          <div class="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto flex justify-between items-center">
            <div>
              <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</p>
              <p class="text-xl font-black text-brand-blue dark:text-brand-cyan">${formatPrice(p.priceINR)}</p>
            </div>
            <div class="flex gap-1.5">
              <button class="view-details-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors" data-id="${p.id}">
                Details
              </button>
              <button class="book-package-btn bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all" data-id="${p.id}">
                Book
              </button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    lucide.createIcons();
    bindCardEvents();
  };

  // 7c. Testimonials
  const renderTestimonials = () => {
    // Bind play review events to static HTML elements
    document.querySelectorAll(".play-video-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = btn.dataset.video;
        const title = btn.dataset.title;
        openLightboxVideo(url, title);
      });
    });

    // Re-init Swiper on static HTML elements
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  };

  // 7d. Photo Gallery Masonry
  const renderGallery = () => {
    // Bind click events to static gallery items
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img").src;
        const title = item.querySelector("h4").innerText;
        const desc = item.querySelector("p").innerText;
        openLightboxImage(img, title, desc);
      });
    });
  };

  // 7e. Blogs
  const renderBlogs = () => {
    // Static HTML is used, just run Lucide update
    lucide.createIcons();
  };

  // 7f. FAQs Accordion
  const renderFAQs = () => {
    // Accordion interaction on static HTML elements
    document.querySelectorAll(".faq-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const content = btn.nextElementSibling;
        
        // Collapse other FAQ items
        document.querySelectorAll(".faq-trigger").forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute("aria-expanded", "false");
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
        });

        if (expanded) {
          btn.setAttribute("aria-expanded", "false");
          content.style.maxHeight = null;
        } else {
          btn.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  };

  // 8. WIDGET LOGIC & UPDATERS

  // 8a. Live Active Visitor Counter
  const updateVisitorCounter = () => {
    const el = document.getElementById("visitor-counter");
    if (!el) return;
    setInterval(() => {
      const current = parseInt(el.innerText);
      const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
      const nextVal = Math.max(88, Math.min(198, current + delta));
      el.innerText = nextVal;
    }, 4000);
  };
  updateVisitorCounter();

  // 8b. Weather Widget
  const updateWeatherWidget = () => {
    const destName = document.getElementById("weather-dest-name");
    const destTemp = document.getElementById("weather-dest-temp");
    if (!destName || !destTemp) return;

    const data = DESTINAVIA_DATA.destinations;
    const item = data[activeWeatherIndex];
    destName.innerText = item.name;
    destTemp.innerText = item.weather;

    activeWeatherIndex = (activeWeatherIndex + 1) % data.length;
  };
  
  const weatherNextBtn = document.getElementById("weather-next-btn");
  if (weatherNextBtn) {
    weatherNextBtn.addEventListener("click", updateWeatherWidget);
  }
  setInterval(updateWeatherWidget, 8000);

  // 8c. Sticky Navigation Bar & Bottom Sticky Drawer Visibility
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    const stickyBar = document.getElementById("sticky-booking-bar");
    const backToTop = document.getElementById("back-to-top");
    
    if (window.scrollY > 80) {
      header.classList.add("shadow-lg", "py-2");
      header.classList.remove("py-4");
    } else {
      header.classList.remove("shadow-lg", "py-2");
      header.classList.add("py-4");
    }

    if (window.scrollY > 500) {
      stickyBar.classList.remove("translate-y-full");
      backToTop.classList.remove("hidden", "opacity-0");
      backToTop.classList.add("opacity-100");
    } else {
      stickyBar.classList.add("translate-y-full");
      backToTop.classList.add("opacity-0");
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      lenis.scrollTo(0);
    });
  }

  // 8d. Announcement Bar rotation
  const announcements = [
    "Book any Europe honeymoon package and get free Visa processing worth ₹15,000!",
    "Industrial Visits 2026 booking open - Special 18% GST invoice saving active.",
    "Bespoke Corporate MICE team building retreat discounts for booking in August!",
    "Secure your spot to Kashmir & Gulmarg: Free private helicopter transfers included."
  ];
  let activeAnnIndex = 0;
  const rotateAnnouncements = () => {
    const textEl = document.getElementById("announcement-text");
    if (!textEl) return;
    textEl.style.opacity = "0";
    setTimeout(() => {
      activeAnnIndex = (activeAnnIndex + 1) % announcements.length;
      textEl.innerText = announcements[activeAnnIndex];
      textEl.style.opacity = "1";
    }, 300);
  };
  setInterval(rotateAnnouncements, 7000);

  // 9. OVERLAY MODALS AND STATE LOGIC

  // 9a. Lightbox
  const openLightboxImage = (src, title, desc) => {
    const box = document.getElementById("lightbox-modal");
    const img = document.getElementById("lightbox-img");
    const video = document.getElementById("lightbox-video");
    const titleEl = document.getElementById("lightbox-title");
    const descEl = document.getElementById("lightbox-desc");

    img.src = src;
    img.classList.remove("hidden");
    video.classList.add("hidden");
    video.pause();

    titleEl.innerText = title;
    descEl.innerText = desc;
    box.classList.remove("hidden");
    box.classList.add("flex");
    lenis.stop();
  };

  const openLightboxVideo = (src, title) => {
    const box = document.getElementById("lightbox-modal");
    const img = document.getElementById("lightbox-img");
    const video = document.getElementById("lightbox-video");
    const titleEl = document.getElementById("lightbox-title");
    const descEl = document.getElementById("lightbox-desc");

    video.src = src;
    video.classList.remove("hidden");
    img.classList.add("hidden");

    titleEl.innerText = title;
    descEl.innerText = "Video Testimonial";
    box.classList.remove("hidden");
    box.classList.add("flex");
    video.play();
    lenis.stop();
  };

  document.getElementById("lightbox-close").addEventListener("click", () => {
    const box = document.getElementById("lightbox-modal");
    const video = document.getElementById("lightbox-video");
    box.classList.add("hidden");
    box.classList.remove("flex");
    video.pause();
    video.src = "";
    lenis.start();
  });

  // 9b. Package Details Modal
  const openPackageDetails = (pkgId) => {
    const pkg = DESTINAVIA_DATA.packages.find(p => p.id === pkgId);
    if (!pkg) return;

    document.getElementById("modal-pkg-image").src = pkg.image;
    document.getElementById("modal-pkg-badge").innerText = pkg.badge || "Premium Package";
    document.getElementById("modal-pkg-category").innerText = pkg.category;
    document.getElementById("modal-pkg-title").innerText = pkg.title;
    document.getElementById("modal-pkg-duration").innerText = `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
    document.getElementById("modal-pkg-rating").innerText = `${pkg.rating} Rating`;
    document.getElementById("modal-pkg-price").innerText = formatPrice(pkg.priceINR);

    const highlightsList = document.getElementById("modal-pkg-highlights");
    highlightsList.innerHTML = pkg.highlights.map(h => `<li>${h}</li>`).join("");

    const inclusionsContainer = document.getElementById("modal-pkg-inclusions");
    inclusionsContainer.innerHTML = pkg.inclusions.map(inc => `
      <span class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1">
        <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue"></i> ${inc}
      </span>
    `).join("");

    lucide.createIcons();

    // Bind inquiry button
    document.getElementById("modal-book-now").onclick = () => {
      document.getElementById("form-dest").value = pkg.destination;
      document.getElementById("form-notes").value = `Interested in booking the "${pkg.title}" package. Price converted currently to: ${formatPrice(pkg.priceINR)}.`;
      document.getElementById("details-modal").classList.add("hidden");
      lenis.start();
      lenis.scrollTo("#contact", { offset: -80 });
    };

    document.getElementById("details-modal").classList.remove("hidden");
    lenis.stop();
  };

  document.getElementById("details-close").addEventListener("click", () => {
    document.getElementById("details-modal").classList.add("hidden");
    lenis.start();
  });

  // 9c. Wishlist Logic
  const updateWishlistUI = () => {
    document.getElementById("wishlist-count").innerText = wishlist.length;
    const mobCount = document.getElementById("wishlist-count-mobile");
    if (mobCount) mobCount.innerText = wishlist.length;

    const container = document.getElementById("wishlist-items-container");
    const emptyMsg = document.getElementById("wishlist-empty-msg");
    if (!container) return;
    container.innerHTML = "";

    if (wishlist.length === 0) {
      emptyMsg.classList.remove("hidden");
    } else {
      emptyMsg.classList.add("hidden");
      wishlist.forEach(id => {
        const pkg = DESTINAVIA_DATA.packages.find(p => p.id === id);
        if (!pkg) return;
        const div = document.createElement("div");
        div.className = "flex gap-4 items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3";
        div.innerHTML = `
          <div class="flex gap-3 items-center">
            <img src="${pkg.image}" alt="${pkg.title}" class="w-12 h-12 object-cover rounded-xl shrink-0">
            <div class="text-left">
              <h4 class="font-bold text-xs line-clamp-1 text-slate-800 dark:text-slate-200">${pkg.title}</h4>
              <p class="text-[10px] text-slate-400 font-semibold uppercase">${pkg.category} • ${formatPrice(pkg.priceINR)}</p>
            </div>
          </div>
          <button class="remove-wishlist-item p-1.5 hover:text-red-500" data-id="${pkg.id}" aria-label="Remove item">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        `;
        container.appendChild(div);
      });

      // Bind remove buttons
      container.querySelectorAll(".remove-wishlist-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          wishlist = wishlist.filter(x => x !== id);
          localStorage.setItem("destinavia_wishlist", JSON.stringify(wishlist));
          updateWishlistUI();
          renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
        });
      });
      lucide.createIcons();
    }
  };

  const toggleWishlist = (pkgId) => {
    if (wishlist.includes(pkgId)) {
      wishlist = wishlist.filter(x => x !== pkgId);
    } else {
      wishlist.push(pkgId);
    }
    localStorage.setItem("destinavia_wishlist", JSON.stringify(wishlist));
    updateWishlistUI();
    renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
  };

  document.querySelectorAll("#wishlist-trigger, #wishlist-trigger-mobile").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("wishlist-drawer").classList.remove("hidden");
      document.getElementById("wishlist-drawer").classList.add("flex");
      lenis.stop();
    });
  });

  document.getElementById("wishlist-close").addEventListener("click", () => {
    document.getElementById("wishlist-drawer").classList.add("hidden");
    document.getElementById("wishlist-drawer").classList.remove("flex");
    lenis.start();
  });

  document.getElementById("wishlist-inquire-all").addEventListener("click", () => {
    if (wishlist.length === 0) return;
    const names = wishlist.map(id => DESTINAVIA_DATA.packages.find(p => p.id === id)?.title).filter(Boolean);
    document.getElementById("form-notes").value = `I am interested in organizing a customized quote request for these packages in my wishlist:\n- ${names.join("\n- ")}`;
    document.getElementById("wishlist-drawer").classList.add("hidden");
    lenis.start();
    lenis.scrollTo("#contact", { offset: -80 });
  });

  // 9d. Comparison Logic
  const updateCompareUI = () => {
    document.getElementById("compare-count").innerText = compareList.length;
    const container = document.getElementById("compare-items-container");
    const emptyMsg = document.getElementById("compare-empty-msg");
    if (!container) return;
    container.innerHTML = "";

    if (compareList.length === 0) {
      emptyMsg.classList.remove("hidden");
    } else {
      emptyMsg.classList.add("hidden");
      compareList.forEach(id => {
        const pkg = DESTINAVIA_DATA.packages.find(p => p.id === id);
        if (!pkg) return;
        const div = document.createElement("div");
        div.className = "border border-slate-200 dark:border-slate-800 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900";
        div.innerHTML = `
          <div class="flex justify-between items-center mb-3">
            <span class="text-[10px] font-bold text-brand-blue uppercase">${pkg.category}</span>
            <button class="remove-compare-item text-slate-400 hover:text-red-500" data-id="${pkg.id}">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
          <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 mb-2">${pkg.title}</h4>
          <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-2">
            <span>Duration: <strong>${pkg.durationDays}D/${pkg.durationNights}N</strong></span>
            <span>Price: <strong class="text-brand-blue">${formatPrice(pkg.priceINR)}</strong></span>
            <span>Rating: <strong>${pkg.rating}★</strong></span>
            <span>Category: <strong>${pkg.category}</strong></span>
          </div>
          <div class="text-[10px] text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 pt-2 line-clamp-1">
            Inclusions: ${pkg.inclusions.join(", ")}
          </div>
        `;
        container.appendChild(div);
      });

      container.querySelectorAll(".remove-compare-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          compareList = compareList.filter(x => x !== id);
          localStorage.setItem("destinavia_compare", JSON.stringify(compareList));
          updateCompareUI();
          renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
        });
      });
      lucide.createIcons();
    }
  };

  const toggleCompare = (pkgId) => {
    if (compareList.includes(pkgId)) {
      compareList = compareList.filter(x => x !== pkgId);
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 packages at once.");
        return;
      }
      compareList.push(pkgId);
    }
    localStorage.setItem("destinavia_compare", JSON.stringify(compareList));
    updateCompareUI();
    renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
  };

  document.getElementById("compare-trigger").addEventListener("click", () => {
    document.getElementById("compare-drawer").classList.remove("hidden");
    document.getElementById("compare-drawer").classList.add("flex");
    lenis.stop();
  });

  document.getElementById("compare-close").addEventListener("click", () => {
    document.getElementById("compare-drawer").classList.add("hidden");
    document.getElementById("compare-drawer").classList.remove("flex");
    lenis.start();
  });

  document.getElementById("compare-clear-all").addEventListener("click", () => {
    compareList = [];
    localStorage.setItem("destinavia_compare", JSON.stringify(compareList));
    updateCompareUI();
    renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
  });

  document.getElementById("compare-inquire-btn").addEventListener("click", () => {
    if (compareList.length === 0) return;
    const names = compareList.map(id => DESTINAVIA_DATA.packages.find(p => p.id === id)?.title).filter(Boolean);
    document.getElementById("form-notes").value = `I would like to compare and obtain pricing breakdowns for these options:\n- ${names.join("\n- ")}`;
    document.getElementById("compare-drawer").classList.add("hidden");
    lenis.start();
    lenis.scrollTo("#contact", { offset: -80 });
  });

  // Bind dynamic card controls (view details, booking, wishlist togglers)
  function bindCardEvents() {
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.onclick = () => openPackageDetails(btn.dataset.id);
    });

    document.querySelectorAll(".book-package-btn").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const pkg = DESTINAVIA_DATA.packages.find(p => p.id === id);
        if (!pkg) return;
        document.getElementById("form-dest").value = pkg.destination;
        document.getElementById("form-notes").value = `Direct inquiry for booking "${pkg.title}" starting at ${formatPrice(pkg.priceINR)}.`;
        lenis.scrollTo("#contact", { offset: -80 });
      };
    });

    document.querySelectorAll(".wishlist-btn").forEach(btn => {
      btn.onclick = () => toggleWishlist(btn.dataset.id);
    });

    document.querySelectorAll(".compare-btn").forEach(btn => {
      btn.onclick = () => toggleCompare(btn.dataset.id);
    });
  }

  // 10. CURRENCY & LANGUAGE SELECTORS
  const bindSelectors = () => {
    const curSelectors = document.querySelectorAll("#currency-selector, #currency-selector-mobile");
    curSelectors.forEach(sel => {
      sel.value = currency;
      sel.addEventListener("change", (e) => {
        currency = e.target.value;
        localStorage.setItem("destinavia_currency", currency);
        curSelectors.forEach(s => s.value = currency); // Sync values
        renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
        updateWishlistUI();
        updateCompareUI();
      });
    });

    const langSelectors = document.querySelectorAll("#language-selector, #language-selector-mobile");
    langSelectors.forEach(sel => {
      sel.value = language;
      sel.addEventListener("change", (e) => {
        language = e.target.value;
        localStorage.setItem("destinavia_language", language);
        langSelectors.forEach(s => s.value = language); // Sync values
        alert(`Language changed to: ${language}. Dynamic translation assets loading in mockup mode.`);
      });
    });
  };

  // 11. SEARCH AND FILTER STATE & SUBMITS
  let activeCategoryFilter = "all";
  let activeSearchQuery = "";
  let activeBudgetFilter = "";

  const packageFilterButtons = document.querySelectorAll(".pkg-filter-btn");
  packageFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      packageFilterButtons.forEach(b => b.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-blue transition-all");
      btn.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-brand-blue text-white transition-all";
      activeCategoryFilter = btn.dataset.category;
      renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
    });
  });

  // Global triggers
  window.filterBySector = (sector) => {
    activeCategoryFilter = sector;
    packageFilterButtons.forEach(btn => {
      if (btn.dataset.category === sector) {
        btn.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-brand-blue text-white transition-all";
      } else {
        btn.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-blue transition-all";
      }
    });
    renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
    lenis.scrollTo("#packages", { offset: -80 });
  };

  window.filterByDestination = (destName) => {
    activeSearchQuery = destName;
    document.getElementById("search-dest").value = destName;
    renderPackages("all", activeSearchQuery, activeBudgetFilter);
  };

  // Submit main hero search
  document.getElementById("search-submit-btn").addEventListener("click", () => {
    const destInput = document.getElementById("search-dest");
    activeSearchQuery = destInput ? destInput.value : "";
    activeBudgetFilter = "";
    activeCategoryFilter = "all";

    // Update package filter buttons UI to select 'All Packages'
    packageFilterButtons.forEach(btn => {
      if (btn.dataset.category === "all") {
        btn.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-brand-blue text-white transition-all";
      } else {
        btn.className = "pkg-filter-btn px-5 py-2 rounded-full text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-blue transition-all";
      }
    });

    renderPackages(activeCategoryFilter, activeSearchQuery, activeBudgetFilter);
    lenis.scrollTo("#packages", { offset: -80 });
  });

  // Destination Categories Tabs (All / Domestic / International)
  const destTabs = document.querySelectorAll(".dest-tab-btn");
  destTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      destTabs.forEach(b => b.className = "dest-tab-btn px-6 py-2 rounded-full text-sm font-semibold transition-all text-slate-600 dark:text-slate-300");
      btn.className = "dest-tab-btn px-6 py-2 rounded-full text-sm font-semibold transition-all bg-brand-blue text-white";
      
      const filterVal = btn.id === "dest-tab-domestic" ? "domestic" : (btn.id === "dest-tab-international" ? "international" : "all");
      renderDestinations(filterVal);
    });
  });

  // 12. AI PACKAGE FINDER TERMINAL
  const handleAIFinder = (promptText) => {
    const outContainer = document.getElementById("ai-output-container");
    const responseText = document.getElementById("ai-response-text");
    const responseResults = document.getElementById("ai-response-results");

    outContainer.classList.remove("hidden");
    responseText.innerText = "Analyzing query constraints and matching parameters...";
    responseResults.innerHTML = "";

    // Parse queries roughly for budget, category, or duration
    const q = promptText.toLowerCase();
    let matched = DESTINAVIA_DATA.packages;

    // Detect budget
    if (q.includes("70,000") || q.includes("70000") || q.includes("under 70k")) {
      matched = matched.filter(p => p.priceINR <= 70000);
    } else if (q.includes("50,000") || q.includes("50000") || q.includes("under 50k")) {
      matched = matched.filter(p => p.priceINR <= 50000);
    } else if (q.includes("1,00,000") || q.includes("100000") || q.includes("under 100k") || q.includes("1 lakh")) {
      matched = matched.filter(p => p.priceINR <= 100000);
    } else if (q.includes("2,00,000") || q.includes("200000") || q.includes("2 lakhs")) {
      matched = matched.filter(p => p.priceINR <= 200000);
    }

    // Detect Categories
    if (q.includes("honeymoon") || q.includes("romantic") || q.includes("couple")) {
      matched = matched.filter(p => p.category === "Honeymoon");
    } else if (q.includes("industrial") || q.includes("students") || q.includes("college") || q.includes("education")) {
      matched = matched.filter(p => p.category === "Industrial Visits");
    } else if (q.includes("corporate") || q.includes("retreat") || q.includes("team")) {
      matched = matched.filter(p => p.category === "Corporate");
    } else if (q.includes("adventure") || q.includes("trek") || q.includes("ski")) {
      matched = matched.filter(p => p.category === "Adventure");
    } else if (q.includes("family")) {
      matched = matched.filter(p => p.category === "Family");
    }

    // Dynamic typewriting simulation
    let currentLetters = 0;
    const finalMsg = matched.length > 0 
      ? `Query Successful. Found ${matched.length} luxury tour matches matching your parameters. Standardizing luxury transfers, inclusions, and local DMCs.`
      : `No direct match. Recommending alternative luxury retreats suitable for premium leisure and group configurations.`;
    
    responseText.innerText = "";
    const timer = setInterval(() => {
      if (currentLetters < finalMsg.length) {
        responseText.innerText += finalMsg[currentLetters];
        currentLetters++;
      } else {
        clearInterval(timer);
        // Show matching items
        matched.forEach(p => {
          const div = document.createElement("div");
          div.className = "bg-slate-950 p-4 rounded-2xl border border-slate-800 flex gap-3 text-left relative";
          div.innerHTML = `
            <img src="${p.image}" alt="${p.title}" class="w-16 h-16 object-cover rounded-xl shrink-0">
            <div>
              <h4 class="font-bold text-xs text-white line-clamp-1">${p.title}</h4>
              <p class="text-[10px] text-brand-cyan font-bold uppercase mt-1">${p.category} • ${p.durationDays}D/${p.durationNights}N</p>
              <p class="text-sm font-black text-white mt-1">${formatPrice(p.priceINR)}</p>
              <button class="ai-book-match text-[10px] text-brand-blue hover:text-white font-bold underline mt-2" data-id="${p.id}">Inquire Package</button>
            </div>
          `;
          responseResults.appendChild(div);
        });

        // Event handler inside AI finder
        responseResults.querySelectorAll(".ai-book-match").forEach(btn => {
          btn.addEventListener("click", () => {
            const pkg = matched.find(x => x.id === btn.dataset.id);
            if (pkg) {
              document.getElementById("form-dest").value = pkg.destination;
              document.getElementById("form-notes").value = `AI finder matched interest in "${pkg.title}". Pricing details converting under currency rates.`;
              lenis.scrollTo("#contact", { offset: -80 });
            }
          });
        });

        // Trigger Confetti!
        if (matched.length > 0) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#7ED957', '#60B739', '#050811', '#FFFFFF']
          });
        }
      }
    }, 15);
  };

  const aiForm = document.getElementById("ai-finder-form");
  if (aiForm) {
    aiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const promptText = document.getElementById("ai-input").value;
      handleAIFinder(promptText);
    });
  }

  document.querySelectorAll(".ai-prompt-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const text = chip.innerText.replace(/"/g, "");
      document.getElementById("ai-input").value = text;
      handleAIFinder(text);
    });
  });

  // 13. AI CHATBOT WIDGET LOGIC
  const chatTrigger = document.getElementById("ai-chat-trigger");
  const chatPanel = document.getElementById("ai-chat-panel");
  const chatClose = document.getElementById("ai-chat-close");
  const chatForm = document.getElementById("ai-chat-form");
  const chatMessages = document.getElementById("ai-chat-messages");

  if (chatTrigger) {
    chatTrigger.addEventListener("click", () => {
      chatPanel.classList.toggle("hidden");
      // Remove unread dot notification
      const dot = chatTrigger.querySelector("span");
      if (dot) dot.remove();
    });
  }

  if (chatClose) {
    chatClose.addEventListener("click", () => {
      chatPanel.classList.add("hidden");
    });
  }

  const addChatMessage = (text, isBot = false) => {
    const div = document.createElement("div");
    div.className = `flex gap-2 ${isBot ? '' : 'justify-end'}`;
    
    const botIcon = isBot ? `
      <div class="w-7 h-7 rounded-lg bg-brand-cyan flex items-center justify-center shrink-0">
        <i data-lucide="bot" class="w-4 h-4 text-slate-950"></i>
      </div>
    ` : '';

    div.innerHTML = `
      ${botIcon}
      <div class="${isBot ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200' : 'bg-brand-blue text-white'} px-3.5 py-2.5 rounded-2xl max-w-[80%] text-left">
        ${text}
      </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    lucide.createIcons();
  };

  const handleBotResponse = (userMsg) => {
    const q = userMsg.toLowerCase();
    let reply = "I'm processing your inquiry. Our premium concierge is available. What destination or package can I help you find?";

    if (q.includes("honeymoon") || q.includes("couple")) {
      reply = `We highly recommend our <strong>Bali Honeymoon Bliss</strong> package starting from ${formatPrice(82000)} (7 days of private pool villas, couples massage, beach cave dinner) or <strong>Royal Kashmir</strong> houseboat experience for ${formatPrice(68000)}. Let me know which one you prefer!`;
    } else if (q.includes("industrial") || q.includes("student") || q.includes("college")) {
      reply = `We are IATA and GST certified travel planners. Our top educational tour is the <strong>Tech & Aero Bangalore Visit</strong> for groups up to 120 students. Package details include aerospace visits, factory permits, quad hotel bookings, and safety officers. Pricing starting from ${formatPrice(12500)} per student.`;
    } else if (q.includes("corporate") || q.includes("retreat") || q.includes("mice")) {
      reply = `For corporate summits, we offer the <strong>Goa Retreat</strong> package including 5-star beach stays, executive meeting spaces, yacht charters, and fully audited tax invoicing under GST guidelines starting from ${formatPrice(35000)} per executive.`;
    } else if (q.includes("dubai")) {
      reply = `We feature a beautiful 6-day <strong>Dubai Dune Adventure</strong> package from ${formatPrice(75000)} including 124th floor Burj Khalifa entry, waterpark permissions, and premium dune safaris.`;
    } else if (q.includes("price") || q.includes("cost") || q.includes("budget")) {
      reply = "Our domestic packages start from ₹35,000 to ₹68,000, while international packages range from ₹75,000 to ₹1,85,000 including first-class inclusions. Let me know your target budget limit!";
    }

    setTimeout(() => {
      addChatMessage(reply, true);
    }, 800);
  };

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("ai-chat-input");
      const text = input.value.trim();
      if (!text) return;
      
      addChatMessage(text, false);
      input.value = "";
      handleBotResponse(text);
    });
  }

  document.querySelectorAll(".chat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const text = chip.innerText;
      addChatMessage(text, false);
      handleBotResponse(text);
    });
  });

  // Sticky callback forms
  document.getElementById("sticky-inquire-btn").addEventListener("click", () => {
    document.getElementById("form-notes").value = "Callback request submitted via persistent bottom action drawer.";
    lenis.scrollTo("#contact", { offset: -80 });
  });

  // Mobile navigation toggles
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }
  
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
    });
  });

  // Inquiry form submit handling
  const inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7ED957', '#60B739', '#050811', '#FFFFFF']
      });
      alert("Inquiry successfully submitted! Our premium travel concierge will contact you within 45 minutes with a custom proposal.");
      inquiryForm.reset();
    });
  }

  // Newsletter form
  const newsForm = document.getElementById("newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Welcome to Destinavia's Signature list! Check your inbox shortly for exclusive flight deals.");
      newsForm.reset();
    });
  }

  // Brochure download
  const brochureBtn = document.getElementById("brochure-download-btn");
  if (brochureBtn) {
    brochureBtn.addEventListener("click", () => {
      confetti({
        particleCount: 50,
        spread: 40,
        colors: ['#7ED957']
      });
      alert("Downloading Destinavia Company Brochure PDF. Document includes sample itineraries, operations checklists, and tax claim guides.");
    });
  }

  // 14. GSAP TIMELINES & VIEWPORT ANIMS
  const initGSAPAnimations = () => {
    // Hero entry timelines
    const tl = gsap.timeline();
    tl.from(".gsap-hero-fade", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" })
      .from(".gsap-hero-title", { opacity: 0, y: 30, duration: 1, ease: "power4.out" }, "-=0.6")
      .from(".gsap-hero-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".gsap-hero-search", { opacity: 0, scale: 0.9, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.6")
      .from(".gsap-hero-badges div", { opacity: 0, y: 15, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.5");

    // Dynamic stats counting triggers
    ScrollTrigger.create({
      trigger: "#about",
      start: "top 80%",
      onEnter: () => {
        // Travelers count
        const travelersEl = document.getElementById("stat-travelers");
        const val1 = parseInt(travelersEl.dataset.target);
        gsap.to(travelersEl, {
          innerText: val1,
          duration: 2.5,
          snap: { innerText: 1 },
          onUpdate: function() {
            travelersEl.innerText = Math.floor(this.targets()[0].innerText).toLocaleString() + "+";
          }
        });

        // Destinations count
        const destsEl = document.getElementById("stat-destinations");
        const val2 = parseInt(destsEl.dataset.target);
        gsap.to(destsEl, {
          innerText: val2,
          duration: 2,
          snap: { innerText: 1 },
          onUpdate: function() {
            destsEl.innerText = Math.floor(this.targets()[0].innerText).toLocaleString() + "+";
          }
        });
      }
    });

    // Reveal panels on scroll
    gsap.from(".glass-panel-hover", {
      scrollTrigger: {
        trigger: "#sectors",
        start: "top 85%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  };

  // 15. INITIALIZE ALL ENGINE RENDERS
  renderDestinations("all");
  renderPackages("all", "", "");
  renderTestimonials();
  renderGallery();
  renderBlogs();
  renderFAQs();
  updateWishlistUI();
  updateCompareUI();
  bindSelectors();

  // Run animations last after elements are painted
  setTimeout(initGSAPAnimations, 100);
});
