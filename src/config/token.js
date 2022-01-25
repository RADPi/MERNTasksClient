import clienteAxios from './axios'

export default function tokenAuth(token) {
  if (token) {
    clienteAxios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete clienteAxios.defaults.headers.common['x-auth-token']
  }
}