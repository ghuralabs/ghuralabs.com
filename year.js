// Keeps the footer year current. Without JS, the year written in the HTML shows.
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = String(new Date().getFullYear());
});
