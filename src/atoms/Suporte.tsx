import {atom} from 'recoil'

export const suporteState = atom({
  key: 'suporteState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
