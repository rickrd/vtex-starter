APP.component.FilterColors = ClassAvanti.extend({
  init: function () {
    this.setup()
    this.start()
  },

  setup: function () {
  
  },

  start: function () {
    this._createColorsElement()
  },

  _createColorsElement: function () {
    $('.search-multiple-navigator fieldset').find('label').each((i, e) => {
      const _this = $(e)
      _this.find('[rel*=27]').closest('fieldset').addClass('Cor')
      _this.find('[rel*=27]').closest('fieldset').find('h5').html('Cor')
    })
    setTimeout(() => {
      this.$colors = $('.refino.Cor');
      this.$inputs = this.$colors.find('input')
      this.$inputs.each((i, e) => {
        const _this = $(e)
        const rel = _this.attr('rel')
        let color
        [ , color ] = rel.split(':')

        const imageName = this._slugfy(color.toLocaleLowerCase())
        const src = `/arquivos/${imageName}.jpg`;
        const $image = $('<div />', {
          class: `color__image color__image--${imageName}`,
          style: `background-image: url('${src}')`
        })

        this._checkImage(src, err => {
          if (err) {
            $image.addClass('color__image--no-image')
          }
        })

        _this.before($image)

      })
    })
  },

  _slugfy: function (color) {
    return color.replace(/\ç/g, 'c').replace(/\W/g, '-')
  },

  _checkImage: function (src, callback) {
    const image = new Image()

    image.src = src
    image.onload = callback(false)
    image.onerror = callback(true)
  }
})
