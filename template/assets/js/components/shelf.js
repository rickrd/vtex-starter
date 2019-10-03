APP.component.Shelf = ClassAvanti.extend({
  init() {
    this.start()
  },

  start() {
    this._bindGetProduct()
    this.eachShelf()
  },

  eachShelf() {
    $('.shelf-item:not(.shelf-item--initialized)').each((index, element) => {
      const _this = $(element)

      const $flagDiscountPercent = _this.find('.flag-percentage')
      const discountPercent = $flagDiscountPercent.text().trim()

      if (!_this.find('.shelf-item__installments__value').length) {
        const shelfPrice = _this.find('.shelf-item__best-price').text()
        _this.find('.shelf-item__installments').html(`ou 1x de <span class="shelf-item__installments__value">${shelfPrice}</span>`)
      }

      if (discountPercent === '0') {
        return true
      }

      const discountFormated = discountPercent.replace(/^(\d+),(\d+)\s(%)$/g, '-$1$3')
      $flagDiscountPercent.html(discountFormated).addClass('flag-percentage--active')

      _this.addClass('shelf-item--initialized')
    })
  },

  _bindGetProduct() {
    $('.shelf-item').each((i, e) => {
      const _this = $(e)
      const urlProduct = _this
        .find('.shelf-item__title > a')
        .attr('href')
        .split('/')
        .slice(3, -1)
      const apiPath = '/api/catalog_system/pub/products/search/'
      const url = `${apiPath}${urlProduct}/p`
      const type = 'GET'

      $.ajax({
        url,
        crossDomain: true,
        type
      }).then(
        data => {
          data.filter(item => {
            if (item['Lote Multiplo']) {
              const unidade = item.items[0].measurementUnit
              _this.find('.shelf-item__best-price > strong').text(`/${unidade}`)
            }
          })
        },
        error => {
          throw new Error(error)
        }
      )
    })
  }
})
