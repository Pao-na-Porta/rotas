import React, {DOMElement, ReactElement, ReactNode} from 'react'
import {LatLngExpression} from 'leaflet'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import { useTheme } from '@material-ui/core/styles'
import { ResizablePanel } from "./components/ResizablePane";
import './App.css'

function App() {

  const positionA: LatLngExpression = [-30.032, -50.800]
  const positionB: LatLngExpression = [-30.032, -50.800]
  const theme = useTheme();

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

  const a = <div>Este</div>;
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
      <ResizablePanel leftContent={a} rightContent={b}/>
    </div>
  );
}

export default App;
