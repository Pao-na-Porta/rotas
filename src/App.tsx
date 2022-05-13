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

  const a = <div>
    <div>
      <label>Datas de Entrega</label>
      <select id="entregaAt" className="w-100">
        <option value="1">12 e 13/Maio</option>
        <option value="1">12 e 13/Maio</option>
        <option value="1">12 e 13/Maio</option>
      </select>
    </div>


    <div className="tab-row m-5">
      <div className="accordion">
        <div className="accordion-tab">
          <span className="mdi mdi-map-marker rota-label"></span>
          <input type="checkbox" className="accordion-trigger" id="check1"   />
          <label className="acc-lbl" htmlFor="check1">
            Rota 66
            <small>12 pedidos</small>
            <small>Saída 07:00</small>
          </label>
        </div>
        <div className="accordion-content">
          <div className="tab-squared">
            <div className="active" data-target="listao1">Listão</div>
            <div data-target="end1">Endereço Final</div>
            <div data-target="roteirizador1">Roteirizador</div>
          </div>

          <div id="listao1" className="tab-squared-content active">
            <div className="form">
              <div className="form-row">
                <div className="form-field">
                  <label>Motorista</label>
                  <div className="form-input-prep">
                    <span className="mdi mdi-account-tie-hat-outline"></span>
                    <select>
                      <option>Zé das galinhas</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Entregador</label>
                  <div className="form-input-prep">
                                <span className="mdi mdi-human-dolly"></span>
                    <select>
                      <option>Zé das galinhas</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Suporte</label>
                  <div className="form-input-prep">
                                <span
                                  className="mdi mdi-account-heart-outline"></span>
                    <select>
                      <option>Zé das galinhas</option>
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label>Hora</label>
                  <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-clock-check-outline"></span>
                    <input type="text" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Carro</label>
                  <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-car"></span>
                    <input type="text" />
                  </div>
                </div>
                <div className="form-field">
                  <label>Local</label>
                  <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-earth"></span>
                    <input type="text"/>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>



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
  );
}

export default App;
