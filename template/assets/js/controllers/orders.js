APP.controller.Orders = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function() {},

  start: function() {
    this.changeDOM()
    this.linkSolicitarTroca()
  },

  linkSolicitarTroca: function() {
    const myVar = setInterval(myTimer, 100)

    function myTimer() {
      if ($('.tedRequest a').length != 0 && $('.btn-troca').length == 0) {
        $('.tedRequest a').hide()
        $('<a href="https://acuo.troquefacil.com.br/" target="_blank" class="myo-reorder-btn btn-troca blue hover-blue pa0 bg-transparent bn cf db link tl w5 f6 fw4 flex items-center mb3" style="width: 100%">Solicitar Troca</a>').insertBefore('.myo-reorder-btn')
        clearInterval(myVar)
      }

      if ($('.btn-troca').length == 2) {
        $('.btn-troca')
          .eq(1)
          .remove()
      }
    }
  },

  changeDOM: function() {
    var _this = this

    $("LINK[href='//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css']").remove()
  },

  bind: function() {
    var _this = this
    $('body').on('click', '.myo-details-btn', () => {
      this.linkSolicitarTroca()
    })

    $('body').on('click', '.myo-view-order', () => {
      this.linkSolicitarTroca()
    })
  }
})
