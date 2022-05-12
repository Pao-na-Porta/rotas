
import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css'

function App() {

  const positionA: LatLngExpression = [51.505, -0.09]
  const positionB: LatLngExpression = [51.500, -0.09]
  
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

  return (
    <div className="App">
      <MapContainer className='main-container' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          markers.map(marker => {
            return (
              <Marker position={marker.position}>
                <div className='red'>
                  <Popup>
                    {marker.pedidos[0].cliente}
                  </Popup>
                </div>
              </Marker>
            )
          })
        }
      </MapContainer>
    </div>
  );
}

export default App;
