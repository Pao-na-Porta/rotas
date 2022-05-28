import React, {useState} from 'react'
import {useRecoilValue} from 'recoil'
import {Rota} from './Rota'
import {rotasState} from "../atoms/Rotas";

export const Rotas = () => {
  const rotas = useRecoilValue(rotasState)
  const [rotasSolo, setRotaSolo] = useState([])
  const [rotasVisiveis, setRotaVisiveis] = useState([])

  return <div className="scroll-bar">
  <div className="tab-row m-5">
    {rotas.map((rota:any) => {
      const key = `rotaComponent${rota.id}`
      return <Rota rota={rota} key={key}/>
    })}
  </div>
  </div>

}