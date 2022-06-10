import React from 'react'
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../atoms/Pedidos";

interface Interface {
  pedido: any,
}

export const ListaRotaPedidoItem = ({pedido}: Interface) => {

  const pedidoFam = useRecoilValue(pedidosFamily(pedido.id)) as any

  return <div className="card-pedido" key={"cardPedido" + pedidoFam.id}>
    <div className="card-pedido-sequencia">
      {pedidoFam.rota_sequencia}
    </div>
    <div className="card-pedido-conteudo">
      <div className="card-pedido-title">
        <a href="#">#{pedidoFam.id} - {pedidoFam.cliente.nome}</a>
      </div>
      <div className={"card-pedido-detalhes"}>
        {pedidoFam.endereco}, {pedidoFam.numero}, {pedidoFam.complemento}<br/>
        {pedidoFam.bairro} / {pedidoFam.cidade} / {pedidoFam.estado}<br/>
      </div>
      <div>
        {pedidoFam.visible ? 'VISIVEL' : 'ESCONDIDO'} v{pedidoFam.atualizado}
      </div>
    </div>
  </div>

}