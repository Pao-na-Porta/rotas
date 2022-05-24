import React, {useState} from "react"
import axios from "axios"
import {useRecoilState} from "recoil"
import {entregadorState} from "../atoms/Entregadores"
import {datasDeEntregaState} from "../atoms/DatasDeEntrega"
import {suporteState} from "../atoms/Suporte"

export const Loader = () => {

  const [entregadores, setEntregadores] = useRecoilState(entregadorState)
  const [suporte, setSuporte] = useRecoilState(suporteState)
  const [datasDeEntrega, setDatasDeEntrega] = useRecoilState(datasDeEntregaState)

  const [chamou, setChamou] = useState(false)
  const [carregando1, setCarregando1] = useState(false)
  const [carregando2, setCarregando2] = useState(false)
  const [carregando3, setCarregando3] = useState(false)

  if (!chamou) {

    setChamou(true)
    setCarregando1(true)
    setCarregando2(true)
    setCarregando3(true)

    if (suporte.length === 0) {
      axios.get('http://127.0.0.1:8000/mapa/v1/suporte')
        .then((response) => {
          setSuporte(response.data.data)
          setCarregando1(false)
        })
        .catch(error => console.log(error))
    }

    if (entregadores.length === 0) {
      axios.get('http://127.0.0.1:8000/mapa/v1/entregadores')
        .then((response) => {
          setEntregadores(response.data.data)
          setCarregando2(false)
        })
        .catch(error => console.log(error))
    }

    if (datasDeEntrega.length === 0) {
      axios.get('http://127.0.0.1:8000/mapa/v1/entregas-por-semana')
        .then((response) => {
          setDatasDeEntrega(response.data.data)
          setCarregando3(false)
        })
        .catch(error => console.log(error))
    }

    return <div className="app-loader">
      <div className="app-loader-wheel"></div>
      <div className="app-loader-text"></div>
    </div>

  }

  if (carregando1 || carregando2 || carregando3) {
    return <div className="app-loader">
      <div className="app-loader-wheel"></div>
      <div className="app-loader-text"></div>
    </div>

  }
  return <div></div>

}
