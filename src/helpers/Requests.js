import axios from "axios";

export const loadRota = (id, callback) => {

  axios.get(`http://127.0.0.1:8000/mapa/v1/rota/${id}/pedidos`)
    .then((response) => {
      callback(response)
    })
    .catch(error => console.log(error))

}

export const loadRotas = (datasDeEntrega, callback) => {

  axios.get('http://127.0.0.1:8000/mapa/v1/rotas', {params: {entrega_at: datasDeEntrega}})
    .then((response) => {
      if (typeof callback === 'function') {
        callback(response)
      }
    })
    .catch(error => console.log(error))

}