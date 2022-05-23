import {atom} from 'recoil'

export const datasDeEntregaState = atom({
  key: 'datasDeEntregaState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
