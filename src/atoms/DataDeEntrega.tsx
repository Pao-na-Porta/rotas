import {atom} from 'recoil'

export const dataDeEntregaState = atom({
  key: 'dataDeEntregaState', // unique ID (with respect to other atoms/selectors)
  default: '',
});
