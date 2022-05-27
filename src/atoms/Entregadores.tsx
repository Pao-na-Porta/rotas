import {atom} from 'recoil'

export const entregadorState = atom({
  key: 'entregadorState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
