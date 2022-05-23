import React from 'react'
import {useRecoilState} from 'recoil'
import {Rota} from './Rota'
import {rotasState} from "../atoms/Rotas";
import {height} from "@material-ui/system";

export const Rotas = () => {
  const [rotas, setRotas] = useRecoilState(rotasState)

  return <div className="scroll-bar">
  <div className="tab-row m-5">
    {rotas.map((rota) => {
      return <Rota rota={rota}/>
    })}
  </div>
  </div>

}