APP.component.Header = ClassAvanti.extend({
  init(options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup(options) {
    if (typeof APP.i.Helpers === 'undefined') {
      throw new TypeError('You need Helpers Component installed.')
    }

    this.options = $.extend(
      {
        $header: $('header'),
        helpers: APP.i.Helpers,
        classHeaderThin: 'header--thin',
        classMenu: 'header__menu',
        classMenuOpen: 'header__menu--open',
        classMenuLinkSubmenu: 'menu__link--submenu',
        classMenuSubmenu: 'menu__submenu',
        classSubmenuLink: 'submenu__link',
        classMenuLinkOpen: 'menu__link--open',
        classMenuBar: 'menu-bar',
        classMenuBarLink: 'menu-bar__link',
        classMenuBarLinkOpen: 'menu-bar__link--open',
        classSignIn: 'header-account-login',
        classSignOut: 'header-account-logout'
      },
      options
    )

    APP.i.Menu = new APP.component.Menu()
    APP.i.Search = new APP.component.Search()
    APP.i.Minicart = new APP.component.Minicart()
  },

  start() {
    this.setLoggedIn()
  },

  setLoggedIn() {
    const { classSignIn, classSignOut } = this.options

    if (!vtexjs.checkout.orderForm) {
      vtexjs.checkout.getOrderForm().then(() => {
        if (vtexjs.checkout.orderForm.loggedIn) {
          $(`.${classSignOut}`).removeClass('hidden')
        } else {
          $(`.${classSignIn}`).removeClass('hidden')
        }
      })

      return true
    }
  },

  bind() {
    this.bindLogin()
    this.bindResponsiveMenu()
    this.bindSubmenu()
    this.bindSubmenuColumn()
    this.bindStickyHeader()
  },

  bindLogin() {
    $(`.${this.options.classSignIn}`).on('click', event => {
      event.preventDefault()

      $('#login').trigger('click')
    })
  },

  bindResponsiveMenu() {
    const $headerMenu = $(`.${this.options.classMenu}`)

    $(`.${this.options.classMenuBarLink}`).on('click', event => {
      if ($(`.${this.options.classMenuBar}`).is(':hidden')) {
        return true
      }

      event.preventDefault()
      const _this = $(event.currentTarget)

      if (!_this.hasClass(this.options.classMenuBarLinkOpen)) {
        _this.addClass(this.options.classMenuBarLinkOpen)
        $('.header__responsive')
          .find('.menu-bar')
          .addClass('menu-bar--opened')
        $('.header__responsive')
          .find('.menu-bar__link')
          .addClass(this.options.classMenuBarLinkOpen)
        $headerMenu.addClass(this.options.classMenuOpen)
        $('body').addClass('body-lock')
      }
    })

    $('body').on('click', '.header__responsive .menu-bar__link--open', e => {
      e.preventDefault()
      const _this = $(e.currentTarget)
      $('.menu-bar__link--open').removeClass(this.options.classMenuBarLinkOpen)
      $headerMenu.removeClass(this.options.classMenuOpen)
      $('body').removeClass('body-lock')
    })
  },

  bindSubmenu() {
    if ($(window).width() < 992) {
      $(`.${this.options.classMenuLinkSubmenu}`).on('click', event => {
        event.preventDefault()

        $(event.currentTarget).toggleClass(this.options.classMenuLinkOpen)
      })
    }
  },

  bindSubmenuColumn() {
    if ($(`.${this.options.classMenuBar}`).is(':visible')) {
      return true
    }

    $(`.${this.options.classMenuSubmenu}`).each((index, element) => {
      const _this = $(element)
      const items = _this.find(`.${this.options.classSubmenuLink}:not(.av-hidden-md.av-hidden-lg)`)

      if (items.length > 5) {
        _this.addClass('menu__submenu--hasColumn')
      }
    })
  },

  bindStickyHeader() {
    const menuWrapper = $('.header__menu')
    window.onscroll = function() {
      if (this.oldScroll > this.scrollY) {
        menuWrapper.addClass('header__menu--visible')
      } else {
        menuWrapper.removeClass('header__menu--visible')
      }
      this.oldScroll = this.scrollY
    }
  }
})
