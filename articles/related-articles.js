/* related-articles.js — populates the "More articles" grid on article pages
   Reads /articles/articles.json, excludes current article,
   picks 3 random articles, renders cards into .related-grid */

(function () {
  var grid = document.querySelector('.related-grid');
  if (!grid) return;

  var currentPath = window.location.pathname;

  fetch('/articles/articles.json')
    .then(function (r) { return r.json(); })
    .then(function (articles) {
      var candidates = articles.filter(function (a) {
        return a.url !== currentPath && a.url !== currentPath.replace(/\/$/, '');
      });

      var picked = candidates
        .sort(function () { return Math.random() - 0.5; })
        .slice(0, 3);

      if (picked.length === 0) {
        var section = grid.closest('.article-related');
        if (section) section.remove();
        return;
      }

      grid.innerHTML = picked.map(function (a) {
        return '<a href="' + a.url + '" class="related-card">'
          + '<img src="' + a.image + '" alt="' + a.title.replace(/"/g, '&quot;') + '" loading="lazy">'
          + '<div class="related-card-body">'
          + '<h3>' + a.title + '</h3>'
          + '<p>' + a.desc + '</p>'
          + '</div>'
          + '</a>';
      }).join('');
    })
    .catch(function () {
      var section = grid.closest('.article-related');
      if (section) section.remove();
    });
})();
