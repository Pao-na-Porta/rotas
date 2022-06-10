import React, {useEffect, useState} from 'react'
import {pedidosFamily} from "../../../atoms/Pedidos"
import {useRecoilTransaction_UNSTABLE, useRecoilValue} from "recoil"
import {DivIcon} from "leaflet"
import {Marker, Popup} from "react-leaflet"
import {PopUp} from "./PopUp"
import {rotasFamily} from "../../../atoms/Rotas"
import {
  marcadoresFamily,
  marcadorVisibilitySelector,
  marcadorPedidosMesmaRota,
  marcadorPedidos,
  Marcador
} from "../../../atoms/Marcadores"
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
  const [badge, setBadge] = useState({visible: false, value: '', color: ''})

  let visible = true
  let getVisibility = useRecoilValue(marcadorVisibilitySelector)
  let multipleClass = 'd-none'

  useEffect(() => {
    visible = getVisibility(marcador)
    setOpacidade(visible ? 1 : 0)

    let pedidos = getPedidos(marcador)

    if (marcador.pedidos.length > 1) {
      if (getMesmaRota(marcador)) {
        multipleClass = 'mdi-layers-triple-outline'
      } else {
        multipleClass = 'mdi-heart-broken'
      }
    }

    if (sequenciaVisiblity) {
      let sequencia = pedidos.map((pedido: any) => {
        return pedido.rota_sequencia
      })
      setBadge({visible: true, value: sequencia.join(', '), color: red.A700})
    }

    if (sequenciaVisiblity) {
      let sequencia = pedidos.map((pedido: any) => {
        return pedido.rota_sequencia
      })
      setBadge({visible: true, value: sequencia.join(', '), color: red.A700})
    }

    if (hortaVisiblity) {
      let sequencia = pedidos.map((pedido: any) => {
        return pedido.produtosHorta.reduce((prev:number, produto:any) => {return prev + produto.quantidade},  0)
      })

      let temHorta = sequencia.reduce((prev:number, qtd:number) => {return prev+qtd},0)
      setBadge({visible: (temHorta > 0), value: sequencia.join(', '), color: green.A700})
    }

    if (numeroPedidoVisiblity) {
      setBadge({visible: true, value: marcador.pedidos.join(', '), color: blue.A700})
    }

  }, [marcador, numeroPedidoVisiblity, sequenciaVisiblity, hortaVisiblity])

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
    <i className={"mdi marker-custom-icon" + multipleClass} key="1"></i>
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