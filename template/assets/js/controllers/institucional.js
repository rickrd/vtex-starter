APP.controller.Institucional = ClassAvanti.extend({
  init() {
    this.setup()
    this.start()
    this.bind()
  },

  setup() {
    APP.i.InstitutionalForm = new APP.component.InstitutionalForm()

    this.sidebar = $('.sidebar')
    this.sidebarTitle = this.sidebar.find('.sidebar__title')
    this.sidebarContent = this.sidebar.find('.sidebar__content')
  },

  start() {
    this.institucionalSidebar()
  },

  institucionalSidebar() {
    if ($('body').hasClass('institutional')) {
      var urlHash = window.location.href
      var urlClean = urlHash.split('.com.br')[1]
    }

    if (urlClean != null) {
      $('.sidebar__list')
        .find('li a')
        .each(function() {
          $(this).removeClass('selected')
          if ($(this).attr('href') == urlClean) {
            $(this).addClass('selected')
          }
        })
    }
  },

  bind() {
    this._bindSidebarOpen()
  },

  _bindSidebarOpen() {
    this.sidebarTitle.on('click', () => {
      this.sidebarContent.toggleClass('sidebar__content--open')
    })
  }
})
