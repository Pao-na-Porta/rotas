import React, {useEffect} from 'react'
import {rotaToLoad} from "../atoms/Rotas"
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {pedidosFamily, pedidosUnloadState} from "../atoms/Pedidos";
import {marcadoresFamily, marcadoresState, makeKey} from "../atoms/Marcadores";

interface Interface {
  id: number,
  restantes: number,
}

/**
 * Descarrega pedidos de uma rota...
 *
 * @param id
 * @param restantes
 * @constructor
 */
export const StatusDescarregarPedido = ({id, restantes}: Interface) => {

  const pedido = useRecoilValue(pedidosFamily(id)) as any
  const resetPedido = useResetRecoilState(pedidosFamily(id))
  const key = makeKey(pedido)
  const [marcador, setMarcador] = useRecoilState(marcadoresFamily(key)) as any
  const resetMarcadorFamily = useResetRecoilState(marcadoresFamily(key))
  const [marcadoresList, setMarcadoresList] = useRecoilState(marcadoresState)
  const [pedidosUnload, setPedidosUnload] = useRecoilState(pedidosUnloadState) as any

  useEffect(() => {
    if (marcador.pedidos.length > 1) {
      // remove pedido da lista
      let newMarcador = {...marcador}
      newMarcador.pedidos = newMarcador.pedidos.filter((value:number) => {return value != id})
      // atualiza marcador
      setMarcador(newMarcador)

    } else {
      // remove marcador da lista
      let newList = [...marcadoresList]
      newList = newList.filter((value:any) => {return value != marcador.id})
      setMarcadoresList(newList)
      resetMarcadorFamily()
    }

    let newUnload = pedidosUnload.filter((value:any) => {return value.id != id})
    setPedidosUnload(newUnload)
    // remove pedido da familia
    resetPedido()
  }, [id])

  return id > 0 ? <div></div> : <div>Descarregando pedidos {restantes}</div>

}