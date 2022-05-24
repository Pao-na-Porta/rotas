import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {DivIcon, Icon} from "leaflet";
import {pedidosState} from "../atoms/Pedidos"
import {useRecoilState} from "recoil";

interface InterfacePedido {
  pedido: any
}

function MyMarker({pedido}:InterfacePedido) {


  const marker = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 25]
  });

  const html = new DivIcon({html: "<div style='background-color: red; width: 80px; height: 80px;'>este aqui</div>"})

  return <Marker key={'Marker' + pedido.id} position={[pedido.latitude, pedido.longitude]} icon={marker}>
    <div className=''>
      <Popup>
        essa {pedido.cliente.nome}
      </Popup>
    </div>
  </Marker>

}

export const MapPanel = () =>  {
  const [pedidos, setPedidos] = useRecoilState(pedidosState)

  const marker = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 25]
  });

  return <MapContainer className='main-container'
                center={[-30.032, -50.800]}
                zoom={10}
                maxZoom={18}
                scrollWheelZoom={true}>
    <TileLayer
      id='mapbox/streets-v11'
      tileSize={512}
      zoomOffset={-1}
      accessToken='pk.eyJ1IjoiZ3VzdGF2by1qYW50c2NoIiwiYSI6ImNrbWV5dDczYTB3YW8yeW14OHBncTJ1OGwifQ.Q7RrB_5akhYzcqQ62cncUg'
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VzdGF2by1qYW50c2NoIiwiYSI6ImNrbWV5dDczYTB3YW8yeW14OHBncTJ1OGwifQ.Q7RrB_5akhYzcqQ62cncUg'
    />
    <Marker key={123} position={[-30.032, -50.800]} icon={marker}>
      <Popup>
        essa
      </Popup>
    </Marker>
    {
      pedidos.map((pedido:any) => {

        const marker = new Icon({
          iconUrl: "/marker.svg",
          iconSize: [25, 25]
        });

        return <Marker key={pedido.id} position={[parseFloat(pedido.latitude), parseFloat(pedido.longitude)]} icon={marker}>
          <Popup>
            essa {pedido.cliente.nome}
          </Popup>
        </Marker>
      })
    }
  </MapContainer>


}