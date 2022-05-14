import React, {Component, DOMElement, ReactElement, ReactNode} from 'react'
import {LatLngExpression} from 'leaflet'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useTheme} from '@material-ui/core/styles'

import axios from 'axios'

import {ResizablePanel} from "./components/ResizablePane"
import {DatasDeEntrega} from "./components/DatasDeEntrega"
import {Rotas} from "./components/Rotas"


import './App.css'

function App() {

  const [entregaAt, setEntregaAt] = React.useState(null)

  const positionA: LatLngExpression = [-30.032, -50.800]
  const positionB: LatLngExpression = [-30.032, -50.800]
  const theme = useTheme()

  const markers = [
    {
      id: '1',
      position: positionA,
      pedidos: [
        {
          cliente: 'cliente A',
          visivel: true,
          rota: '1'
        }
      ]
    },
    {
      id: '2',
      position: positionB,
      pedidos: [
        {
          cliente: 'cliente B',
          visivel: true,
          rota: '1'
        }
      ]
    },
  ]

  const a = <div>
    <DatasDeEntrega onChangeCallback={(data:any) => setEntregaAt(entregaAt => data)} />
    <Rotas entregaAt={entregaAt} />
  </div>;

  const b = <MapContainer className='main-container' center={[-30.032, -50.800]} zoom={10} maxZoom={18} scrollWheelZoom={true}>
    <TileLayer
      id='mapbox/streets-v11'
      tileSize={512}
      zoomOffset={-1}
      accessToken='pk.eyJ1IjoiZ3VzdGF2by1qYW50c2NoIiwiYSI6ImNrbWV5dDczYTB3YW8yeW14OHBncTJ1OGwifQ.Q7RrB_5akhYzcqQ62cncUg'
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VzdGF2by1qYW50c2NoIiwiYSI6ImNrbWV5dDczYTB3YW8yeW14OHBncTJ1OGwifQ.Q7RrB_5akhYzcqQ62cncUg'
    />
    {
      markers.map(marker => {
        return (
          <Marker position={marker.position}>
            <div className=''>
              <Popup>
                {marker.pedidos[0].cliente}
              </Popup>
            </div>
          </Marker>
        )
      })
    }
  </MapContainer>

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"/>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css"/>

      <ResizablePanel leftContent={a} rightContent={b}/>
    </div>
  )
}

export default App
