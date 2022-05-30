import React, {useEffect} from 'react'
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../atoms/Pedidos";

interface MarkerPopupContentInterface {
  pedidoId: any,
  marcadorId: any,
  ativo: boolean
}

export const MarkerPopupContent= ({pedidoId, marcadorId, ativo}: MarkerPopupContentInterface) => {

      const pedido = useRecoilValue(pedidosFamily(pedidoId)) as any

      return <div
        key={`content-${marcadorId}-${pedidoId}`}
        className={"popup-content " + (ativo ? 'popup-content-ativo' : '')}>
        <p>
          Rota {pedido.rota.numero} / {pedido.rota.nome} / Entrega {pedido.rota_sequencia}<br/>
          {pedido.cliente.nome}<br/>
          {pedido.endereco}, {pedido.numero}, {pedido.complemento}<br/>
          {pedido.bairro}, {pedido.cidade}, {pedido.estado}<br/>
          {pedido.visible ? 'VISIVEL' : 'ESCONDIDO'} v{pedido.atualizado}
        </p>
      </div>

}