import React from 'react'
import {useSetRecoilState} from "recoil";
import {pedidosFamily} from "../atoms/Pedidos";
import {marcadoresSelector} from "../atoms/Marcadores";

interface Interface {
  pedido: any
}

export const ListaRotaPedidoItem = ({pedido}: Interface) => {
  const setPedido = useSetRecoilState(pedidosFamily(pedido.id))
  const setMarcadoresSelector = useSetRecoilState(marcadoresSelector)

  setPedido(pedido)
  setMarcadoresSelector(pedido)

  return <div className="card-pedido" key={"cardPedido" + pedido.id}>
    <div className="card-pedido-sequencia">
      {pedido.rota_sequencia}
    </div>
    <div className="card-pedido-conteudo">
      <div className="card-pedido-title">
        <a href="#">#{pedido.id} - {pedido.cliente.nome}</a>
      </div>
      <div className="card-pedido-detalhes">
        {pedido.endereco}, {pedido.numero}, {pedido.complemento}<br/>
        {pedido.bairro} / {pedido.cidade} / {pedido.estado}<br/>
      </div>
    </div>
  </div>

}