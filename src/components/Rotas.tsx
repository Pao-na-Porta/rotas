import React from 'react'
import {Rota} from './Rota'

type RotasProps = {rotas?:any, entregaAt?:any}
type RotasState = {rotas:any, entregaAt?:any}

export class Rotas extends React.Component<RotasProps, RotasState> {

  constructor(props:any) {
    super(props)

    this.state = {entregaAt: this.props.entregaAt, rotas: []}

  }

  render () {
    return <div className="tab-row m-5">
      <Rota rota={null} />
    </div>

  }
}