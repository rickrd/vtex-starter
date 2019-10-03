APP.component.InstitutionalForm = ClassAvanti.extend({
  init(options) {
    this.setup(options)
    this.bind()
  },

  setup(options) {
    this.options = $.extend(
      {
        $form: $('.contact-form'),

        classSuccess: 'contact-form--success',
        classLoading: 'contact-form--loading',
        classButtonSubmit: 'contact-form__button',
        classError: 'contact-form__input--error',

        onSuccess() {}
      },
      options
    )
  },

  bind() {
    this.validateEmail()
    this.bindSubmit()
  },

  validateEmail() {
    const emailFilter = /^.+@.+\..{2,}$/
    const illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/
    const errorEl = `
                    <label id="email-error" class="newsletter__input--error" for="email" style="display: block;">
                      Por favor, forneça um endereço de email válido.
                    </label>`
    $('#contact-form__input--email').keyup(e => {
      const _this = $(e.currentTarget)
      const sEmail = _this.val()
      if (!emailFilter.test(sEmail) || sEmail.match(illegalChars)) {
        _this.next('label.newsletter__input--error').remove()
        _this.after(errorEl)
        $(`.${this.options.classButtonSubmit}`).attr('disabled', 'disabled')
      } else {
        _this.next('label.newsletter__input--error').remove()
        $(`.${this.options.classButtonSubmit}`).removeAttr('disabled')
      }
    })
  },

  bindSubmit() {
    const { $form, classError, classButtonSubmit } = this.options

    $form
      .on('submit', event => {
        event.preventDefault()
      })
      .validate({
        errorClass: classError,
        errorElement: 'div',
        submitHandler: form => {
          const $form = $(form)
          $form.find(`.${classButtonSubmit}`).attr('disabled', 'disabled')

          this._submit($form)
          return false
        }
      })
  },

  _submit($form) {
    const { classLoading, classSuccess, classButtonSubmit, onSuccess } = this.options

    const url = $form.attr('action')
    const type = $form.attr('method')
    const data = JSON.stringify($form.serializeObject())

    $form.addClass(classLoading)

    $.ajax({
      url,
      type,
      data,
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      }
    }).then(
      () => {
        $form.toggleClass(classSuccess).removeClass(classLoading)

        $form[0].reset()
        $(`.${classButtonSubmit}`).removeAttr('disabled')

        if ($(window).width() > 991) {
          const positionForm = $('.contact-form').offset().top
          window.scrollTo(positionForm, 0)
        } else {
          window.scrollTo(0, 0)
        }

        onSuccess($form)
      },
      error => {
        $form.removeClass(classLoading)
        $(`.${classButtonSubmit}`).removeAttr('disabled')

        throw new Error(error)
      }
    )
  }
})
