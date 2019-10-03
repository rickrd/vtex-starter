APP.controller.Product = ClassAvanti.extend({
  init() {
    this.setup()
    this.start()
    this.bind()
  },

  setup() {
    this.isProductAvailable = skuJson.available
    this.productBuyContent = $('.product-buy-content')
    this.buyButton = $('.buy-button')
    this.productPrice = $('.product-price')
    this.priceListPrice = this.productPrice.find('.price-list-price')
    this.productShipping = $('.product-shipping')
    this.productThumbs = $('.apresentacao #show .thumbs')
    this.similarsList = $('.product-similar ul')
    this.slickSimilars = $('.product-related .main-shelf > ul')
    this.mainImg = $('#include')
    this.productSku = $('.product-sku')
    APP.i.modal = new APP.component.Modal()
  },

  start() {
    this.searchThumbs()
    this.setNotifyMe()
    this.startShipping()
    this.setSimilar()
    this.startSlickSimilars()
    this.changePrice()
    this.startZoomImgs()
  },

  searchThumbs() {
    if ($(window).width > 992) {
      const thumbsImages = setInterval(() => {
        const $thumbs = $('.thumbs')
        if ($('.thumbs li').length > 0) {
          clearInterval(thumbsImages)
          if ($thumbs.hasClass('slick-initialized')) {
            $thumbs.slick('unslick')
          }
          $('#show').removeClass('displayed')
          $thumbs.removeClass('displayed')
          this.startSlickThumbs()
        }
      }, 200)
    } else {
      const thumbsImages = setInterval(() => {
        const $thumbs = $('.thumbs')
        const $thumbsItem = $thumbs.children('li').find('img')

        if ($thumbsItem.length > 0) {
          clearInterval(thumbsImages)
          $('#show').removeClass('displayed')
          $thumbs.removeClass('displayed')
          $thumbs.children('li').each((i, e) => {
            const _this = $(e)
            const imgSrc = _this
              .find('img')
              .attr('src')
              .replace(/-55-55/g, '-800-800')
            _this.find('img').attr('src', imgSrc)
          })
          const thumbsHTML = $thumbs.html()

          if ($thumbs.hasClass('slick-initialized')) {
            $thumbs.slick('unslick')
          }

          setTimeout(() => {
            $thumbs.html(thumbsHTML)
            this.startSlickThumbs()
            clickThumbs() // eslint-disable-line no-undef
          }, 200)
        }
      }, 100)
    }
  },

  startSlickThumbs() {
    const thumbsLength = this.productThumbs.find('> li')
    this.productThumbs.removeClass('slick-initialized')
    this.productThumbs.removeClass('slick-slider')
    this.productThumbs.removeClass('slick-vertical')
    if (thumbsLength.length > 1) {
      clickThumbs()
      this.productThumbs.slick({
        autoplay: false,
        infinite: false,
        vertical: true,
        swipe: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
              vertical: false,
              swipe: true
            }
          }
        ]
      })
    }
    this.changeImgSize()
    $('#show').addClass('displayed')
    $('.thumbs').addClass('displayed')
  },

  changeImgSize() {
    const intervalImg = setInterval(() => {
      if ($('#image-main').length > 0) {
        clearInterval(intervalImg)
        const imgSrc = $('#image-main')
          .attr('src')
          .replace('-292-292', '-500-500')
        $('#image-main').attr('src', imgSrc)
        const intervalVisible = setInterval(() => {
          if ($('#image-main').attr('src') === imgSrc) {
            clearInterval(intervalVisible)
            $('#image-main').addClass('displayed')
          }
        }, 200)
      }
    }, 100)
  },

  setNotifyMe() {
    if (!this.isProductAvailable) {
      $('.portal-notify-me-ref').addClass('portal-notify-me-ref--displayed')
      this.productShipping.hide()

      $('.skuList').each((i, e) => {
        const _this = $(e)
        _this.find('input:first-child, label:first-child').click()
      })
    } else {
      $('.portal-notify-me-ref').removeClass('portal-notify-me-ref--displayed')
      this.productShipping.show()
    }

    $('.sku-notifyme-button-ok').attr('value', 'Enviar')
    $('.notifyme-title').html('Produto indisponível')
    $('.notifyme-form p').html('Esse produto encontra-se indisponível. </br> Preencha o formulário abaixo e seja avisado quando o produto retornar ao nosso estoque:')
    $('.sku-notifyme-form')
      .find('#notifymeClientName')
      .val('Cliente Interessado')
    $('.sku-notifyme-form')
      .find('#notifymeClientEmail')
      .attr('placeholder', 'Digite seu e-mail')
  },

  startShipping() {
    ShippingValue() // eslint-disable-line no-undef, new-cap
    const changeShippingText = setInterval(() => {
      if ($('.product-shipping label.prefixo').length > 0) {
        clearInterval(changeShippingText)
        $('.product-shipping label.prefixo')[0].childNodes[0].remove()
        $('.product-shipping label.prefixo')
          .find('input[type=text]')
          .attr('placeholder', 'Digite seu CEP')
      }
    }, 200)
  },

  setSimilar() {
    const url = window.location

    this.similarsList.find('li').each((i, el) => {
      const _this = $(el)
      const elHref = _this.find('a').attr('href')

      if (elHref == url) {
        _this.addClass('selected')
      }
    })
  },

  startSlickSimilars() {
    this.slickSimilars.slick({
      dots: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplaySpeed: 5000,
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
          }
        }
      ]
    })
  },

  bind() {
    this._bindBuyButton()
    this._bindSkuSelection()
    // this._bindResizeSlick()
    this._bindChangeTabs()
    this._bindChangeThumbs()
    this._bindGetProduct()
  },

  _bindBuyButton() {
    this.buyButton.on('click', event => {
      let hrefBuyButton = this.buyButton.attr('href')

      if (hrefBuyButton.indexOf('alert') > -1) {
        return true
      }

      event.preventDefault()

      APP.i.Minicart.addCart(hrefBuyButton, () => {
        APP.i.Minicart.openCart()
      })
    })
  },

  _bindSkuSelection() {
    $('input.skuselector-specification-label + label').on('click', event => {
      const _this = $(event.currentTarget)

      $('#show').removeClass('displayed')
      $('#image-main').removeClass('displayed')
      $('.thumbs').removeClass('displayed')

      if (_this.hasClass('sku-picked')) {
        return
      }

      this.searchThumbs()
      this.setAvailableConditions(_this)
      this.changePrice()
      this.startZoomImgs()
    })
  },

  _bindChangeThumbs() {
    $('body').on('click', '#botaoZoom', () => {
      $('#image-main').removeClass('displayed')
      this.changeImgSize()
      this.startZoomImgs()
    })
  },

  _bindChangeTabs() {
    $('.product-details-tab').each((i, e) => {
      const _this = $(e)
      _this.find('h2').on('click', e => {
        const _this = $(e.currentTarget)
        const target = _this.attr('rel')
        _this
          .parents('.product-details-tabs')
          .find('h2')
          .removeClass('selected')
        _this.addClass('selected')
        $('.product-details')
          .find('.product-details-contents div')
          .removeClass('selected')
        $('.product-details')
          .find(`.${target}`)
          .addClass('selected')
      })
    })
  },

  setAvailableConditions(element) {
    if (element.hasClass('item_unavailable') && element.hasClass('disabled')) {
      this.productBuyContent.addClass('product-buy-content--notify-me')
      this.productPrice.removeClass('product-price--displayed')
      this.productShipping.hide()
    } else {
      this.productBuyContent.removeClass('product-buy-content--notify-me')
      this.productPrice.addClass('product-price--displayed')
      this.productShipping.show()
    }
  },

  _bindResizeSlick() {
    var intervalResize = setInterval(() => {
      if ($._data(window, 'events').resize[0].namespace === '') {
        clearInterval(intervalResize)

        $(window).on('resize orientationchange', () => {
          this.productThumbs.slick('resize')
          this.slickSimilars.slick('resize')
        })
      }
    }, 100)
  },

  changePrice() {
    if (skuJson.skus[0].listPrice > 0) {
      $('.descricao-preco').addClass('hasListPrice')
      const intervalListPrice = setInterval(() => {
        if ($('.product-buy-content').find('.valor-de').length > 0) {
          clearInterval(intervalListPrice)
          const valorDe = $('.valor-de')
            .html()
            .replace('De: ', '')
          $('.valor-de').html(valorDe)
        }
      }, 100)
    }

    const intervalBestPrice = setInterval(() => {
      if ($('.product-buy-content').find('.valor-por').length > 0) {
        clearInterval(intervalBestPrice)
        const valorPor = $('.valor-por')
          .html()
          .replace('Por: ', '')
        $('.valor-por').html(valorPor)
        $('.productPrice').show()
      }
    }, 100)

    const intervalInstallments = setInterval(() => {
      if ($('.skuBestInstallmentValue')) {
        clearInterval(intervalInstallments)
        const installmentValue = $('.skuBestInstallmentValue').html()
        const installmentNumber = $('.skuBestInstallmentNumber').html()
        $('.valor-dividido').html(`${installmentNumber} de <b>${installmentValue}</b> iguais`)
      }
    }, 100)
  },

  _bindGetProduct() {
    const productUrl = window.location.pathname
    const apiPath = '/api/catalog_system/pub/products/search'
    const url = `${apiPath}${productUrl}`
    const type = 'GET'

    $.ajax({
      url,
      crossDomain: true,
      type
    }).then(
      data => {
        data.filter(item => {
          if (item['Lote Multiplo']) {
            const bestPrice = $('.price-best-price strong').html()
            const tipoLote = item['Lote Multiplo']
            const unidade = item.items[0].measurementUnit
            const multiplicador = item.items[0].unitMultiplier
            $('.price-best-price strong').html(`${bestPrice}/${unidade}`)

            $('.calculadora-qtd--input')
              .val(multiplicador)
              .attr('data-multiplier', multiplicador)
              .attr('data-lote', tipoLote)
              .attr('data-unidade', unidade)
            $('.calculadora-lote-unidade').text(`${multiplicador} ${unidade}`)
            $('.calculadora-lote-tipo').text(`1 ${tipoLote}`)

            $('.calculadora-minimo--text__value').html(`${multiplicador} ${unidade} (1 ${tipoLote})`)
            $('.calculadora-produto').addClass('displayed')
            this._bindQtdControls()
            this._bindCalculatorPopup(unidade, multiplicador, tipoLote)
          }
        })
      },
      error => {
        throw new Error(error)
      }
    )
  },

  _bindQtdControls() {
    const qtdBtn = $('.calculadora-qtd-btn')

    qtdBtn.on('click', e => {
      const qtdInput = $('.calculadora-qtd--input')
      const qtdInputValue = parseInt(qtdInput.val())
      const multiplicador = qtdInput.data('multiplier')
      const tipoLote = qtdInput.data('lote')
      const unidade = qtdInput.data('unidade')

      setTimeout(() => {
        const _this = $(e.currentTarget)

        if (qtdInputValue >= multiplicador) {
          _this.hasClass('calculadora-qtd--less') ? qtdInput.val(qtdInputValue - multiplicador) : qtdInput.val(qtdInputValue + multiplicador)
          if (qtdInput.val() < multiplicador) {
            qtdInput.val(multiplicador)
          }

          const divisor = parseInt(qtdInput.val()) / multiplicador
          const qtdValue = qtdInput.val()

          $('.calculadora-lote-unidade').text(`${qtdValue} ${unidade}`)

          divisor > 1 ? $('.calculadora-lote-tipo').text(`${divisor} ${tipoLote}s`) : $('.calculadora-lote-tipo').text(`${divisor} ${tipoLote}`)

          let buyButtonUrl = $('.buy-button').attr('href')
          const buyButtonQty = buyButtonUrl.split('&qty=')[1].split('&')[0]
          buyButtonUrl = buyButtonUrl.replace(`&qty=${buyButtonQty}`, `&qty=${divisor}`)

          $('.buy-button').attr('href', buyButtonUrl)
        }
      }, 100)
    })
  },

  _bindCalculatorPopup(unidade, multiplicador, tipoLote) {
    multiplicador = parseInt(multiplicador)

    $('.calculadora-minimo-step1 .calculadora-minimo--text1 b').html(unidade)
    $('.calculadora-minimo-step1 .calculadora-minimo--text2 b').html(`${multiplicador} ${unidade} (1 ${tipoLote})`)

    $('.calculadora-minimo--icon, .calculadora-minimo--text, .calculadora-minimo--popup__close').on('click', () => {
      $('.calculadora-minimo--popup').toggleClass('displayed')
      $('.calculadora-minimo-step2').removeClass('displayed')
    })

    $('.calculadora-minimo--input').on('keyup', e => {
      const _this = $(e.currentTarget)
      const valRep = _this.val().replace(/,/g, '.')
      _this.val(valRep)
    })

    $('.calculadora-btn-step1').on('click', () => {
      const valInput = parseFloat($('.calculadora-minimo-step1 .calculadora-minimo--input').val())
      const calcVal = Math.ceil(valInput / multiplicador) * multiplicador
      const divisor = calcVal / multiplicador

      $('.calculadora-minimo-step2').addClass('displayed')
      $('.calculadora-minimo-step2 .calculadora-minimo--text1 b').html(`${valInput} ${unidade}`)
      divisor > 1 ? $('.calculadora-minimo-step2 .calculadora-minimo--text2').text(`${calcVal} ${unidade} (Totalizando ${divisor} ${tipoLote}s)`) : $('.calculadora-minimo-step2 .calculadora-minimo--text2').text(`${calcVal} ${unidade} (Totalizando ${divisor} ${tipoLote})`)

      $('.calculadora-btn-step2').on('click', () => {
        $('.calculadora-minimo--popup, .calculadora-minimo-step2').removeClass('displayed')
        $('.calculadora-qtd--input').val(calcVal)
        $('.calculadora-lote-unidade').text(`${calcVal} ${unidade}`)
        divisor > 1 ? $('.calculadora-lote-tipo').text(`${divisor} ${tipoLote}s`) : $('.calculadora-lote-tipo').text(`${divisor} ${tipoLote}`)
        let buyButtonUrl = $('.buy-button').attr('href')
        const buyButtonQty = buyButtonUrl.split('&qty=')[1].split('&')[0]
        buyButtonUrl = buyButtonUrl.replace(`&qty=${buyButtonQty}`, `&qty=${divisor}`)

        $('.buy-button').attr('href', buyButtonUrl)
      })
    })
  },

  startZoomImgs() {
    jqzoom = () => {}

    const intervalZoom = setInterval(() => {
      if ($('.image-zoom').length > 0) {
        clearInterval(intervalZoom)
        const srcImgSmall = $('#image-main').attr('src')
        const srcImgLarge = $('.image-zoom').attr('href')
        const newImg = `<figure class="zoo-item" data-zoo-image="${srcImgLarge}" data-zoo-scale="2"></figure>`
        $('.image-zoom').html(newImg)
        $('.zoo-item').ZooMove()
      }
    }, 100)
  }
})
