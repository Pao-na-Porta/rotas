import {atom, atomFamily, selector} from 'recoil'

const makeKey = (pedido) => {
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

    let novoMarcador = {
      id: marcadorId,
      pedidos: [pedido.id],
      latitude: pedido.latitude,
      longitude: pedido.longitude
    }

    if (typeof marcador.pedidos != 'undefined') {
      if (marcador.pedidos.indexOf(pedido.id) < 0) {
        novoMarcador = {
          id: marcadorId,
          pedidos: [...marcador.pedidos, pedido.id],
          latitude: marcador.latitude,
          longitude: marcador.longitude
        }
      }
    } else {
      const newlist = [...marcadores, marcadorId]
      set(marcadoresState, newlist)
    }

    set(marcadoresFamily(marcadorId), novoMarcador)

  }
})