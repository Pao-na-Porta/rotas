import React from "react"
import {rotasToLoad, rotasState} from "../atoms/Rotas"
import {useRecoilValue} from "recoil";
import {StatusRotaCarregar} from "./StatusRotaCarregar"

export const Status = () => {
  let rotaId = 0
  const toLoad = useRecoilValue(rotasToLoad)
  const rotasTotal = useRecoilValue(rotasState)

  if (toLoad.length > 0) {
    rotaId = toLoad[0]
  }

  return <div className="status-bar">
    <StatusRotaCarregar total={rotasTotal.length} id={rotaId} restantes={toLoad.length}/>
  </div>

}