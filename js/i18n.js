(function () {
  function getLang() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("lang")) return params.get("lang");

    try {
      var stored = localStorage.getItem("tu-lang");
      if (stored) return stored;
    } catch (e) {}

    return "en";
  }

  var lang = getLang();

  try {
    localStorage.setItem("tu-lang", lang);
  } catch (e) {}

  fetch("lang/" + lang + ".json")
    .then(function (res) { return res.json(); })
    .then(function (dict) {
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        if (!key || !dict[key]) return;

        var tag = el.tagName.toLowerCase();
        if (tag === "meta" && el.getAttribute("name") === "description") {
          el.setAttribute("content", dict[key]);
        } else {
          el.textContent = dict[key];
        }
      });
    })
    .catch(function () {
      console.warn("Missing or invalid language file for", lang);
    });

  window.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("lang-switch");
    if (!select) return;

    select.value = lang;

    select.addEventListener("change", function () {
      var chosen = select.value || "en";
      try {
        localStorage.setItem("tu-lang", chosen);
      } catch (e) {}

      var url = new URL(window.location.href);
      url.searchParams.set("lang", chosen);
      window.location.href = url.toString();
    });
  });
})();
