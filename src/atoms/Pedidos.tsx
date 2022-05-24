import {atom} from 'recoil'

export const pedidosState = atom({
  key: 'pedidosState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
