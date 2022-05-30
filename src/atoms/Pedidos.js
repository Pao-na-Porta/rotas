import {atomFamily, atom} from 'recoil'

export const pedidosFamily = atomFamily({
  key: 'pedidosFamily',
  default: {}
})

export const pedidosSolo = atom({
  key: 'pedidosSoloFamily',
  default: []
})

export const pedidosUnloadState = atom({
  key: 'pedidosUnloadState',
  default: []
})


