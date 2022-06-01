import React from 'react'
import {IconeNormal} from "./Icons/IconeNormal";
import {IconeCorreios} from "./Icons/IconeCorreios";
import {IconeMaos} from "./Icons/IconeMaos";
import {IconeLoja} from "./Icons/IconeLoja";
import {IconeDesconhecido} from "./Icons/IconeDesconhecido";

interface Interface {
  marcador: any,
  color: string,
  pedido: any,
  classList: string[]
}

export const CustomIcon = ({marcador, color, pedido, classList}: Interface) => {

  let transportadora_id = pedido.transportadora_id
  let envio_id = pedido.transportadora_envio_id

  if (transportadora_id === 1 && envio_id === 1) {
    return <IconeNormal classList={classList} color={color}/>
  } else if (transportadora_id === 2) {
    // correios
    return <IconeCorreios classList={classList} color={color}/>
  } else if (envio_id === 5) {
    // em maos
    return <IconeMaos classList={classList} color={color}/>
  } else if (envio_id === 7) {
    // retira na loja
    return <IconeLoja classList={classList} color={color}/>
  }

  return <IconeDesconhecido classList={classList} color={color}/>

}