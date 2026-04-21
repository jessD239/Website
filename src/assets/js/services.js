export function initServices() {
  const serviceData = {
    1: {
      title: "Make your content work harder",
      text:
        "<p>If your content isn't landing - or you're not sure what to do next - we can help.</p>" +
        "<p><strong>What we do</strong></p>" +
        "<ul>" +
        "<li>Identify what's working (and what's not)</li>" +
        "<li>Review your current content</li>" +
        "<li>Train and upskill your team where needed</li>" +
        "<li>Guide your team on how to improve</li>" +
        "<li>Introduce tools where useful, including AI</li>" +
        "</ul>" +
        "<p><strong>Formats</strong></p>" +
        "<p>2-4 hour sessions. Full-day workshops. Multi-day programmes or semi-permanent for intense training.</p>" +
        "<p><strong>Outcome</strong></p>" +
        "<p>Clear direction. Practical steps. Confidence to move forward.</p>",
    },
    2: {
      title: "Content with a purpose",
      text:
        "<p>We don't just film and shoot. We start with why.</p>" +
        "<p><strong>What we offer</strong></p>" +
        "<ul>" +
        "<li>Content strategy and roll-out plan</li>" +
        "<li>Video production</li>" +
        "<li>Photography</li>" +
        "<li>Live streaming</li>" +
        "<li>Content libraries — create from scratch, add, or refresh</li>" +
        "<li>Editing — one-off or semi-regular</li>" +
        "</ul>" +
        "<p><strong>Approach</strong></p>" +
        "<p>Plan first. Then create. Less guesswork. Better results.</p>",
    },
    3: {
      title: "The right people, without the search",
      text:
        "<p>A curated network of trusted creatives — ready when you need them.</p>" +
        "<p><strong>What it means</strong></p>" +
        "<ul>" +
        "<li>No endless CVs</li>" +
        "<li>No guesswork</li>" +
        "<li>Just the right person for the job</li>" +
        "<li>We manage quality control, admin, and communication</li>" +
        "</ul>",
    },
  };

  const detail = document.getElementById("servicesDetail");
  const detailTitle = document.getElementById("servicesDetailTitle");
  const detailText = document.getElementById("servicesDetailText");
  const servicesList = document.querySelector(".services__list");
  const cards = document.querySelectorAll(".service-card[data-service]");

  if (!detail || !detailTitle || !detailText || !servicesList || !cards.length) {
    return;
  }

  let activeCard = null;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function restartAnimation(el) {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  }

  function setDetailContent(id) {
    detailTitle.textContent = serviceData[id].title;
    detailText.innerHTML = serviceData[id].text;
  }

  function animateDetailToContentHeight() {
    const startHeight = detail.getBoundingClientRect().height;

    detail.style.height = "auto";
    const targetHeight = detail.scrollHeight;
    detail.style.height = startHeight + "px";
    void detail.offsetHeight;
    detail.style.height = targetHeight + "px";
  }

  function openDetailPanel() {
    detail.classList.add("is-open");
    detail.style.height = "0px";
    void detail.offsetHeight;
    detail.style.height = detail.scrollHeight + "px";
  }

  function closeDetailPanel() {
    detail.style.height = detail.scrollHeight + "px";
    void detail.offsetHeight;
    detail.classList.remove("is-open");
    detail.style.height = "0px";
  }

  function populateMobileDetails() {
    cards.forEach(function (card) {
      const id = card.getAttribute("data-service");
      const data = serviceData[id];
      let mobileDetail = card.querySelector(".service-card__mobile-detail");

      if (!mobileDetail) {
        mobileDetail = document.createElement("div");
        mobileDetail.className = "service-card__mobile-detail";
        card.appendChild(mobileDetail);
      }

      mobileDetail.innerHTML =
        '<h4 class="services__detail-title">' +
        data.title +
        "</h4>" +
        '<div class="services__detail-text">' +
        data.text +
        "</div>";
    });
  }

  function resetDesktopDetailState() {
    if (!isMobile()) {
      return;
    }

    if (activeCard) {
      activeCard.classList.remove("is-active");
    }

    activeCard = null;
    detail.classList.remove("is-open");
    detail.style.height = "0px";
  }

  detail.addEventListener("transitionend", function (event) {
    if (event.propertyName !== "height") {
      return;
    }

    if (detail.classList.contains("is-open")) {
      detail.style.height = "auto";
    }
  });

  populateMobileDetails();
  window.addEventListener("resize", resetDesktopDetailState);

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (isMobile()) {
        return;
      }

      const id = this.getAttribute("data-service");
      const panelAlreadyOpen = detail.classList.contains("is-open");

      if (activeCard === this) {
        this.classList.remove("is-active");
        closeDetailPanel();
        activeCard = null;
        return;
      }

      if (activeCard) {
        activeCard.classList.remove("is-active");
      }

      this.classList.add("is-active");

      if (panelAlreadyOpen) {
        setDetailContent(id);
        animateDetailToContentHeight();
        restartAnimation(detailTitle);
        restartAnimation(detailText);
      } else {
        setDetailContent(id);

        if (isMobile()) {
          this.after(detail);
        } else {
          servicesList.parentNode.insertBefore(detail, servicesList.nextSibling);
        }

        openDetailPanel();
      }

      activeCard = this;

      if (isMobile() && !panelAlreadyOpen) {
        setTimeout(function () {
          detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    });
  });
}
