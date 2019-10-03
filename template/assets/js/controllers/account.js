APP.controller.Account = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function() {
    this.modalProfile = $('.av-modal--profile')
    this.vtexModalProfile = $('#editar-perfil-conteudo, #editar-perfil #response-message')
    this.modalAddress = $('.av-modal--address')
    this.vtexModalAddress = $('#address-edit #accountAjaxBusy, #address-edit #form-address')
    this.modalAddressEdit = $('.av-modal--edit-address')
    this.vtexModalAddressEdit = $('#form-address')
    this.modalAddressRemove = $('.av-modal--remove-address')
    this.vtexModalAddressRemove = $('#address-remove #exclude')

    this.btnProfileSubmit = $('#profile-submit')
    this.btnAdressSubmit = $('#form-submit')
  },

  start: function() {
    this.appendProfileContent()
    this.appendAddressContent()
    this.appendAddressEditContent()
    this.appendAddressRemoveContent()
    this.setAddressEditBtns()
    this.setAddressRemoveBtns()
  },

  setAddressEditBtns: function() {
    $('.edit-address-link .address-update, .account-address .account-btn').each(function() {
      $(this).addClass('av-modal-open')
      $(this).attr('data-target', 'av-modal--edit-address')
    })
  },

  setAddressRemoveBtns: function() {
    $('.account-address .delete').each(function() {
      $(this).addClass('av-modal-open')
      $(this).attr('data-target', 'av-modal--remove-address')
    })
  },

  appendProfileContent: function() {
    var _this = this

    _this.modalProfile.find('.av-modal__content').append(_this.vtexModalProfile)
  },

  appendAddressContent: function() {
    var _this = this

    _this.modalAddress.find('.av-modal__content').append(_this.vtexModalAddress)
  },

  appendAddressEditContent: function() {
    var _this = this

    _this.modalAddressEdit.find('.av-modal__content').append(_this.vtexModalAddressEdit)
  },

  appendAddressRemoveContent: function() {
    var _this = this

    _this.modalAddressRemove.find('.av-modal__content').append(_this.vtexModalAddressRemove)
  },

  bind: function() {
    var _this = this

    _this.btnProfileSubmit.on({
      click: function() {
        if ($('#firstName').val().length == 0) {
          $('#firstName').addClass('error-input__account')
        }
        if ($('#lastName').val().length == 0) {
          $('#lastName').addClass('error-input__account')
        }
        if ($('#document').val().length == 0) {
          $('#document').addClass('error-input__account')
        }
        if ($('input[name="gender"]:checked').length == 0) {
          $('.form-personal-data-gender').addClass('error-input__account')
        }
        if ($('#email').val().length == 0) {
          $('#email').addClass('error-input__account')
        }
        if ($('#homePhone').val().length == 0) {
          $('#homePhone').addClass('error-input__account')
        }
      }
    })

    _this.btnAdressSubmit.on({
      click: function() {
        if ($('#addressName').val().length == 0) {
          $('#addressName').addClass('error-input__account')
        }
        if ($('#receiverName').val().length == 0) {
          $('#receiverName').addClass('error-input__account')
        }
        if ($('#postalCode').val().length == 0) {
          $('#postalCode').addClass('error-input__account')
        }
        if ($('#street').val().length == 0) {
          $('#street').addClass('error-input__account')
        }
        if ($('#number').val().length == 0) {
          $('#number').addClass('error-input__account')
        }
        if ($('#number').val().length == 0) {
          $('#number').addClass('error-input__account')
        }
        if ($('#city').val().length == 0) {
          $('#city').addClass('error-input__account')
        }
      }
    })

    $('.modal-footer button').click(function() {
      $(this)
        .parents('.av-modal__modal')
        .find('.av-modal-close')
        .trigger('click')
      console.log('d')
    })
  }
})
