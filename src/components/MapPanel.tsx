/**
 * https://stackoverflow.com/questions/42835692/react-leaflet-add-markers-dynamically
 */
import React from 'react'
import {MapContainer, TileLayer} from "react-leaflet"
import {marcadoresState} from "../atoms/Marcadores"
import {useRecoilValue} from "recoil"
import {MarkerCustom} from "./MarkerCustom"

export const MapPanel = () =>  {

  const marcadores = useRecoilValue(marcadoresState)

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
    {marcadores.map((id:any) => {
        return <MarkerCustom marcadorId={id} key={'MarkerCustom-' + id}/>
    })}
  </MapContainer>

}