import React, {useState} from 'react'
import {MarkerPopupContent} from "./MarkerPopupContent";
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../atoms/Pedidos";

interface MarkerPopupInterface {
  marcador: any
}

export const MarkerPopup = ({marcador}: MarkerPopupInterface) => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(marcador.pedidos[0]);

  return <div className="popup" key={'markerPopup123' + marcador.id}>
    <ul className="popup-tab-header">
      {marcador.pedidos.map((id: any) => {

        return <li key={`likey-${marcador.id}-${id}`}>
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
        key={'MarkerPopupContent' + id}
        marcadorId={marcador.id}
        pedidoId={id}
        ativo={(pedidoSelecionado === id)}/>
    })}
  </div>

}