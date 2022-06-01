import {atom, atomFamily, selector} from 'recoil'
import {pedidosFamily, pedidosSolo} from "./Pedidos";
import {showOnlyMultipleMarker} from "./GlobalAtoms";

export const makeKey = (pedido) => {
  return `pos-${pedido.latitude.toFixed(4)}${pedido.longitude.toFixed(4)}`
    .replace('.', '-')
    .replace('.', '-')
}

export const marcadoresState = atom({
  key: 'marcadoresState',
  default: [],
})

export const marcadoresFamily = atomFamily({
  key: 'marcadoresFamily',
  default: {}
})

export const marcadoresSelector = selector({
  key: 'marcadoresSelector',
  get: (pedido) => ({get}) => {
    const marcadorId = makeKey(pedido)
    return get(marcadoresFamily(marcadorId))
  },
  set: ({get, set}, pedido) => {

    const marcadorId = makeKey(pedido)

    let marcadores = get(marcadoresState)
    let marcador = get(marcadoresFamily(marcadorId))

    // valor default
    let novoMarcador = {
      id: marcadorId,
      pedidos: [pedido.id],
      latitude: pedido.latitude,
      longitude: pedido.longitude,
      atualizado: 0,
      visible: true
    }

    if (typeof marcador.pedidos != 'undefined') {
      // atualiza marcador existente
      if (marcador.pedidos.indexOf(pedido.id) < 0) {
        novoMarcador = {
          id: marcadorId,
          pedidos: [...marcador.pedidos, pedido.id],
          latitude: marcador.latitude,
          longitude: marcador.longitude,
          atualizado: marcador.atualizado++,
          visible: true
        }
      }
    } else {
      // marcador novo, adiciona a lista
      const newlist = [...marcadores, marcadorId]
      set(marcadoresState, newlist)
    }

    set(marcadoresFamily(marcadorId), novoMarcador)

  }
})

export const marcadorUpdateAll = selector({
  key: 'marcadorUpdateAll',
  get: ({get}) => {

  },
  set: ({get, set}, value) => {
    get(marcadoresState).forEach((id) => {
      const m = get(marcadoresFamily(id))
      set(marcadoresFamily(m.id), {...m, atualizado: m.atualizado + 1})
    })
  }
})

export const marcadorVisibilitySelector = selector({
  key: 'marcadorVisibilitySelector',
  get: ({get}) => (marcador) => {

    const onlyMultiple = get(showOnlyMultipleMarker)
    const listaSolo = get(pedidosSolo)
    const isSoloOn = (listaSolo.length > 0)
    let visibility = false

    if (onlyMultiple && marcador.pedidos.length < 2) {
      return false
    }

    visibility = marcador.pedidos.reduce((prevValue, id) => {

      let isVisible = get(pedidosFamily(id)).visible
      isVisible = (isVisible === undefined) ? true : isVisible
      const isSolo = (listaSolo.length > 0 && listaSolo.indexOf(id) >= 0)
      const show = (isSoloOn && isSolo) || (!isSoloOn && isVisible)

      return show || prevValue

    }, false)

    return visibility
  },
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}
})

export const marcadorPedidosMesmaRota = selector({
  key: 'marcadorPedidosMesmaRota',
  get: ({get}) => (marcador) => {
    let ultimaRota = 0
    let mesmaRota = true
    marcador.pedidos.map((id) => {
      let pedido = get(pedidosFamily(id))
      if (ultimaRota !== 0) {
        mesmaRota = mesmaRota && (ultimaRota === pedido.rota_id)
      }
      ultimaRota = pedido.rota_id
    })

    return mesmaRota
  }
})

export const marcadorPedidos = selector({
  key: 'marcadorPedidos',
  get: ({get}) => (marcador) => {
    return marcador.pedidos.map((id) => {
      return get(pedidosFamily(id))
    })
  }
})

