/* Phone menu. Loaded in <head> so the "js" class is on <html> before the page
   paints. Below 1120px styles.css then folds the nav links into the Menu
   button, which opens them as a full navy panel; without JavaScript the links
   simply wrap under the site name. */
(function () {
  var root = document.documentElement;
  root.className += (root.className ? " " : "") + "js";

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".nav");
    var button = document.querySelector(".nav-toggle");
    if (!nav || !button) return;
    var menuLabel = button.textContent;

    function setOpen(open) {
      if (open) menuLabel = button.textContent;
      nav.classList.toggle("nav-open", open);
      root.classList.toggle("menu-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.textContent = open ? (button.getAttribute("data-close") || "Close") : menuLabel;
    }

    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    // Close after a link is chosen, so in-page links don't leave it open.
    nav.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest(".nav-links a");
      if (link) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("nav-open")) {
        setOpen(false);
        button.focus();
      }
    });

    // Widening the window to the desktop row closes the panel.
    if (window.matchMedia) {
      var wide = window.matchMedia("(min-width: 1120px)");
      var onWide = function () { if (wide.matches && nav.classList.contains("nav-open")) setOpen(false); };
      if (wide.addEventListener) wide.addEventListener("change", onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  });
})();
