import axios from 'axios'
import config from './../config'

export const sendMail = async (data) => {
  try {
    return await axios.post(`${config.apiUrl}/send-mail`, data)
  } catch (error) {
    console.log(error)
  }
}
