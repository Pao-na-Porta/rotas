import {atom, atomFamily, selector} from 'recoil'

export const showOnlyMultipleMarker = atom({
  key: 'showOnlyMultipleMarker',
  default: false
})