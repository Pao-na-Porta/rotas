import {atom, selector} from 'recoil'

export const pedidosState = atom({
  key: 'pedidosState',
  default: [],
})

export const pedidosIndexState  = atom({
  key: 'pedidosStateIndex',
  default: {}
})

export const pedidosSelector = selector({
  key: 'pedidosSelector',
  get: (pedidoId) =>  ({get}) => {

    console.log('pedidosSelectorGet')
    const index = get(pedidosIndexState)[pedidoId]

    if (pedidoId.toString() in get(pedidosIndexState)) {
      return get(pedidosState)[index]
    }
    return undefined;
  },
  set: ({get, set}, pedido) => {

    const index = get(pedidosIndexState)[pedido.id]
    const pedidos = get(pedidosState)

    console.log(`pedidosSelectorSet: index(${index}) pedidos.length(${pedidos.length} pedido.id(${pedido.id})`)
    if (typeof index == 'undefined') {
      set(pedidosIndexState, prevState => ({...prevState, [pedido.id]: pedidos.length + 1}))
      set(pedidosState, [...pedidos, pedido])
    }

  }
})