var AvantiEntity = new (function() {
  this.search = function(vtexid, prefix, querystring, range, callback) {
    $.ajax({
      url: '//api.vtexcrm.com.br/' + vtexid + '/dataentities/' + prefix + '/search?' + querystring,
      type: 'GET',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'REST-Range': 'resources=' + range
      },
      success: function(data) {
        if (callback) {
          callback(data)
        }
      },
      error: function(error) {
        if (callback) {
          callback(error)
        }
      }
    })
  }

  this.getItem = function(vtexid, idEnt, prefix, querystring, callback) {
    $.ajax({
      url: '//api.vtexcrm.com.br/' + vtexid + '/dataentities/' + prefix + '/documents/' + idEnt + '?' + querystring,
      type: 'GET',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      },
      success: function(data) {
        if (callback) {
          callback(data)
        }
      },
      error: function(error) {
        if (callback) {
          callback(error)
        }
      }
    })
  }

  this.newItem = function(vtexid, prefix, obj, callback) {
    $.ajax({
      url: '//api.vtexcrm.com.br/' + vtexid + '/dataentities/' + prefix + '/documents',
      type: 'POST',
      data: JSON.stringify(obj),
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      },
      success: function(data) {
        if (callback) {
          callback(data)
        }
      },
      error: function(error) {
        if (callback) {
          callback(error)
        }
      }
    })
  }

  this.updateItem = function(vtexid, prefix, idEnt, obj, callback) {
    console.log(obj)
    $.ajax({
      url: '//api.vtexcrm.com.br/' + vtexid + '/dataentities/' + prefix + '/documents/' + idEnt,
      type: 'PATCH',
      data: JSON.stringify(obj),
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      },
      success: function(data) {
        if (callback) {
          callback(data)
        }
      },
      error: function(error) {
        if (callback) {
          callback(error)
        }
      }
    })
  }
})()
