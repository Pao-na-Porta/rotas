import {atom, atomFamily, selector} from 'recoil'

export const marcadoresState = atom({
  key: 'marcadoresState',
  default: [],
})

export const marcadoresIndexState  = atom({
  key: 'marcadoresStateIndex',
  default: {}
})

const makeKey = (pedido) => {
  return `pos-${pedido.latitude.toFixed(4)}${pedido.longitude.toFixed(4)}`
      .replace('.', '-')
      .replace('.', '-')
}

export const marcadoresFamily = atomFamily({
  key: 'marcadoresFamily',
  default: {}
})

/**
 * OPTIMIZE
 * @type {RecoilState<function(...[*]=)>}
 */
export const marcadoresSelector = selector({
  key: 'marcadoresSelector',
  get: (pedido) =>  ({get}) => {

    const marcadorId = makeKey(pedido)
    const index = get(marcadoresIndexState)[marcadorId]

    if (marcadorId.toString() in get(marcadoresIndexState)) {
      return get(marcadoresState)[index]
    }

    return undefined;
  },
  set: ({get, set}, pedido) => {

    const marcadorId = makeKey(pedido)
    const index = get(marcadoresIndexState)[marcadorId]
    let marcadores = get(marcadoresState)

    if (typeof index == 'undefined') {
      const newlist = [...marcadores,
        {
          id: marcadorId,
          pedidos: [pedido.id],
          latitude: pedido.latitude,
          longitude: pedido.longitude
        }
      ]

      set(marcadoresIndexState, prevState => ({...prevState, [marcadorId]: marcadores.length}))
      set(marcadoresState, newlist)

    } else {

      if (marcadores[index].pedidos.indexOf(pedido.id) < 0) {
        let newList = [...marcadores]

        newList[index] = {
          id: marcadores[index].id,
          pedidos: [...marcadores[index].pedidos, pedido.id],
          latitude: marcadores[index].latitude,
          longitude: marcadores[index].longitude
        }

        set(marcadoresState, newList)
      }
    }

  }
})