const vendor = [
  'assets/vendor/avanti-class/src/avanti-class.js'<% if (newStore) { %>,
  'assets/vendor/slick-carousel/slick/slick.js',
  'assets/vendor/js-cookie/src/js.cookie.js',
  'assets/vendor/avanti-search/src/avanti-search.js',
  'assets/vendor/jquery-validation/dist/jquery.validate.js',
  'assets/vendor/zoomove/dist/zoomove.min.js'<% } %>
]

export default vendor
