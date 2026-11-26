/* Phone menu. Loaded in <head> so the "js" class is on <html> before the page
   paints. At 1080px and below styles.css then folds the nav links into the Menu
   button; without JavaScript the links simply wrap under the site name. */
(function () {
  var root = document.documentElement;
  root.className += (root.className ? " " : "") + "js";

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".nav");
    var button = document.querySelector(".nav-toggle");
    if (!nav || !button) return;

    function setOpen(open) {
      nav.classList.toggle("nav-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
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
  });
})();
