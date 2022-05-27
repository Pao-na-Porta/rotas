import React from 'react'
import {ListaRotaPedidoItem} from "./ListaRotaPedidoItem";

interface Interface {
  pedidos: any[]
}
export const ListaRotaPedidos = ({pedidos}:Interface) => {

    return <div>{pedidos.map((pedido) => {
      return <ListaRotaPedidoItem pedido={pedido} />
    })}</div>

}
