APP.controller.Home = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup() {
    this.options = {
      classSlickMainBanner: 'home-banner-full, .home-banner-full-mobile',
      classSlickMiniBanner: 'home-minibanners-top',
      classSlickShelf: 'home-products',
      classBenefits: 'benefits__bar--wrapper'
    }
  },

  start() {
    this.startSlicks()
  },

  startSlicks() {
    this.startSlickBannerFull()
    this.startSlickBanners()
    this.startSlickShelf()
    this.startSlickBenefits()
  },

  startSlickBannerFull() {
    const { classSlickMainBanner } = this.options

    const slickOptions = {
      autoplay: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: true,
      arrows: false
    }

    APP.i.general._registerSlickIntervalBind(() => {
      $(`.${classSlickMainBanner}`).slick(slickOptions)
    })
  },

  startSlickBenefits() {
    const { classBenefits } = this.options

    const slickOptions = {
      autoplay: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      mobileFirst: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: 992,
          settings: 'unslick'
        }
      ]
    }

    APP.i.general._registerSlickIntervalBind(() => {
      $(`.${classBenefits}`).slick(slickOptions)
    })
  },

  startSlickBanners() {
    const { classSlickMiniBanner } = this.options

    const slickOptions = {
      autoplay: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: true,
      arrows: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 992,
          settings: 'unslick'
        }
      ]
    }

    APP.i.general._registerSlickIntervalBind(() => {
      $(`.${classSlickMiniBanner}`)
        .find('.row-banners')
        .slick(slickOptions)
    })
  },

  startSlickShelf() {
    const { classSlickShelf } = this.options

    const slickOptions = {
      autoplay: true,
      slidesToScroll: 2,
      slidesToShow: 2,
      dots: true,
      arrows: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 992,
          settings: 'unslick'
        }
      ]
    }

    APP.i.general._registerSlickIntervalBind(() => {
      $(`.${classSlickShelf} ul`).slick(slickOptions)
    })
  },

  bind() {}
})
