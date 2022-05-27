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
