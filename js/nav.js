/**
 * Shared navigation — mobile menu toggle & light/dark theme
 */
(function () {
  var themeToggle = document.getElementById("themeToggle");
  var savedTheme = localStorage.getItem("ironcore-theme");

  function setTheme(isLight) {
    document.body.classList.toggle("theme-light", isLight);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  if (savedTheme === "light") {
    setTheme(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isLight = !document.body.classList.contains("theme-light");
      setTheme(isLight);
      localStorage.setItem("ironcore-theme", isLight ? "light" : "dark");
    });
  }
})();

(function () {
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (!navToggle || !mainNav) {
    return;
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  var navLinks = mainNav.querySelectorAll("a");
  var i = 0;

  while (i < navLinks.length) {
    navLinks[i].addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    i++;
  }
})();
