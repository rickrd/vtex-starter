APP.component.Search = ClassAvanti.extend({
  init: function(options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup: function(options) {
    this.options = $.extend(
      {
        delay: 300,
        maxRows: 12,
        mobileAutoComplete: false,
        thumbSize: 68,

        $scope: $('.header__search'),
        $input: $('.search__input'),
        $button: $('.search__submit'),
        $mobIsVisible: $('.menu-bar'),

        classOpen: 'body-header__search--open',
        classSearchInputActive: 'search__input--active',
        classTarget: 'search__target',
        classTargetList: 'search__target__list',
        classTargetListItem: 'search__target__item',
        classTargetListItemImage: 'search__target__item--image',
        classTargetListItemCategory: 'search__target__item--category',
        classTargetListLink: 'search__target__link'
      },
      options
    )
  },

  start: function() {},

  bind: function() {
    this.bindClickOutside()
    this.bindSearchSubmit()
    this.bindSearch()
  },

  bindClickOutside: function() {
    $(document).on('click', event => {
      const $closeBox = this.options.$scope

      if (!$closeBox.is(event.target) && $closeBox.has(event.target).length === 0) {
        $('body').removeClass(this.options.classOpen)

        this.options.$scope
          .find(`.${this.options.classTarget}`)
          .html('')
          .hide()
          .css({
            height: ''
          })

        this.options.$input.removeClass(this.options.classSearchInputActive)
      }
    })
  },

  bindSearchSubmit: function() {
    this.options.$button.on('click', event => {
      event.preventDefault()

      const val = this.options.$input.val()

      if (val !== '') {
        this.submitSearch(val)
      } else {
        this.options.$input.focus()
      }
    })
  },

  bindSearch: function() {
    let delay

    this.options.$input.on('keyup', event => {
      event.preventDefault()

      const _this = $(event.currentTarget)
      const val = _this.val()
      const code = event.keyCode || event.which

      if (code === 13 && val !== '') {
        this.submitSearch(val)

        return true
      }

      if (this._isMob() && this.options.mobileAutoComplete === false) {
        return true
      }

      clearTimeout(delay)

      delay = setTimeout(() => {
        if (val === '') {
          this.options.$scope
            .find(`.${this.options.classTarget}`)
            .html('')
            .hide()
            .css('height', '')

          this.options.$input.removeClass(this.options.classSearchInputActive)

          return
        }

        this.getSearchResult(val)
      }, this.options.delay)
    })
  },

  submitSearch: function(terms) {
    const urlTerms = encodeURI(this._removeCharacters(terms))

    window.location = `/${urlTerms}`
  },

  _removeCharacters: function(str) {
    str = str.toLowerCase().trim()

    // remove accents
    const from = 'åàáãäâèéëêìíïîòóöôùúüûñç'
    const to = 'aaaaaaeeeeiiiioooouuuunc'

    for (let i = 0; i < from.length; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars

    return str
  },

  getSearchResult: function(terms) {
    $.ajax({
      url: '/buscaautocomplete',
      type: 'get',
      data: {
        maxRows: this.options.maxRows,
        productNameContains: terms
      }
    }).then(response => {
      const items = response.itemsReturned
      const $listResult = $(`<ul class="${this.options.classTargetList}" />`)

      items.map(item => {
        const { href, thumb } = item
        const $thumb = this._changeImageSize(thumb, this.options.thumbSize, 25)
        const nameComplete = item.items
        nameComplete.map(name => {
          const $contentTitle = $('<span />').text(name.nameComplete)

          const $link = $(`<a />`, {
            class: this.options.classTargetListLink,
            href
          })

          $link.append($thumb)
          $link.append($contentTitle)

          const $item = $(`<li class="${this.options.classTargetListItem}" />`)
          if ($thumb !== '') {
            $item.addClass(this.options.classTargetListItemImage)
          } else {
            $item.addClass(this.options.classTargetListItemCategory)
          }

          $item.append($link)
          $listResult.append($item)
        })
      })

      this.options.$scope
        .find(`.${this.options.classTarget}`)
        .html($listResult)
        .show()

      this.options.$input.addClass(this.options.classSearchInputActive)
    })
  },

  _changeImageSize: function(image, newSize, actualSize) {
    return image
      .replace(`-${actualSize}-${actualSize}`, `-${newSize}-${newSize}`)
      .replace(`width="${actualSize}"`, `width="${newSize}"`)
      .replace(`height="${actualSize}"`, `height="${newSize}"`)
  },

  _isMob: function() {
    if (this.options.$mobIsVisible.is(':visible')) {
      return true
    }

    return false
  }
})
