import React from 'react'
import {Rota} from './Rota'

type RotasProps = {}
type RotasState = { rotas:any}

export class Rotas extends React.Component<RotasProps, RotasState> {

  constructor(props:any) {
    super(props)
  }

  render () {
    return <div className="tab-row m-5">
      <Rota rota={null} />
    </div>

  }
}