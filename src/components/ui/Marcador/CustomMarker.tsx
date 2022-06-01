import React, {useEffect, useState} from 'react'
import {pedidosFamily} from "../../../atoms/Pedidos"
import {useRecoilValue} from "recoil"
import {DivIcon} from "leaflet"
import {Marker, Popup} from "react-leaflet"
import {PopUp} from "./PopUp"
import {rotasFamily} from "../../../atoms/Rotas"
import {marcadoresFamily, marcadorVisibilitySelector, marcadorPedidosMesmaRota, marcadorPedidos} from "../../../atoms/Marcadores"
import {showNumeroPedido, showSequenciaEntrega, showTotalizadorHorta} from "../../../atoms/GlobalAtoms";
import {CustomIcon} from "./CustomIcon";
import {renderToStaticMarkup} from "react-dom/server";
import {blue, green, red} from 'material-ui/colors'

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
  const numeroPedidoVisiblity = useRecoilValue(showNumeroPedido)
  const hortaVisiblity = useRecoilValue(showTotalizadorHorta)
  const getPedidos = useRecoilValue(marcadorPedidos)
  const pedidos = getPedidos(marcador)

  let badge = {visible: false, value: '', color: ''}
  let visible = true
  let getVisibility = useRecoilValue(marcadorVisibilitySelector)
  useEffect(() => {
    visible = getVisibility(marcador)
    setOpacidade(visible ? 1 : 0)
  }, [marcador])


  let addOns = []
  if (marcador.pedidos.length > 1) {
    if (getMesmaRota(marcador)) {
      addOns.push(<i className="mdi mdi-layers-triple-outline marker-custom-icon" key="1"></i>)
    } else {
      addOns.push(<i className="mdi mdi-heart-broken marker-custom-icon" key={2}></i>)
    }
  }

  if (sequenciaVisiblity) {
    let sequencia = pedidos.map((pedido: any) => {
      return pedido.rota_sequencia
    })
    badge.visible = true
    badge.value = sequencia.join(', ')
    badge.color = red.A700;
  }

  if (hortaVisiblity) {
    let sequencia = pedidos.map((pedido: any) => {
      return pedido.produtosHorta.reduce((prev:number, produto:any) => {return prev + produto.quantidade},  0)
    })

    let temHorta = sequencia.reduce((prev:number, qtd:number) => {return prev+qtd},0)
    badge.visible = (temHorta > 0)
    badge.value = sequencia.join(', ')
    badge.color = green.A700;
  }

  if (sequenciaVisiblity) {
    let sequencia = pedidos.map((pedido: any) => {
      return pedido.rota_sequencia
    })
    badge.visible = true
    badge.value = sequencia.join(', ')
    badge.color = red.A700;
  }

  if (numeroPedidoVisiblity) {
    badge.visible = true
    badge.value = marcador.pedidos.join(', ')
    badge.color = blue.A700
  }

  const divMarker = <div>
    <CustomIcon
      key={"CustomIcon-"+marcadorId}
      marcador={marcador}
      color={rota.cor.background}
      pedido={primeiroPedido}
      classList={['']}/>
    <span className="custom-marker-sequencia"
          style={{display: (badge.visible ? 'block' : 'none'), backgroundColor: badge.color}}
    >
      {badge.value}
    </span>
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