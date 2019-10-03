APP.component.Newsletter = ClassAvanti.extend({
  init(options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup(options) {
    this.options = $.extend(
      {
        $scope: $('.footer-newsletter'),
        $form: $('.newsletter__form'),

        classSuccess: 'footer-newsletter--success',
        classLoading: 'footer-newsletter--loading',
        classButtonSubmit: 'newsletter__submit',
        classError: 'newsletter__input--error',

        onSuccess() {},
        errorPlacement(error, $element) {}
      },
      options
    )
  },

  start() {
    // this.validateEmail()
  },

  validateEmail() {
    const emailFilter = /^.+@.+\..{2,}$/
    const illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/
    const errorEl = `
                    <label id="email-error" class="newsletter__input--error" for="email" style="display: block;">
                      Por favor, forneça um endereço de email válido.
                    </label>`
    $('.newsletter__input').keyup(e => {
      const _this = $(e.currentTarget)
      const sEmail = _this.val()
      console.log(sEmail)
      console.log($(`.${this.options.classButtonSubmit}`))
      if (!emailFilter.test(sEmail) || sEmail.match(illegalChars)) {
        $('.newsletter__field')
          .find('label.newsletter__input--error')
          .remove()
        $('.newsletter__field').append(errorEl)
        $(`.${this.options.classButtonSubmit}`).attr('disabled', 'disabled')
      } else {
        $('.newsletter__field')
          .find('label.newsletter__input--error')
          .remove()
        $(`.${this.options.classButtonSubmit}`).removeAttr('disabled')
      }
    })
  },

  bind() {
    this.bindSubmit()
  },

  bindSubmit() {
    this.options.$form
      .on('submit', event => {
        event.preventDefault()
      })
      .validate({
        errorClass: this.options.classError,
        submitHandler: form => {
          this._submit(form)
          return false
        }
      })
  },

  _submit(form) {
    const url = this.options.$form.attr('action')
    const type = this.options.$form.attr('method')
    const data = JSON.stringify(this.options.$form.serializeObject())
    this.options.$scope.addClass(this.options.classLoading)
    $(`.${this.options.classButtonSubmit}`).attr('disabled', 'disabled')
    $.ajax({
      url,
      type,
      data,
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      }
    }).then(
      response => {
        this.options.$scope.toggleClass(this.options.classSuccess).removeClass(this.options.classLoading)

        this.options.onSuccess()
      },
      error => {
        throw new Error(error)

        this.options.$scope.removeClass(this.options.classLoading)
        $(`.${this.options.classButtonSubmit}`).removeAttr('disabled')
      }
    )
  }
})
