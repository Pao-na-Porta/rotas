import {atom, atomFamily, selector} from 'recoil'
import {pedidosFamily, pedidosSolo} from "./Pedidos";
import {showOnlyMultipleMarker} from "./GlobalAtoms";

interface marcadorInterface {
  id:string,
  pedidos: number[],
  latitude: number,
  longitude: number,
  atualizado: number,
  visible: boolean
}

export class Marcador implements marcadorInterface {
  id:string = '';
  pedidos:number[] = [];
  latitude:number = 0;
  longitude:number = 0;
  atualizado:number = 0;
  visible:boolean = true;
}

export const makeKey = (pedido:any) => {
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
  default: new Marcador()
})

export const marcadorUpdateAll = selector({
  key: 'marcadorUpdateAll',
  get: ({get}) => {

  },
  set: ({get, set}, value) => {
    get(marcadoresState).forEach((id) => {
      const m = get(marcadoresFamily(id)) as any
      set(marcadoresFamily(m.id), {...m, atualizado: m.atualizado + 1})
    })
  }
})

export const marcadorUpdateRota = selector({
  key: 'marcadorUpdateRota',
  get: ({get}) => {

  },
  set: ({get, set}, rotaId) => {
    get(marcadoresState).forEach((id) => {
      const m = get(marcadoresFamily(id)) as any
      set(marcadoresFamily(m.id), {...m, atualizado: m.atualizado + 1})
    })
  }
})

export const marcadorVisibilitySelector = selector({
  key: 'marcadorVisibilitySelector',
  get: ({get}) => (marcador:Marcador) => {

    const onlyMultiple = get(showOnlyMultipleMarker)
    const listaSolo = get(pedidosSolo)
    const isSoloOn = (listaSolo.length > 0)
    let visibility = false

    if (onlyMultiple && marcador.pedidos.length < 2) {
      return false
    }

    visibility = marcador.pedidos.reduce((prevValue:boolean, id:number) => {

      let isVisible = (get(pedidosFamily(id)) as any).visible
      isVisible = (isVisible === undefined) ? true : isVisible
      const isSolo = (listaSolo.length > 0 && listaSolo.indexOf(id as never) >= 0)
      const show = (isSoloOn && isSolo) || (!isSoloOn && isVisible)

      return show || prevValue

    }, false)

    return visibility
  },
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}
})

export const marcadorPedidosMesmaRota = selector({
  key: 'marcadorPedidosMesmaRota',
  get: ({get}) => (marcador:marcadorInterface) => {
    let ultimaRota = 0
    let mesmaRota = true
    marcador.pedidos.map((id) => {
      let pedido = get(pedidosFamily(id)) as any
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
  get: ({get}) => (marcador:marcadorInterface) => {
    return marcador.pedidos.map((id) => {
      return get(pedidosFamily(id))
    })
  },
  cachePolicy_UNSTABLE: {eviction: 'most-recent'}
})
