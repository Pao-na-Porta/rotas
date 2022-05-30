import React from "react"
import {rotasToLoad, rotasState} from "../atoms/Rotas"
import {useRecoilValue} from "recoil";
import {StatusRotaCarregar} from "./StatusRotaCarregar"
import {pedidosUnloadState} from "../atoms/Pedidos";
import {StatusDescarregarPedido} from "./StatusDescarregarPedido";

export const Status = () => {
  let rotaId = 0
  let pedidosToUnloadId = 0
  let a = <div></div>
  let b = <div></div>
  const toLoad = useRecoilValue(rotasToLoad)
  const rotasTotal = useRecoilValue(rotasState)
  const pedidosUnload = useRecoilValue(pedidosUnloadState) as any

  if (toLoad.length > 0) {
    rotaId = toLoad[0]
  }

  if(pedidosUnload.length) {
    pedidosToUnloadId = pedidosUnload[0].id
    a = <StatusDescarregarPedido id={pedidosToUnloadId} restantes={pedidosUnload.length - 1}/>
  }

  if(toLoad.length) {
    b = <StatusRotaCarregar total={rotasTotal.length} id={rotaId} restantes={toLoad.length}/>
  }
  return <div className="status-bar">
    {a}
    {b}
  </div>

}