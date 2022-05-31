import React from 'react'
import {DatasDeEntrega} from './DatasDeEntrega'
import {Rotas} from './Rotas'
import {GlobalToolbar} from './GlobalToolbar'
import {Status} from './Status'

export const NavigationPanel = () => {

    return  <div>
      <DatasDeEntrega/>
      <GlobalToolbar />
      <Rotas/>
      <Status />
    </div>
}