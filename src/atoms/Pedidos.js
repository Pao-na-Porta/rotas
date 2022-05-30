import {atomFamily, atom, selector} from 'recoil'
import {makeKey, marcadoresFamily} from "./Marcadores";

export const pedidosFamily = atomFamily({
  key: 'pedidosFamily',
  default: {}
})

export const pedidosUnloadState = atom({
  key: 'pedidosUnloadState',
  default: []
})

export const pedidosVisibilitySelector = selector ({
  key: 'pedidosVisibilitySelector',

  get: ({get}) => (pedidos) => {

    let visibility = false
    visibility = pedidos.reduce((prevValue, id) => {
      console.log('pedido ' + id)
      if (typeof id === "string") {
        return false || prevValue
      }
      let pedido = get(pedidosFamily(id))
      return pedido.visible || prevValue
    }, false)

    return visibility
  },

  set: ({get, set}, pedidos) =>  {
    console.log('...pedidosVisibilitySelector SET')
      pedidos.map((pp) => {
        const p = get(pedidosFamily(pp.id))
        let pedido = {...p}
        pedido.visible = !pedido.visible
        set(pedidosFamily(pp.id), pedido)

        // UPDATE RELATED MARKER
        const key = makeKey(pedido)
        const marcador = get(marcadoresFamily(key))
        let updated = {...marcador}
        updated.atualizado = Date.now()
        set(marcadoresFamily(key), updated)

      })
  },
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}
})

