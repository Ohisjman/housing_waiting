/* Script block 1 */
document.addEventListener("DOMContentLoaded", function () {
  const side = document.querySelector(".housing-side");
  if (!side) return;
  const fixedHeight = side.offsetHeight;
  side.style.height = fixedHeight + "px";
});

/* Script block 2 */
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const block = entry.target;
        if (entry.isIntersecting) {
          block.querySelectorAll(".step-reveal").forEach((el, index) => {
            setTimeout(() => el.classList.add("is-visible"), index * 200);
          });
          block
            .querySelectorAll(".countup")
            .forEach((el) => animateCount(el, el.dataset.target));
          block
            .querySelectorAll(".countup-split")
            .forEach((el) => animateSplitCount(el, el.dataset.target));
        } else {
          block
            .querySelectorAll(".step-reveal")
            .forEach((el) => el.classList.remove("is-visible"));
        }
      });
    },
    { threshold: 0.22 },
  );

  document.querySelectorAll(".chart-block").forEach((block) => {
    if (
      block.querySelector(".step-reveal") ||
      block.querySelector(".countup") ||
      block.querySelector(".countup-split")
    ) {
      observer.observe(block);
    }
  });

  function animateCount(el, targetText) {
    const match = targetText.match(/^(.*?)([\d,]+(?:\.\d+)?)([^\d]*)$/);
    if (!match) return;
    const prefix = match[1] || "";
    const numStr = match[2].replace(/,/g, "");
    const suffix = match[3] || "";
    const target = parseFloat(numStr);
    const decimals = (numStr.split(".")[1] || "").length;
    const duration = 2500;
    const start = performance.now();
    const formatter = (value) => {
      if (decimals > 0) return value.toFixed(decimals);
      return Math.round(value).toLocaleString("en-US");
    };
    el.textContent =
      prefix + (decimals > 0 ? (0).toFixed(decimals) : "0") + suffix;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const value = target * eased;
      el.textContent = prefix + formatter(value) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = targetText;
    };
    requestAnimationFrame(step);
  }

  function animateSplitCount(el, targetText) {
    const clean = targetText.replace(/,/g, "");
    const target = parseFloat(clean);
    const decimals = (clean.split(".")[1] || "").length;
    const duration = 2500;
    const start = performance.now();
    const textNode = Array.from(el.childNodes).find(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== "",
    );
    if (!textNode) return;
    textNode.textContent = decimals > 0 ? (0).toFixed(decimals) : "0";
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const value = target * eased;
      textNode.textContent =
        decimals > 0
          ? value.toFixed(decimals)
          : Math.round(value).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(step);
      else textNode.textContent = targetText;
    };
    requestAnimationFrame(step);
  }

  document.querySelectorAll(".oldfig2-toggle").forEach((group) => {
    const fig = group.closest(".chart-block");
    const beforeCards = fig.querySelectorAll(".before-card");
    const afterCards = fig.querySelectorAll(".after-card");
    const buttons = group.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.viewMode;
        beforeCards.forEach((el) =>
          el.classList.toggle("hidden-mode", mode === "after"),
        );
        afterCards.forEach((el) =>
          el.classList.toggle("hidden-mode", mode === "before"),
        );
      });
    });
  });

  document.querySelectorAll(".newfig3-toggle").forEach((group) => {
    const fig = group.closest(".chart-block");
    const policy = fig.querySelector(".policy-view");
    const family = fig.querySelector(".family-view");
    const buttons = group.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.compareMode;
        policy?.classList.toggle("hidden-mode", mode === "family");
        family?.classList.toggle("hidden-mode", mode === "policy");
      });
    });
  });

  const themed = document.querySelectorAll("[data-theme]");
  themed.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      const theme = node.dataset.theme;
      themed.forEach((el) => {
        const themes = (el.dataset.theme || "").split(/\s+/);
        if (themes.includes(theme)) el.classList.add("theme-highlight");
      });
    });
    node.addEventListener("mouseleave", () => {
      document
        .querySelectorAll(".theme-highlight")
        .forEach((el) => el.classList.remove("theme-highlight"));
    });
  });
});

/* Script block 3 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".radial-summary").forEach((summary) => {
    const center = summary.querySelector(".radial-center");
    if (!center) return;
    const triggerSpin = () => {
      summary.classList.remove("is-shaking");
      void summary.offsetWidth;
      summary.classList.add("is-shaking");
      clearTimeout(summary._shakeTimer);
      summary._shakeTimer = setTimeout(() => {
        summary.classList.remove("is-shaking");
      }, 900);
    };
    center.addEventListener("click", triggerSpin);
    center.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerSpin();
      }
    });
  });
});

/* Script block 4 */
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.querySelector(".back-to-top");
  if (!backToTop) return;
  const toggleButton = () => {
    if (window.scrollY > 360) backToTop.classList.add("is-visible");
    else backToTop.classList.remove("is-visible");
  };
  window.addEventListener("scroll", toggleButton, { passive: true });
  toggleButton();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* Script block 5 */
document.addEventListener("DOMContentLoaded", () => {
  const audioSources = [
    "audio/interviewee1.mp3",
    "audio/interviewee2.mp3",
    "audio/interviewee3.mp3",
  ];
  const quoteBlocks = document.querySelectorAll("blockquote");
  let currentAudio = null;
  let currentButton = null;

  quoteBlocks.forEach((quote, index) => {
    if (index >= audioSources.length) return;

    const quoteText = quote.textContent.trim();
    quote.textContent = "";
    const textSpan = document.createElement("span");
    textSpan.className = "quote-text";
    textSpan.textContent = quoteText;
    quote.appendChild(textSpan);

    const btn = document.createElement("button");
    btn.className = "quote-play";
    btn.type = "button";
    btn.textContent = "▶ 播放";
    btn.setAttribute("aria-label", "播放引句錄音");

    btn.addEventListener("click", () => {
      if (currentAudio && currentButton === btn) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        btn.textContent = "▶ 播放";
        currentAudio = null;
        currentButton = null;
        return;
      }

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentButton) currentButton.textContent = "▶ 播放";
      }

      const audio = new Audio(audioSources[index]);
      currentAudio = audio;
      currentButton = btn;
      btn.textContent = "■ 停止";

      audio.play();

      audio.addEventListener("ended", () => {
        btn.textContent = "▶ 播放";
        if (currentAudio === audio) {
          currentAudio = null;
          currentButton = null;
        }
      });
    });

    quote.appendChild(btn);
  });
});

/* Script block 6 */
document.addEventListener("DOMContentLoaded", () => {
  const clickableCards = document.querySelectorAll(
    ".stat-card, .bar-row, .mini-card, .family-card, .housing-card, .housing-main, .flow-card, .timeline-box, .case-card-visual, .radial-item, .dual-point, .flow-step, .timeline-node, .impact-step, .planning-step, .summary-pill, .metric-card, .dual-label, .timeline-stage-card, .pressure-card-item, .takeaway-pill, .case-tagline, .wordcloud-panel",
  );
  clickableCards.forEach((card) => {
    card.classList.add("click-shake");
    card.addEventListener("click", (e) => {
      if (e.target.closest("button, summary, a")) return;
      card.classList.remove("is-shaking");
      void card.offsetWidth;
      card.classList.add("is-shaking");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".reading-progress-bar");
  if (!progressBar) return;

  const updateReadingProgress = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.height = `${Math.min(100, Math.max(0, progress))}%`;
  };

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  updateReadingProgress();
});

/* Script block 7 */
document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  if (!tocLinks.length) return;

  const sections = tocLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const section = id ? document.querySelector(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActiveLink = (activeSection) => {
    sections.forEach(({ link, section }) => {
      link.classList.toggle("is-active", section === activeSection);
    });
  };

  const updateActiveSection = () => {
    const marker = window.innerHeight * 0.28;
    let current = sections[0].section;

    sections.forEach(({ section }) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker) current = section;
    });

    setActiveLink(current);
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();
});


document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toc-toggle");
  const toc = document.querySelector(".toc");
  const backdrop = document.querySelector(".toc-backdrop");
  if (!toggle || !toc || !backdrop) return;

  const closeToc = () => {
    toc.classList.remove("is-open");
    backdrop.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  const openToc = () => {
    toc.classList.add("is-open");
    backdrop.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    if (toc.classList.contains("is-open")) {
      closeToc();
    } else {
      openToc();
    }
  });

  backdrop.addEventListener("click", closeToc);
  toc.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeToc));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeToc();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const mobileFlowCards = document.querySelectorAll('[aria-label="新圖1"] .flow-card');
  mobileFlowCards.forEach((card) => {
    let tapTimer;
    card.addEventListener(
      "touchstart",
      () => {
        window.clearTimeout(tapTimer);
        card.classList.remove("mobile-tap", "is-shaking");
        void card.offsetWidth;
        card.classList.add("mobile-tap", "is-shaking");
        tapTimer = window.setTimeout(() => {
          card.classList.remove("mobile-tap");
        }, 420);
      },
      { passive: true },
    );
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".article > section, .article .story-photo, .sources");
  const firstCase = document.querySelector("#case1");
  if (firstCase) firstCase.classList.add("is-revealed");

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => {
      if (item.id === "case1") return;
      revealObserver.observe(item);
    });
  }

  const hero = document.querySelector(".hero");
  if (!hero || prefersReducedMotion) return;

  let ticking = false;
  const updateHeroParallax = () => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const offset = Math.max(-12, Math.min(28, scrollY * 0.08));
    hero.style.setProperty("--hero-offset", `${offset}px`);
    ticking = false;
  };

  updateHeroParallax();

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeroParallax);
    },
    { passive: true },
  );
});
