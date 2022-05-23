import React, {useState} from "react"
import axios from "axios"
import {useRecoilState} from "recoil"
import {entregadorState} from "../atoms/Entregadores"
import {datasDeEntregaState} from "../atoms/DatasDeEntrega"


export const Loader = () => {

  const [entregadores, setEntregadores] = useRecoilState(entregadorState)
  const [datasDeEntrega, setDatasDeEntrega] = useRecoilState(datasDeEntregaState)
  const [carregando, setCarregando] = useState(false)

  if (!carregando) {
    setCarregando(true)
    if (entregadores.length === 0) {
      axios.get('http://127.0.0.1:8000/mapa/v1/entregadores')
        .then((response) => {
          setEntregadores(response.data.data)
        })
        .catch(error => console.log(error))
    }


    if (datasDeEntrega.length === 0) {
      axios.get('http://127.0.0.1:8000/mapa/v1/entregas-por-semana')
        .then((response) => {
          setDatasDeEntrega(response.data.data)
        })
        .catch(error => console.log(error))
    }
  }
  return <div></div>
}
