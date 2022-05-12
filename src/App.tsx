import {LatLngExpression} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Box} from '@material-ui/system'
import {Grid} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { palette } from '@material-ui/system'
import {bgcolor} from "@material-ui/system"

import './App.css'
import {Colorize} from "@mui/icons-material";

function App() {

  const positionA: LatLngExpression = [51.505, -0.09]
  const positionB: LatLngExpression = [51.500, -0.09]
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

  return (
    <div className="App">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: 1,
          height: '100vh',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"sidebar main main main "`
        }}
      >
        <Box sx={{gridArea: 'sidebar', bgcolor: theme.palette.background.default, height: '100%'}}>


        </Box>
        <Box sx={{gridArea: 'main', bgcolor: 'text.primary', height: '100%'}}>
          <MapContainer className='main-container' center={[-30.032, -50.800]} zoom={10} maxZoom={18} scrollWheelZoom={true}>
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
        </Box>
      </Box>

    </div>
  );
}

export default App;
