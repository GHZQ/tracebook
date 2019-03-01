import axios from 'axios'
import $ from 'jquery'
import qs from 'qs'
import Storage from './storage-local'

export class RestClient {
  constructor(heads, error) {
    this.service = axios.create({
      timeout: 500000, // 请求超时时间
      withCredentials: true // 允许携带cookie
    })
    this.errorCallBack = function(e) {
      console.debug(e)
    }
    if (error) {
      this.errorCallback = error
    }

    this.headers = []
    if (heads) {
      this.headers = heads
    }
    this.service.interceptors.request.use(config => {
      for (const head of this.headers) {
        config.headers[head.name] = head.value
      }
      const tokenInfo = Storage.readTokenInfo()
      if (tokenInfo) {
        for (const index in tokenInfo) {
          config.headers[index] = tokenInfo[index]
        }
      }
      return config
    })

    $.ajaxSetup({
      timeout: 500000,
      withCredentials: true,
      // 发送请求前触发
      beforeSend: function(xhr) {
        // 可以设置自定义标头
        for (const head of this.headers) {
          xhr.setRequestHeader(head.name, head.value)
        }
      },
      error: function(xhr, status, e) {
        if (this.errorCallback) {
          this.errorCallback(xhr)
        }
      }
    })
  }

  sendAjax(url, holder) {
    if (!holder.type) {
      holder.type = 'post'
    }
    $.ajax({
      url: url,
      type: holder.type,
      async: holder.async,
      data: holder.data,
      success: function(data) {
        if (data.code === 200) {
          holder.success(data)
        } else {
          holder.fail(data)
        }
      }
    })
  }

  post(url, holder) {
    holder.type = 'post'
    if (holder.async && holder.async === false) {
      this.sendAjax(url, holder)
    } else {
      this.service.post(url, holder.data).then(function(resp) {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }

  postForm(url, holder) {
    const formData = qs.stringify(holder.data)
    holder.type = 'post'
    if (holder.async && holder.async === false) {
      holder.data = formData
      this.sendAjax(url, holder)
    } else {
      this.service({
        url: url,
        method: 'post',
        data: formData
      }).then(resp => {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }
  get(url, holder) {
    holder.type = 'get'
    if (holder.async && holder.async === false) {
      this.sendAjax(url, holder)
    } else {
      this.service.get(url).then(function(resp) {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }
  put(url, holder) {
    console.log('PUT->', url, holder)

    holder.type = 'put'
    if (holder.async && holder.async === false) {
      this.sendAjax(url, holder)
    } else {
      this.service.put(url, holder.data).then(function(resp) {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }
  delete(url, holder) {
    holder.type = 'delete'
    if (holder.async && holder.async === false) {
      this.sendAjax(url, holder)
    } else {
      this.service.delete(url, holder.data).then(function(resp) {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }
  patch(url, holder) {
    holder.type = 'patch'
    if (holder.async && holder.async === false) {
      this.sendAjax(url, holder)
    } else {
      this.service.patch(url, holder.data).then(resp => {
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      })
    }
  }

  /**
   * 统一处理成功回应
   */
  handleSuccessResponse(holder, data) {
    var response = {
      body: data
    }
    holder.onResult(true, response)
  }

  /**
   * 统一处理失败回应
   */
  handleFailResponse(holder, xhr, textStatus, errorThrown) {
    var data = {
      xhr: xhr,
      textStatus: textStatus,
      error: errorThrown
    }
    holder.onResult(false, data)
  }
  /**格式化get */
  formatGetUrl(url, data) {
    for (let key in data) {
      if (
        typeof data[key] !== 'undefined' &&
        data[key] !== null &&
        data[key] !== ''
      ) {
        if (url.indexOf('?') == -1) {
          url += '?'
        } else {
          url += '&'
        }
        if (Array.isArray(data[key])) {
          for (let val of data[key]) {
            url += key + '=' + val + '&'
          }
          url = url.substring(0, url.length - 1)
        } else {
          url += key + '=' + data[key]
        }
      }
    }
    return url
  }
}

const request = new RestClient()

export default request
