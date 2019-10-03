APP.component.Footer = ClassAvanti.extend({
  init(options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup(options) {
    this.options = $.extend(
      {
        $mobIsVisible: $('.menu-bar'),

        classFooterTitle: 'footer-content__title--arrow',
        classFooterTitleUp: 'footer-content__title--arrow-up',
        classFooterContent: 'footer-content__list'
      },
      options
    )

    APP.i.Newsletter = new APP.component.Newsletter({
      onSuccess() {
        $('.footer-newsletter .newsletter__input').val('')

        alert('Cadastro efetuado com sucesso!')
      }
    })
  },

  start() {},

  bind() {
    this.bindOpenMenus()
  },

  bindOpenMenus() {
    $(`.${this.options.classFooterTitle}`).on('click', event => {
      event.preventDefault()

      if (!this._isMob()) {
        return false
      }

      const _this = $(event.currentTarget)
      const $content = _this.next(`.${this.options.classFooterContent}`)

      _this.toggleClass(this.options.classFooterTitleUp)
      $content.toggle()
    })
  },

  _isMob() {
    if (this.options.$mobIsVisible.is(':visible')) {
      return true
    }

    return false
  }
})
