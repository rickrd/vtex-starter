APP.controller.ListEmpty = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function() {
    this.emptySearchProducts = $('.empty-search-products .main-shelf > ul')
  },

  start: function() {
    this.getSearchTerm()
    this.startSlickEmptySearch()
  },

  getSearchTerm: function() {
    const self = this

    const queryString = window.location.search.substr(1)
    const params = queryString.split('&')

    const term = params.reduce((current, item) => {
      const [key, value] = item.split('=')
      let string = ''
      if (key === 'ft') {
        string = value
      }

      return current.concat(string)
    }, '')

    $('.empty-search__terms').text(decodeURIComponent(term))
  },

  startSlickEmptySearch: function() {
    this.emptySearchProducts.slick({
      dots: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplaySpeed: 5000,
      infinite: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    })
  },

  bind: function() {}
})
