import axios from "axios";

export const loadRota = (id, callback) => {

  axios.get(`http://127.0.0.1:8000/mapa/v1/rota/${id}/pedidos`)
    .then((response) => {
      callback(response)
    })
    .catch(error => console.log(error))

}