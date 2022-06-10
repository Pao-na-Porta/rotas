import {atom, atomFamily} from 'recoil'

export const rotasState = atom({
  key: 'rotasState',
  default: [],
});

export const rotasFamily = atomFamily({
      key: 'rotasFamily',
      default: {}
  }
)

export const pedidosRotaFamily = atomFamily({
      key: 'pedidosRotaFamily',
      default: []
  }
)

export const rotaToLoad = atomFamily({
    key: 'rotaToLoad',
    default: false
})

export const rotasToLoad = atom({
  key: 'rotasToLoad',
  default: []
})
