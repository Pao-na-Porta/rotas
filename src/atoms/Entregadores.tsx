import {atom} from 'recoil'
import axios from "axios";

export const entregadorState = atom({
  key: 'entregadorState', // unique ID (with respect to other atoms/selectors)
  default: [],
});
