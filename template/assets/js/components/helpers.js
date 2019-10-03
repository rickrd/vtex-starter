APP.component.Helpers = ClassAvanti.extend({
  init(options) {
    this.setup(options)
  },

  setup(options) {
    this.options = $.extend(
      {
        helpers: APP.i.Helpers,
        logeedInCookieName: 'VtexIdclientAutCookie_',

        classMenuBar: 'menu-bar'
      },
      options
    )
  },

  _isLoggedIn() {
    const { logeedInCookieName } = this.options

    return window.document.cookie.indexOf(logeedInCookieName) >= 0
  },

  _showLogin() {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      'fast'
    )

    vtexid.start({
      returnUrl: window.document.location.href,
      userEmail: '',
      locale: 'pt-BR',
      forceReload: false
    })
  },

  _getUserId(callback) {
    $.ajax({
      url: '/no-cache/profileSystem/getProfile',
      type: 'get'
    }).then(
      response => {
        callback(response.UserId)
      },
      error => {
        console.error('Error on get user profile.')

        throw new Error(error)
      }
    )
  },

  _isMobile() {
    const { classMenuBar } = this.options

    if ($(`.${classMenuBar}`).is(':hidden')) {
      return false
    }

    return true
  },

  _changeImageSize(image, width, height) {
    const replace = `$1${width}$3${height}$5`

    return image.replace(/(-)(\d+)(-)(\d+)(\/)/g, replace)
  },

  _slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }
})
