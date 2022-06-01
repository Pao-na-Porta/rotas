import React, {useEffect, useState} from 'react'
import {pedidosFamily} from "../../../atoms/Pedidos"
import {useRecoilValue} from "recoil"
import {DivIcon} from "leaflet"
import {Marker, Popup} from "react-leaflet"
import {PopUp} from "./PopUp"
import {rotasFamily} from "../../../atoms/Rotas"
import {marcadoresFamily, marcadorVisibilitySelector, marcadorPedidosMesmaRota} from "../../../atoms/Marcadores"
import {showSequenciaEntrega} from "../../../atoms/GlobalAtoms";
import {CustomIcon} from "./CustomIcon";
import {renderToStaticMarkup} from "react-dom/server";

interface Interface {
  marcadorId: any
}

export const CustomMarker = ({marcadorId}:Interface) => {

  const [opacidade, setOpacidade] = useState(1)
  const marcador = useRecoilValue(marcadoresFamily(marcadorId)) as any
  const primeiroPedido = useRecoilValue(pedidosFamily(marcador.pedidos[0])) as any
  let rota = useRecoilValue(rotasFamily(primeiroPedido.rota_id)) as any
  const getMesmaRota = useRecoilValue(marcadorPedidosMesmaRota) as any
  const sequenciaVisiblity = useRecoilValue(showSequenciaEntrega)

  let visible = true
  let getVisibility = useRecoilValue(marcadorVisibilitySelector)
  useEffect(() => {
    visible = getVisibility(marcador)
    setOpacidade(visible ? 1 : 0)
  }, [marcador])


  let addOns = []
  if (marcador.pedidos.length > 1) {
    if (getMesmaRota(marcador)) {
      addOns.push(<i className="mdi mdi-layers-triple-outline marker-custom-icon"></i>)
    } else {
      addOns.push(<i className="mdi mdi-heart-broken marker-custom-icon"></i>)
    }
  }

  const divMarker = <div>
    <CustomIcon
      marcador={marcador}
      color={rota.cor.background}
      pedido={primeiroPedido}
      classList={['']}/>
    <span className="custom-marker-sequencia" style={{display: (sequenciaVisiblity ? 'block' : 'none')}}>{primeiroPedido.rota_sequencia}</span>
    {addOns.map((e) => {return e})}
  </div>


  let marker = new DivIcon({
    html: renderToStaticMarkup(divMarker),
    className: `marker-custom-transparent`,
    iconSize: [50, 50]
  });

  return <Marker key={'MarkerCustomMarker' + primeiroPedido.id}
                 position={[parseFloat(marcador.latitude), parseFloat(marcador.longitude)]}
                 icon={marker}
                 opacity={opacidade}>
    <Popup key={'MarkerPopupOnMarkerPopup' + marcador.id + primeiroPedido.id} maxWidth={500}>
      <PopUp
        marcador={marcador}
        key={'MarkerPopupOnMarker' + marcador.id + primeiroPedido.id}
      />
    </Popup>
  </Marker>

}