import {atom, selector} from 'recoil'

export const rotasState = atom({
  key: 'rotasState',
  default: [],
});

export const rotasColorState = atom({
  key: 'rotasColorState',
  default: {}
})

export const rotasColorSelector = selector({
  key: 'rotaColorSelector',
  get: (rotaId) =>  ({get}) => {

    if (rotaId.toString() in get(rotasColorState)) {
      return get(rotasColorState)[rotaId]
    }
    return undefined;

  },
  set: ({get, set}, rota) => {
    let current = {...get(rotasColorState)}
    current[rota.id] = rota.cor
    set(rotasColorState, current)
  }
})