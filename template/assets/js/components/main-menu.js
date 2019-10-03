APP.component.Menu = ClassAvanti.extend({
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
        helpers: APP.i.Helpers,
        $menu: $('.menu__list'),
        categoryLevel: 1
      },
      options
    )

    this.categoryTree = null
  },

  start() {
    this.getCategoryTree()
  },

  getCategoryTree() {
    const { categoryLevel, $menu } = this.options

    let deptsArr = []
    $('.menu__list')
      .find('.menu__item')
      .not('.menu__item--all')
      .not('.menu__item--outlet')
      .each((i, e) => {
        const _this = $(e)
        // const depts = _this.find('> a').text().trim()
        const depts = _this.find('.header-main-menu-drop-list').data('name')
        deptsArr.push(depts)
      })

    let itemArr = []

    $.ajax({
      url: `/api/catalog_system/pub/category/tree/${categoryLevel}/`,
      type: 'GET',
      success: data => {
        data.map(item => {
          const elementAll = `<li class="submenu__item" data-cat="menu__item--${item.url.split('/').slice(-1)}">
            <li class="submenu__item">
              <a href="${item.url}" class="submenu__link">${item.name}</a>
            </li>
            `
          $('.menu__item--all')
            .find('.menu__submenu')
            .append(elementAll)
          // console.log(item.url.split('/').slice(-1))
        })

        deptsArr.filter(dept => {
          // console.log(dept)
          data.map(item => {
            if (item.url.split('/').slice(-1) == dept) {
              itemArr.push(item)
              const name = item.url.split('/').slice(-1)
              // console.log(item)
              const element = `<ul class="submenu__list" data-cat="menu__item--${item.url.split('/').slice(-1)}">
                                <li class="submenu__item">
                                  <a href="${item.url}" class="submenu__link av-hidden-md av-hidden-lg">VER TODOS</a>
                                </li>
                                ${item.children
                                  .map(
                                    categories => `
                                <li class="submenu__item">
                                  <a href="${categories.url}" class="submenu__link ${categories.children.length > 0 ? 'menu__link-submenu' : ''}">${categories.name}</a>

                                  <ul class="submenu__list--level">
                                    ${categories.children
                                      .map(
                                        item => `
                                      <li class="submenu__item--level">
                                        <a href="${item.url}" class="submenu__link--level">${item.name}</a>
                                      </li>
                                    `
                                      )
                                      .join('')}
                                  </ul>
                                </li>
                              `
                                  )
                                  .join('')}
                              </ul>`
              $menu.find(`[rel="${name}"]`).append(element)
            }
          })
        })
      }
    })
  },

  bind() {}
})
