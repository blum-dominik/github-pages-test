(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-primary-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 959px)").matches) {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  const calendars = document.querySelectorAll("table");
  if (calendars.length > 0) {
    const now = new Date();

    calendars.forEach(function (table) {
      const eventRows = table.querySelectorAll("tbody tr[data-event-date]");
      if (eventRows.length === 0) {
        return;
      }

      let nextRow = null;
      let nextTime = null;

      eventRows.forEach(function (row) {
        row.classList.remove("next-event");

        const value = row.getAttribute("data-event-date");
        const parsed = value ? new Date(value) : null;
        if (!parsed || Number.isNaN(parsed.getTime())) {
          return;
        }

        if (parsed >= now && (nextTime === null || parsed < nextTime)) {
          nextTime = parsed;
          nextRow = row;
        }
      });

      if (nextRow) {
        nextRow.classList.add("next-event");
      }
    });
  }
})();
