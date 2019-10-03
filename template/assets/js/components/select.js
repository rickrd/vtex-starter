APP.component.Select = ClassAvanti.extend({
  init: function(options) {
    var self = this

    self.options = options

    if (!self.options.className) {
      self.options.className = 'custom-select'
    }

    self.firstOption = 'Select'
    self.titleElement = self.options.className + '__selected'

    self.wrapSelect()
  },

  wrapSelect: function() {
    var self = this

    if (self.options.selector.length) {
      self.options.selector.each(function(i, e) {
        var _this = $(this),
          firstOption = _this.find('option:first-child').text(),
          $parent = _this.parent('div')

        if ($parent.hasClass(self.options.className) || _this.is(':hidden')) {
          return false
        }

        if (firstOption === '') {
          firstOption = self.firstOption
        }

        var $wrap = _this.wrap('<div class="' + self.options.className + '" />').parent()
        $wrap.prepend('<span class="' + self.titleElement + '">' + firstOption + '</span>')

        self.bindChange(_this)
      })
    }
  },

  bindChange: function($element) {
    var self = this

    $element.on('change', function() {
      var _this = $(this),
        val = _this.find('option:selected').text()

      $('.' + self.titleElement).text(val)
    })
  }
})
