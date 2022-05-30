import React from 'react'
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../atoms/Pedidos";

interface Interface {
  pedido: any,
  isDragging: boolean,
}

export const ListaRotaPedidoItem = ({pedido, isDragging}: Interface) => {

  const pedidoFam = useRecoilValue(pedidosFamily(pedido.id)) as any

  return <div className="card-pedido" key={"cardPedido" + pedidoFam.id}>
    <div className="card-pedido-sequencia">
      {pedidoFam.rota_sequencia}
    </div>
    <div className="card-pedido-conteudo">
      <div className="card-pedido-title">
        <a href="#">#{pedidoFam.id} - {pedidoFam.cliente.nome}</a>
      </div>
      <div className={"card-pedido-detalhes" + (isDragging ? ' ' : ' ')}>
        {pedidoFam.endereco}, {pedidoFam.numero}, {pedidoFam.complemento}<br/>
        {pedidoFam.bairro} / {pedidoFam.cidade} / {pedidoFam.estado}<br/>
      </div>
      <div>
        {pedidoFam.visible ? 'VISIVEL' : 'ESCONDIDO'} v{pedidoFam.atualizado}
      </div>
    </div>
  </div>

}