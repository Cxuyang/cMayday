import {HTTP} from '../utils/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        console.log(res)
      }
    })
  }
}

export {ClassicModel}