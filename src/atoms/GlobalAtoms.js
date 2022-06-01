import {atom, atomFamily, selector} from 'recoil'

export const showOnlyMultipleMarker = atom({
  key: 'showOnlyMultipleMarker',
  default: false
})

export const showSequenciaEntrega = atom({
  key: 'showSequenciaEntrega',
  default: false
})

export const showNumeroPedido = atom({
  key: 'showNumeroPedido',
  default: false
})

export const showTotalizadorHorta = atom({
  key: 'showTotalizadorHorta',
  default: false
})