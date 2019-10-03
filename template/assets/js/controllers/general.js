APP.controller.General = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
  },

  setup: function() {
    APP.i.Helpers = new APP.component.Helpers()
    APP.i.Header = new APP.component.Header()
    APP.i.Footer = new APP.component.Footer()
    APP.i.Modal = new APP.component.Modal()
    APP.i.Shelf = new APP.component.Shelf()
  },

  start: function() {
    this.checkIphone()
    this.removeHelperComplement()
    this._bindTelevendas()
  },

  checkIphone: function() {
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

    if (iOS) {
      $('html').addClass('iphone')
    }
  },

  removeHelperComplement: function() {
    $('[id^="helperComplement_"]').remove()
  },

  _registerSlickIntervalBind(callback) {
    const interval = setInterval(() => {
      const resize = $._data(window, 'events').resize

      if (typeof resize === 'undefined') {
        return false
      }

      if (resize[0].namespace === '') {
        clearInterval(interval)

        callback()
      }
    }, 100)
  },

  _bindTelevendas() {
    $(document).ajaxStop(() => {
      if ($('#vtex-callcenter').length) {
        $('body').addClass('televendas')
      } else {
        $('body').removeClass('televendas')
      }
    })
  }
})
