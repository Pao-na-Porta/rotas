import React from 'react'
import {DatasDeEntrega} from './DatasDeEntrega'
import {Rotas} from './Rotas'
import {ButtonBar} from './ButtonBar'
import {Status} from './Status'

export const NavigationPanel = () => {

    return  <div>
      <DatasDeEntrega/>
      <ButtonBar />
      <Rotas/>
      <Status />
    </div>
}