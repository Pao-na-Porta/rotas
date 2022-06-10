import React, {useState} from 'react'
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../../../atoms/Pedidos";
import {blue, orange, red} from "material-ui/colors"

interface Interface {
  id: number,
  marcador: any,
  pedidoSelecionado: number,
  onClickHandler: any
}
export const PopupTab = ({id, marcador, pedidoSelecionado, onClickHandler}:Interface) => {

  const pedido = useRecoilValue(pedidosFamily(id)) as any

  return <li key={`likey-${marcador.id}-${id}`}>
  <a href="#"
  className={(pedidoSelecionado === id ? 'ativo' : '')}
  onClick={() => {onClickHandler(id)}}>
    <span style={{color: blue.A400}}>{id}</span>
    <span style={{color: red.A400}}>{pedido.excecao ? '*' : ''}</span>
    <span style={{color: orange.A400}}>r{pedido.rota.numero}</span>
  </a>
  </li>
}