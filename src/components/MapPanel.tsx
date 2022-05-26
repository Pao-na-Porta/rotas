// https://stackoverflow.com/questions/42835692/react-leaflet-add-markers-dynamically

import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {DivIcon, Icon} from "leaflet";
import {marcadoresState} from "../atoms/Marcadores"
import {useRecoilState} from "recoil";
import {MarkerPopup} from "./MarkerPopup";
import {rotasColorSelector, rotasState, rotasColorState} from "../atoms/Rotas";

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

const getCustomIcon = (marcador:any, cor: any) => {
  console.log(marcador.pedidos[0])

  let transportadora_id = marcador.pedidos[0].transportadora_id
  let envio_id = marcador.pedidos[0].transportadora_envio_id
  let color = cor.background
  let rotaClass = ''
  let pedidoClass = ''
  let restricaoClass = ''
  let multipleClass = ''
  let layeredIcon = ''
  let badge = ''
  let roofTopMarker = ''

  let markerHtml = `
            <svg width="24px" height="24px"
            viewBox="0 0 24 24"
            fill="${color}"
            class="marker-custom ${rotaClass} ${pedidoClass} ${restricaoClass} ${multipleClass}"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.6577283,22.7532553 L12,23.3275712 L11.3422717,22.7532553 C5.81130786,17.9237218 3,13.70676 3,10 C3,4.7506636 7.09705254,1 12,1 C16.9029475,1 21,4.7506636 21,10 C21,13.70676 18.1886921,17.9237218 12.6577283,22.7532553 Z M5,10 C5,12.8492324 7.30661202,16.4335466 12,20.6634039 C16.693388,16.4335466 19,12.8492324 19,10 C19,5.8966022 15.8358849,3 12,3 C8.16411512,3 5,5.8966022 5,10 Z M13,13 L11,13 C11,11.2983529 11.6245803,10.5696759 13.0527864,9.85557281 C13.8745803,9.44467588 14,9.29835285 14,8.5 C14,7.556407 13.2771608,7 12,7 C10.8954305,7 10,7.8954305 10,9 L8,9 C8,6.790861 9.790861,5 12,5 C14.2843464,5 16,6.32062807 16,8.5 C16,10.2016471 15.3754197,10.9303241 13.9472136,11.6444272 C13.1254197,12.0553241 13,12.2016471 13,13 Z M12.0003283,15.9983464 C11.4478622,15.9983464 11,15.5506311 11,14.9983464 C11,14.4460616 11.4478622,13.9983464 12.0003283,13.9983464 C12.5527943,13.9983464 13.0006565,14.4460616 13.0006565,14.9983464 C13.0006565,15.5506311 12.5527943,15.9983464 12.0003283,15.9983464 Z"/>
            </svg>
            `

  if (transportadora_id === 1 && envio_id === 1) {
    markerHtml = `<svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="${color}"
                class="marker-custom ${rotaClass} ${pedidoClass} ${restricaoClass} ${multipleClass}">
                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                    ${layeredIcon}
                    ${badge}
                    ${roofTopMarker}
            </svg>`;
  } else if (transportadora_id === 2) {
    // correios
    markerHtml = `<svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="${color}"
                width="24" height="24"
                style="background-color: white; border-radius: 25%;"
                class="marker-custom ${rotaClass} ${pedidoClass} ${restricaoClass} ${multipleClass}">
                <path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 14 6 L 36 6 C 40.430666 6 44 9.5693339 44 14 L 44 36 C 44 40.430666 40.430666 44 36 44 L 14 44 C 9.5693339 44 6 40.430666 6 36 L 6 14 C 6 9.5693339 9.5693339 6 14 6 z M 13 15 C 11.35503 15 10 16.35503 10 18 L 10 32 C 10 33.64497 11.35503 35 13 35 L 37 35 C 38.64497 35 40 33.64497 40 32 L 40 18 C 40 16.35503 38.64497 15 37 15 L 13 15 z M 13.414062 17 L 36.583984 17 L 27.677734 25.892578 C 26.18494 27.382984 23.796834 27.382819 22.304688 25.890625 L 13.414062 17 z M 38 18.412109 L 38 31.587891 L 31.402344 25 L 38 18.412109 z M 12 18.414062 L 18.585938 25 L 12 31.585938 L 12 18.414062 z M 29.988281 26.412109 L 36.585938 33 L 13.414062 33 L 20 26.414062 L 20.890625 27.304688 C 23.146478 29.56054 26.832638 29.562194 29.089844 27.308594 L 29.988281 26.412109 z"/>
                </svg>
            `;
  } else if (envio_id === 5) {
    // em maos
    markerHtml = `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512"
            width="24" height="24"
            fill="${color}"
            class="marker-custom ${rotaClass} ${pedidoClass} ${restricaoClass} ${multipleClass}"
            style="enable-background:new 0 0 512 512;background-color: white; border-radius: 25%;"
             xml:space="preserve">
            <g><g>
            <path d="M459.04,85.675c-21.7-6.332-32.939,15.462-40.67,30.447l-24.695,57.958l15.659-104.422
            c2.244-13.628-0.375-25.677-7.381-33.929c-5.547-6.537-13.389-10.129-22.101-10.129c-16.7,0-31.249,14.549-37.146,37.41
            l-18.586,86.81V42.906c0.358-13.056-3.635-24.559-11.255-32.384C306.174,3.635,297.155,0,286.787,0
            c-29.065,0-36.173,28.45-39.211,40.593c-0.145,0.563-0.222,1.126-0.247,1.698l-4.403,101.265L230.202,50.27
            c-3.985-36.318-25.404-41.737-37.82-41.737c-22.554,0-38.929,17.946-38.903,43.298l17.067,230.4
            c0.35,4.693,4.284,8.243,9.139,7.876c4.702-0.35,8.226-4.437,7.876-9.139L170.52,51.2c0-12.74,6.758-25.6,21.862-25.6
            c4.446,0,17.946,0,20.881,26.752l25.6,187.733c0.597,4.378,4.565,7.603,8.849,7.373c4.412-0.205,7.936-3.746,8.132-8.158
            l8.491-195.388c5.726-22.332,12.851-26.846,22.451-26.846c5.734,0,10.394,1.801,13.85,5.35c4.378,4.497,6.647,11.605,6.417,20.25
            V230.4c0,4.369,3.294,8.021,7.629,8.491c4.395,0.384,8.329-2.441,9.242-6.707L359.32,66.935
            c3.115-12.083,10.675-24.269,20.531-24.269c3.669,0,6.81,1.417,9.088,4.104c3.652,4.309,4.958,11.639,3.541,20.233l-25.6,170.667
            c-0.64,4.25,1.98,8.303,6.11,9.472c4.156,1.169,8.508-0.913,10.18-4.864l50.62-118.895c10.402-20.07,15.061-22.886,20.471-21.325
            c3.849,1.118,8.627,2.517,5.914,15.915c-0.247,1.109-25.062,111.386-33.348,162.261c-2.603,16.009-4.395,35.49-6.46,58.044
            c-4.343,47.275-9.702,105.685-25.66,156.655H203.049C183.405,408.482,115.71,300.023,74.187,258.5
            c-7.424-7.424-20.326-21.615-23.04-24.593c0.077-0.154,0.205-0.384,0.444-0.7l3.695-3.593c9.967-9.958,43.315-9.95,53.282,0
            l32.666,32.666c3.337,3.328,8.738,3.328,12.066,0c3.337-3.336,3.337-8.738,0-12.066l-32.666-32.666
            c-16.64-16.64-60.774-16.64-77.329-0.094l-4.002,3.891c-0.222,0.213-0.427,0.444-0.623,0.683
            c-5.717,6.912-6.212,15.13-1.306,21.999c0.188,0.265,0.393,0.521,0.614,0.759c0.631,0.7,15.539,17.195,24.132,25.779
            c40.977,40.986,108.407,149.598,125.517,233.839c0.461,4.267,4.087,7.595,8.482,7.595h204.8c3.678,0,6.929-2.347,8.09-5.837
            c18.057-54.17,23.765-116.352,28.348-166.323c2.048-22.238,3.814-41.446,6.323-56.858c8.183-50.372,32.896-160.154,33.186-161.434
            C481.722,97.604,469.852,88.832,459.04,85.675z"/>
            </g></g>
            </svg>`;
  } else if (envio_id === 7) {
    // retira na loja
    markerHtml = `
                <?xml version="1.0" encoding="iso-8859-1"?>
                <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 395.17 395.17"
                fill="${color}"
                class="marker-custom ${rotaClass} ${pedidoClass} ${restricaoClass} ${multipleClass}"
                style="enable-background:new 0 0 395.17 395.17;background-color: white; border-radius: 25%; width: 40px; height: 40px;"
                xml:space="preserve">
                xml:space="preserve">
                <path d="M364.204,305.151c12.082-33.33,18.455-70.27,18.455-107.571c0-37.294-6.373-74.23-18.454-107.56
                c2.395-0.087,4.614-1.305,5.956-3.304c1.393-2.076,1.66-4.709,0.712-7.022L355.844,43.01c-1.154-2.817-3.896-4.657-6.94-4.657
                h-9.872c-8.433-13.318-17.902-25.449-28.213-36.076C309.406,0.822,307.465,0,305.436,0H89.745c-2.03,0-3.973,0.823-5.385,2.28
                c-10.3,10.626-19.768,22.756-28.209,36.073h-9.883c-3.044,0-5.786,1.84-6.94,4.657L24.3,79.693c-0.947,2.313-0.68,4.946,0.712,7.022
                c1.342,1.999,3.559,3.216,5.954,3.304c-12.082,33.33-18.455,70.266-18.455,107.561c0,37.301,6.373,74.241,18.455,107.571
                c-2.394,0.088-4.612,1.305-5.954,3.304c-1.393,2.076-1.66,4.708-0.712,7.022l15.027,36.682c1.154,2.817,3.896,4.657,6.94,4.657
                h9.883c8.441,13.317,17.909,25.447,28.209,36.074c1.413,1.458,3.355,2.28,5.385,2.28h215.691c2.028,0,3.97-0.822,5.383-2.277
                c10.311-10.627,19.78-22.758,28.213-36.077h9.872c3.044,0,5.786-1.84,6.94-4.657l15.027-36.682c0.948-2.313,0.681-4.946-0.712-7.022
                C368.818,306.456,366.599,305.238,364.204,305.151z M348.202,305.134h-27.006c8.878-33.287,13.562-70.234,13.562-107.554
                c0-37.314-4.684-74.258-13.562-107.543h27.006c12.73,33.001,19.456,70.059,19.456,107.543
                C367.658,235.071,360.932,272.133,348.202,305.134z M89.515,305.134c-9.23-33.018-14.103-70.065-14.103-107.554
                c0-37.483,4.873-74.526,14.103-107.543h53.433c-3.08,27.859-4.9,57.75-5.414,89.07c-13.415,4.317-23.152,16.913-23.152,31.745
                c0,15.12,10.119,27.913,23.938,31.985c0.905,21.668,2.452,42.566,4.628,62.298H89.515z M147.726,229.196
                c-10.115,0-18.344-8.229-18.344-18.344s8.229-18.344,18.344-18.344s18.344,8.229,18.344,18.344S157.842,229.196,147.726,229.196z
                M158.047,305.134c-2.185-19.426-3.754-40.024-4.679-61.425c15.707-2.689,27.703-16.395,27.703-32.857
                c0-16.746-12.409-30.642-28.514-32.99c0.55-30.929,2.39-60.406,5.481-87.825h79.094c3.712,33.042,5.667,70.061,5.667,107.543
                c0,37.489-1.955,74.511-5.667,107.554H158.047z M252.219,90.036h53.435c9.23,33.018,14.103,70.061,14.103,107.543
                c0,37.489-4.873,74.536-14.103,107.554h-53.435c3.653-33.169,5.58-70.144,5.58-107.554
                C257.799,160.176,255.872,123.204,252.219,90.036z M321.038,38.354h-18.38c-3.856-8.265-8.023-16.067-12.454-23.354h12.023
                C308.907,22.119,315.194,29.944,321.038,38.354z M285.993,38.354H244.56c-1.605-8.292-3.335-16.101-5.174-23.354h33.026
                C277.242,22.145,281.782,29.968,285.993,38.354z M223.893,15c1.91,7.175,3.711,14.989,5.383,23.354h-63.383
                c1.672-8.365,3.473-16.179,5.383-23.354H223.893z M155.783,15c-1.839,7.253-3.569,15.062-5.174,23.354h-41.428
                c4.226-8.409,8.766-16.232,13.584-23.354H155.783z M92.957,15h12.015c-4.422,7.269-8.589,15.071-12.457,23.354H74.15
                C79.997,29.944,86.283,22.119,92.957,15z M51.301,53.354h292.571l8.882,21.683H42.418L51.301,53.354z M46.968,90.036h27.006
                c-8.878,33.286-13.561,70.23-13.561,107.543c0,37.32,4.684,74.268,13.561,107.554H46.968
                c-12.73-33.001-19.456-70.063-19.456-107.554C27.511,160.095,34.238,123.037,46.968,90.036z M74.149,356.816h18.365
                c3.869,8.283,8.036,16.085,12.458,23.354H92.957C86.283,373.051,79.997,365.225,74.149,356.816z M109.181,356.816h41.428
                c1.605,8.292,3.335,16.101,5.174,23.354h-33.018C117.948,373.049,113.407,365.226,109.181,356.816z M171.277,380.17
                c-1.91-7.175-3.711-14.989-5.383-23.354h63.383c-1.672,8.365-3.473,16.179-5.383,23.354H171.277z M239.387,380.17
                c1.839-7.253,3.569-15.062,5.174-23.354h41.433c-4.212,8.386-8.752,16.209-13.581,23.354H239.387z M302.226,380.17h-12.023
                c4.432-7.287,8.598-15.089,12.455-23.354h18.38C315.194,365.225,308.907,373.051,302.226,380.17z M343.872,341.816H51.3
                l-8.882-21.682h310.336L343.872,341.816z"/>
                </svg>`;
  }

  return markerHtml;

}

export const MapPanel = () =>  {
  const [marcadores, setPedidos] = useRecoilState(marcadoresState)
  const [rotas, setRotas] = useRecoilState(rotasState)
  const [getColor, setColor] = useRecoilState(rotasColorSelector)
  const [colorState, setColorState] = useRecoilState(rotasColorState)

  const marker = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 25]
  });

  const fakePedidos =  [
    {
      id: 1,
      latitude: -30.036,
      longitude: -50.803,
      cliente: {nome: "Zé"}
    },    {
      id: 2,
      latitude: -30.038,
      longitude: -50.806,
      cliente: {nome: "JOao"}
    },
  ]

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
      marcadores.map((marcador:any) => {
        let cor:any = colorState[marcador.pedidos[0].rota_id as keyof {}]
                let rota_id = marcador.pedidos[0].rota_id
        let svg = getCustomIcon(marcador, cor)
        const marker = new DivIcon({
          html: svg,
          className: 'marker-custom-transparent',
          iconSize: [50, 50]
        });

        return <Marker key={'marker' + marcador.id.toString()} position={[parseFloat(marcador.latitude), parseFloat(marcador.longitude)]} icon={marker}>
          <Popup>
            <MarkerPopup marcador={marcador}/>
          </Popup>
        </Marker>
      })
    }
  </MapContainer>


}