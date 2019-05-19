import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const clientId = Math.random().toString(36).substr(2, 9)

export function getRomanNumber (number) {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/numbers/roman?number=${number}&clientId=${clientId}`).then((res) => {
      return resolve(res.data)
    }).catch((err) => reject(err))
  })
}

export function subscribeResponseRomanNumber (callback) {
  const listenResponse = new EventSource(`${API_URL}/numbers/romans/sse/response?clientId=${clientId}`)
  listenResponse.onmessage = (data) => {
    try {
      data = JSON.parse(data.data)
    } catch (e) {
      return callback(new Error('Failed parsing response...'))
    }

    callback(null, data)
  }
}
