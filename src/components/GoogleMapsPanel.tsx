import React from 'react'
import {pedidosState} from "../atoms/Pedidos"
import {useRecoilState} from "recoil"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {GoogleMapComponent} from "./GoogleMapComponent";


import GoogleMapReact from 'google-map-react';
import {Component} from "react";

interface Interface {
  text: string,
  lat: number,
  lng: number,
}
const AnyReactComponent = ({ text, lat, lng }: Interface) => <div data-lat={lat} data-lng={lng}>{text}</div>;

class SimpleMap extends Component<any, any> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBItKhZmlJ1VpBCBN0tvM1BndlkoR0lDrI" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

export const GoogleMapsPanel = () =>  {
  const [pedidos, setPedidos] = useRecoilState(pedidosState)

  return <SimpleMap/>
  // const render = (status: Status) => {
  //   return <h1>{status}</h1>;
  // };
  //
  // return <Wrapper apiKey={"AIzaSyBItKhZmlJ1VpBCBN0tvM1BndlkoR0lDrI"} render={render}>
  //   <GoogleMapComponent />
  // </Wrapper>

}