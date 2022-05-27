import React, {useState} from 'react'
import {MarkerPopupContent} from "./MarkerPopupContent";

interface MarkerPopupInterface {
  marcador: any
}

export const MarkerPopup = ({marcador}: MarkerPopupInterface) => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(marcador.pedidos[0]);

  return <div className="popup">
    <ul className="popup-tab-header">
      {marcador.pedidos.map((id: any) => {

        return <li key={`popup-${marcador.id}-${id}`}>
          <a href="#"
             className={(pedidoSelecionado === id ? 'ativo' : '')}
             onClick={() => {
               setPedidoSelecionado(id)
             }}>{id}
          </a>
        </li>
      })}
    </ul>
    {marcador.pedidos.map((id: any) => {
      return <MarkerPopupContent
        marcadorId={marcador.id}
        pedidoId={id}
        ativo={(pedidoSelecionado === id)}/>
    })}
  </div>

}