import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil";
import {rotasState, rotasToLoad} from "../atoms/Rotas"

export const ButtonBar = () => {
  const setToLoad = useSetRecoilState(rotasToLoad)
  const rotasDisponiveis = useRecoilValue(rotasState)


  const carregaRotas = (e:any) => {
    const rotas = rotasDisponiveis.map((rota:any) => {return rota.id})
    setToLoad(rotas as never[])
  }

  return <div className="ml-5 mb-3 w-100">
    <div className="topcoat-button-bar w-100">

      <div className="topcoat-button-bar__item">
        <button className="topcoat-button-bar__button" onClick={(e) => {carregaRotas(e)}}>
          <i className="mdi mdi-reload ml-5"></i>
        </button>
      </div>

      <div className="topcoat-button-bar__item">
        <button className="topcoat-button-bar__button">
          <i className="mdi mdi-layers-triple-outline ml-5"></i>
        </button>
      </div>

      <div className="topcoat-button-bar__item">
        <button className="topcoat-button-bar__button">
          <i className="mdi mdi-sigma ml-5"></i>
        </button>
      </div>
      <div className="topcoat-button-bar__item">
        <button className="topcoat-button-bar__button">
          <i className="mdi mdi-sprout-outline ml-5"></i>
        </button>
      </div>
      <div className="topcoat-button-bar__item">
        <button className="topcoat-button-bar__button">
          <i className="mdi mdi-sort-numeric-ascending ml-5"></i>
        </button>
      </div>
    </div>
  </div>

}