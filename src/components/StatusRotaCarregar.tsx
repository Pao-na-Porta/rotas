import React from 'react'
import {rotaToLoad} from "../atoms/Rotas"
import {useSetRecoilState} from "recoil";

interface Interface {
  id: number,
  restantes: number,
  total: number
}
export const StatusRotaCarregar = ({id, restantes, total}:Interface) => {

  const setRotaACarregar = useSetRecoilState(rotaToLoad(id))
  setRotaACarregar(true)
  return id == 0 ? <div></div> : <div>Carregando rota {id} {(100 - (restantes * 100 / total)).toFixed(2)}%</div>

}