APP.component.Minicart = ClassAvanti.extend({
  init(options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup(options) {
    this.options = $.extend(
      {
        thumbWidth: 82,
        thumbHeight: 82,
        attemptsError: 2,

        template: variables => {
          return `<li class="minicart-product__item">
                  <div class="minicart-product__delete">
                    <a href="#" class="minicart-product__delete-link">
                      <span class="minicart-product__delete-bars"></span>
                    </a>
                  </div>

                  <div class="minicart-product__image">
                    <a href="${variables.link}" class="minicart-product__link">
                      <img src="${variables.image}" alt="${variables.name}" />
                    </a>
                  </div>

                  <div class="minicart-product__info">
                    <h4 class="minicart-product__title">
                      <a href="${variables.link}" class="minicart-product__link">${variables.name}</a>
                    </h4>

                    <div class="minicart-controls">
                      <div class="minicart-control minicart-control--less"></div>
                      <div class="minicart-control minicart-control--items">
                        ${variables.quantity}
                      </div>
                      <div class="minicart-control minicart-control--more"></div>
                    </div>

                    <div class="minicart-product__best-price">
                      ${variables.bestPrice}
                    </div>
                  </div>
                </li>`
        },

        $scope: $('.minicart'),
        $close: $('.minicart-header__close, .minicart-overlay'),
        $closeKeep: $('.minicart-continue'),
        $open: $('.header__minicart-icon'),
        $list: $('.minicart-products'),
        $totalItems: $('.minicart-resume__total-counter, .header__minicart-total'),
        $totalPrice: $('.minicart-resume__total-price-target'),

        classBody: 'body-lock--minicart',
        classOpen: 'minicart--open',
        classLoading: 'minicart--loading',
        classItem: 'minicart-product__item',
        classDelete: 'minicart-product__delete',
        classControlLess: 'minicart-control--less',
        classControlItems: 'minicart-control--items',
        classControlMore: 'minicart-control--more'
      },
      options
    )
  },

  start() {
    this.populateCart()
  },

  populateCart() {
    this.getItemsCart(response => {
      this.setCart(response)
      this.populate()
    })
  },

  getItemsCart(callback) {
    this._showLoading()

    vtexjs.checkout.getOrderForm().then(
      response => {
        callback(response)

        this._hideLoading()
      },
      error => {
        throw new Error(error)
      }
    )
  },

  populate() {
    this.options.$list.html('')

    this.totalItems = 0
    this.populateItems()
    this.populateInformations()
  },

  populateItems() {
    this.cart.items.map(item => {
      const $product = this.options.template({
        link: item.detailUrl,
        image: this._fixImage(item.imageUrl),
        name: item.name,
        bestPrice: this._formatPrice(item.sellingPrice, 'R$ '),
        listPrice: this._formatPrice(item.listPrice),
        quantity: item.quantity
      })

      this.totalItems += item.quantity
      this.options.$list.append($product)
    })
  },

  populateInformations() {
    this.options.$totalItems.html(this.totalItems)
    this.options.$totalPrice.html(this._formatPrice(this.cart.value, 'R$ '))
  },

  _showLoading() {
    this.options.$scope.addClass(this.options.classLoading)
  },

  _hideLoading() {
    this.options.$scope.removeClass(this.options.classLoading)
  },

  _fixImage(url) {
    const imageProtocol = this._fixImageProtocol(url)
    const imageResized = this._resizeImage(imageProtocol)

    return imageResized
  },

  _fixImageProtocol(url) {
    return url.replace('http:', '')
  },

  _resizeImage(url) {
    const pattern = /(-)(\d+)(-)(\d+)/gi
    const replace = `$1${this.options.thumbWidth}$3${this.options.thumbHeight}`

    return url.replace(pattern, replace)
  },

  _formatPrice(price, prefix) {
    let priceString = price.toString()

    if (priceString.length < 3) {
      priceString = `00${priceString}`
    }

    let temp = priceString.replace(/([0-9]{2})$/g, ',$1')

    if (temp.length > 6) {
      temp = temp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    } else if (temp.length > 9) {
      temp = temp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
    }

    if (typeof prefix !== 'undefined') {
      temp = prefix + temp
    }

    return temp
  },

  setDecimal(value, string) {
    var dotValue = value.substr(0, value.length - 2) + string + value.substr(value.length - 2, value.length)
    return dotValue
  },

  bind() {
    this.bindOpenCart()
    this.bindClose()
    this.bindCloseKeep()

    this.bindClickOutside()

    this.bindLess()
    this.bindMore()

    this.bindRemove()
    this.bindOrderUpdate()
  },

  bindOpenCart() {
    this.options.$open.on('click', event => {
      event.preventDefault()

      if (this.options.$scope.hasClass(this.options.classOpen)) {
        this.closeCart()
      } else {
        this.openCart()
      }
    })
  },

  bindClose() {
    this.options.$close.on('click', event => {
      event.preventDefault()

      this.closeCart()
    })
  },

  bindCloseKeep() {
    this.options.$closeKeep.on('click', event => {
      event.preventDefault()

      this.closeCart()
    })
  },

  bindClickOutside() {
    $(document).on('click', event => {
      const $closeBox = this.options.$scope

      if (!$closeBox.is(event.target) && $closeBox.has(event.target).length === 0 && !this.options.$open.is(event.target) && this.options.$open.has(event.target).length === 0) {
        this.closeCart()
      }
    })
  },

  openCart() {
    this.options.$scope.addClass(this.options.classOpen)
    $('body').addClass(this.options.classBody)
  },

  closeCart() {
    this.options.$scope.removeClass(this.options.classOpen)
    $('body').removeClass(this.options.classBody)
  },

  bindLess() {
    this.options.$scope.on('click', `.${this.options.classControlLess}`, event => this.bindControl(event, this._lessCalc))
  },

  _lessCalc(items) {
    if (items === 1) {
      return false
    }

    return items - 1
  },

  bindMore() {
    this.options.$scope.on('click', `.${this.options.classControlMore}`, e => this.bindControl(e, this._moreCalc))
  },

  _moreCalc(items) {
    return items + 1
  },

  bindControl(event, calc) {
    event.preventDefault()

    const _this = $(event.currentTarget)

    const $controlItems = _this.parent().find(`.${this.options.classControlItems}`)
    const totalItems = Number($controlItems.text())
    const index = _this.parents(`.${this.options.classItem}`).index()

    const quantity = calc(totalItems)

    if (quantity === false) {
      return false
    }

    this.updateCart(index, quantity)
  },

  bindRemove() {
    $('body').on('click', `.${this.options.classDelete}`, event => {
      event.preventDefault()

      const _this = $(event.currentTarget)

      const index = _this.parents(`.${this.options.classItem}`).index()

      this.updateCart(index, 0, 'removeItems')
    })
  },

  updateCart(index, quantity, action = 'updateItems') {
    const item = {
      index,
      quantity
    }

    let attempts = 0

    this._showLoading()

    vtexjs.checkout[action]([item]).then(
      response => {
        this.setCart(response)

        this.populate()
        this._hideLoading()

        attempts = 0
      },
      error => {
        throw new Error(error)

        if (error.status === 500 && attempts < this.options.attempsError) {
          attempts++
          this._hideLoading()
          this.updateCart(index, quantity, action)
        }
      }
    )
  },

  setCart(response) {
    this.cart = {
      value: vtexjs.checkout.orderForm.totalizers.length ? vtexjs.checkout.orderForm.totalizers[0].value : 0,
      items: response.items
    }
  },

  itemExists(sku) {
    const items = this.cart.items

    return items.filter(item => parseInt(item.id) === sku)
  },

  addCart(url, callback) {
    $.ajax({
      url: this._changeUrlRedirect(url),
      type: 'GET'
    }).then(
      response => {
        this.populateCart()

        callback()
      },
      error => {
        throw new Error(error)
      }
    )
  },

  _changeUrlRedirect(url) {
    const pattern = /(redirect=)(true)/gi

    return url.replace(pattern, `$1false`)
  },

  bindOrderUpdate() {
    $(window).on('orderFormUpdated.vtex', (event, orderForm) => {
      this.setCart(orderForm)
    })
  }
})
