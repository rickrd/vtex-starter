window.goToTopPage = function() {}
$(function() {
  window.goToTopPage = function() {}
})

APP.controller.List = ClassAvanti.extend({
  init() {
    this.setup()
    this.start()
    this.bind()
  },

  setup() {
    this.$mobIsVisible = $('.menu-bar')
    this.$header = $('.header')
    this.$mainShelf = $('.main-shelf')
    this.$searchFilter = $('.search-filter')

    this.$resultItems = $('.resultItemsWrapper div[id^="ResultItems"]')
    this.$loading = $('.search-default__loading')
    this.$noResult = $('.search-default__no-result')

    this.$order = $('#search-order')
    this.mainShelfPosition = parseInt(this.$mainShelf.offset().top) - this.$header.outerHeight()

    // APP.i.FilterColors = new APP.component.FilterColors()
    APP.i.Select = new APP.component.Select({
      selector: this.$order
    })
  },

  start() {
    this.createClearFilterButton()
    this.removeFilterCounter()
    this.createHeaderFilter()
    this.changeFilterOrder()
    this.startAvantiSearch()
  },

  createClearFilterButton() {
    const $buttons = `<div class="search-filter__buttons">
                        <button class="search-filter__button search-filter__button--apply">Aplicar filtros</button>
                        <button class="search-filter__button search-filter__button--clear">Limpar filtros</button>
                      </div>`

    this.$searchFilter.append($buttons)
  },

  removeFilterCounter() {
    const self = this

    $('.menu-departamento label, .menu-departamento a').each(function() {
      const _this = $(this)

      const text = _this.text()
      const removeCounter = text.replace(/(\s)(\()([0-9]*)(\))/gi, '')

      if (typeof _this.contents()[1] !== 'undefined') {
        _this.contents()[1].nodeValue = removeCounter
      } else {
        _this.text(removeCounter)
      }
    })
  },

  createHeaderFilter() {
    const $target = $('.search-single-navigator')

    const $headeFilter = `<div class="filter__header">
                            <div class="menu__header-title">Filtros</div>

                            <a href="#" class="filter__header-close">
                              <span class="filter__header-bars"></span>
                            </a>
                          </div>`

    $target.prepend($headeFilter)

    if ($('body').hasClass('search')) {
      $('.filter__header .menu__header-title').html('FILTROS')
    }
  },

  changeFilterOrder() {
    $('.search-single-navigator').after($('.search-multiple-navigator'))
  },

  startAvantiSearch() {
    const { $resultItems, $loading, $noResult, $order } = this

    $('body').on('avantisearch.emptySearch', () => {
      $loading.hide()
      $noResult.show()
    })

    /**
     * Init Without Cookie
     */
    $resultItems.on('avantisearch.initWithoutCookie', () => {
      $loading.hide()

      setTimeout(() => {
        $('.main-shelf > .main-shelf').show()
      }, 300)
    })

    /**
     * Start
     */
    $resultItems.avantiSearch({
      $selectOrder: $order,
      textLoadLess: 'CARREGAR MENOS PRODUTOS',
      textLoadMore: 'CARREGAR MAIS PRODUTOS',
      pagination: false,
      defaultParams: {
        query: {
          O: 'OrderByReleaseDateDESC'
        }
      }
    })

    /**
     * Before Filter and Before Change Order
     */

    $resultItems.on('avantisearch.beforeChangePage', (event, options) => {
      const { $result } = options

      $('html, body').animate({ scrollTop: 0 }, 400)
      $loading.show()
    })

    $resultItems.on('avantisearch.afterChangePage', (event, options) => {
      const { $result } = options

      $loading.hide()
    })

    $resultItems.on('avantisearch.beforeFilter avantisearch.beforeChangeOrder', (event, options) => {
      const { $result, classLoadLess, classLoadMore } = options

      const $item = $result.find('.main-shelf > ul')
      const $buttons = $(`.${classLoadLess}, .${classLoadMore}`)

      const itemPosition = parseInt($item.offset().top, 10) - 180

      $loading.show()
      $noResult.hide()

      this._buttonsToggle($buttons, 'hide')
      this._slideToggle($result, 'slideUp')
      this._scrollTop(itemPosition)
    })

    /**
     * After Filter and After Change Order
     */
    $resultItems.on('avantisearch.afterFilter avantisearch.afterChangeOrder', (event, options) => {
      const { $result, classLoadLess, classLoadMore } = options

      const $buttons = $(`.${classLoadLess}, .${classLoadMore}`)

      this._slideToggle($result, 'slideDown')
      this._buttonsToggle($buttons, 'show')
    })

    /**
     * Before Search
     */
    $resultItems.on('avantisearch.beforeSearch', () => {
      $noResult.hide()
    })

    /**
     * After Search
     */
    $resultItems.on('avantisearch.afterSearch', (event, options) => {
      APP.i.Shelf = new APP.component.Shelf()

      if (options.totalItems === 0) {
        $noResult.show()
      }

      $loading.hide()

      setTimeout(() => {
        $('.main-shelf > .main-shelf').show()
      }, 300)
    })
  },

  _buttonsToggle($element, action) {
    $element.not('.load-btn--hide')[action]()
  },

  _slideToggle($element, direction) {
    const $list = $element.find('> div > ul')

    $list.stop(true, true)[direction]('slow', () => {
      $list.css({
        overflow: 'visible'
      })
    })
  },

  _scrollTop(position) {
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: position
        },
        500
      )
  },

  _isMob() {
    if (this.$mobIsVisible.is(':visible')) {
      return true
    }

    return false
  },

  bind() {
    this.bindOpenFilter()
    this.bindCloseFilter()
    this.bindResetFilter()
    this.bindSearchResults()
    // this.bindChangeBreadCrumb()
    this.bindFilter()

    const deptTitleEl = $('h2.titulo-sessao')
    const deptTitle = deptTitleEl.text()
    $('h1.titulo-sessao').html(`${deptTitle}`)
    deptTitleEl.remove()

    if ($(window).width() < 992) {
      $('h1.titulo-sessao').appendTo('.search__result-top')
    }
  },

  bindOpenFilter() {
    $('.button__open-filter').on('click', event => {
      event.preventDefault()

      $('body').addClass('body-lock')
      $('.search-filter').addClass('opened')
    })
  },

  bindCloseFilter() {
    $('.filter__header-close, .search-filter__button--apply').on('click', event => {
      event.preventDefault()

      $('body').removeClass('body-lock')
      $('.search-filter').removeClass('opened')
    })
  },

  bindResetFilter() {
    $('.search-filter__button--clear').on('click', event => {
      event.preventDefault()
      const _this = $(event.currentTarget)

      const $departament = $('.menu-departamento')
      const $checked = $departament.find('input[type="checkbox"]:checked')

      $checked.removeAttr('checked')
      $departament.find('label.filter--active').removeClass('filter--active')

      const filters = []
      $checked.each((i, e) => {
        const _this = $(e)

        const filter = _this.attr('rel')

        filters.push(filter)
      })

      AvantiSearch._refreshFilter(filters, false, _this)
      // this._hideResult()
      // this._scrollToTopResult()

      if ($('.filter__header').is(':visible')) {
        $('body').removeClass('body-lock')
        this.$searchFilter.removeClass('opened')
      }
    })
  },

  bindLoading() {
    if ($('.loading-list').length === 0) {
      $('.search__result')
        .find('.load-more')
        .before(`<span class="loading-list"></span>`)
    }
  },

  bindSearchResults() {
    if ($('body').hasClass('search')) {
      const searchNumber = $('.resultado-busca-numero')
        .first()
        .find('.value')
        .text()
      const searchTerm = $('.resultado-busca-termo')
        .first()
        .find('.value')
        .text()
      $('.search .search-result')
        .find('span')
        .prepend(`${searchNumber} `)
      $('.search .search-result')
        .find('strong')
        .html(searchTerm)

      if ($(window).width() < 992) {
        const elSearch = $('.search-result--wrapper')
        $('.search-default').before(elSearch)
      }
    }
  },

  // bindChangeBreadCrumb () {
  //   if ($(window).width() < 992) {
  //     if ($('body').hasClass('departament') || $('body').hasClass('category')) {
  //       $('.breadcrumb').appendTo('.search__result-top')
  //       $('.breadcrumb').show()
  //     }
  //   }
  // },

  bindFilter() {
    const url = window.location.href
    if ($('body').hasClass('search')) {
      if (url.indexOf('?fq=spec_fct_') != -1) {
        $('body').addClass('filter-search')
      } else {
        $('.search-result').show()
      }
    }
  }
})
