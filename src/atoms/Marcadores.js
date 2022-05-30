import {atom, atomFamily, selector} from 'recoil'
import {pedidosFamily} from "./Pedidos";

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
  get: (pedido) =>  ({get}) => {
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


export const marcadorVisibilitySelector = selector ({
  key: 'marcadorVisibilitySelector',

  get: ({get}) => (marcador) => {

    let visibility = false
    visibility = marcador.pedidos.reduce((prevValue, id) => {
      const prop = get(pedidosFamily(id)).visible
      return (typeof prop === "boolean" ? prop : true) || prevValue
    }, false)

    return visibility
  },
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}

})