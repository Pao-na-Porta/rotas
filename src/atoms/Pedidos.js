import {atomFamily, atom, selector} from 'recoil'
import {makeKey, marcadoresFamily} from "./Marcadores";

export const pedidosFamily = atomFamily({
  key: 'pedidosFamily',
  default: {}
})

export const pedidosSolo = atom({
  key: 'pedidosSoloFamily',
  default: [],
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}
})

export const pedidosUnloadState = atom({
  key: 'pedidosUnloadState',
  default: []
})

/**
 * TODO: ver como eliminar isso
 * @type {RecoilState<unknown>}
 */
export const pedidosAtualizaSequencia = selector({
  key: 'pedidosUpdate',
  get: ({get}) => {

  },
  set: ({get, set}, pedidos) => {

    pedidos.forEach((pedido, index) => {
      let newPedido = {...pedido}
      newPedido.atualizado = pedido.atualizado + 1
      set(pedidosFamily(pedido.id), {...pedido, sequencia: index + 1})

      let marcadorKey = makeKey(pedido)
      let marcador = get(marcadoresFamily(marcadorKey))
      set(marcadoresFamily(marcadorKey), {...marcador, atualizado: marcador.atualizado + 1})

    })
  }
})
