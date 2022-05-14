import React from 'react'
import {Rota} from './Rota'

type RotasProps = {entregaAt?:any}
type RotasState = { rotas:any, entregaAt?:any}

export class Rotas extends React.Component<RotasProps, RotasState> {

  constructor(props:any) {
    super(props)

    this.setState({entregaAt: this.props.entregaAt})

  }

  render () {
    return <div className="tab-row m-5">
      <Rota rota={null} />
    </div>

  }
}