import React, {useState} from 'react'
import {PopupContent} from "./PopupContent"
import {PopupTab} from "./PopupTab"

interface MarkerPopupInterface {
  marcador: any
}

export const PopUp = ({marcador}: MarkerPopupInterface) => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(marcador.pedidos[0]);

  const onClickHandler = (id:any) => {
    setPedidoSelecionado(id)
  }

  return <div className="popup" key={'markerPopup123' + marcador.id}>
    <ul className="popup-tab-header">
      {marcador.pedidos.map((id: any) => {

        return <PopupTab key={`likey-${marcador.id}-${id}`}
                         id={id}
                         marcador={marcador}
                         pedidoSelecionado={pedidoSelecionado}
                         onClickHandler={onClickHandler}/>
      })}
    </ul>
    {marcador.pedidos.map((id: any) => {
      return <PopupContent
        key={'MarkerPopupContent' + id}
        marcadorId={marcador.id}
        pedidoId={id}
        ativo={(pedidoSelecionado === id)}/>
    })}
  </div>

}