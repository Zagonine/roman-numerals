import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

export function getRomanNumber (number) {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/numbers/roman?number=${number}`).then((res) => {
      return resolve(res.data)
    }).catch((err) => reject(err))
  })
}
