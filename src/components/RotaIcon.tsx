import React, {useState} from "react"
import axios from "axios"
import {useRecoilState} from "recoil"
import {pedidosState} from "../atoms/Pedidos"

interface RotaIconProps {
  checked: boolean,
  color: string,
  bgcolor: string,
  onChange?: any,
  numero?: any,
  id?: any
}

export function RotaIcon({checked, color, bgcolor, onChange, numero, id}: RotaIconProps) {
  const [pedidos, setPedidos] = useRecoilState(pedidosState)
  const [isChecked, setIsChecked] = useState(checked)
  const [loading, setLoading] = useState(false)

  const handleClick = (event: any) => {

    setLoading(true)
    setIsChecked(!checked)

    if (!isChecked) {
      axios.get(`http://127.0.0.1:8000/mapa/v1/rota/${id}/pedidos`)
        .then((response) => {

          response.data.data.forEach((pedido:never) => {
            setPedidos( (pedidos) => [
              ...pedidos, pedido
            ])

          })

          setLoading(false)

        })
        .catch(error => console.log(error))

    }

    if (typeof onChange === 'function') {
      onChange(event)
    }

  }

  let style = {
    color: "white",
    backgroundColor: "black",
    borderColor: "white",
  }

  // remove marcador... bota número
  // mdi mdi-map-marker
  let cl = loading ? 'rota-icon rota-icon-loading' : 'rota-icon '

  if (color) {
    style.color = color;
    style.backgroundColor = bgcolor;
  }

  if (isChecked && loading === false) {
    style.borderColor = "#7bf97b";
  }

  return <span className={cl} style={style} onClick={handleClick}>{numero}</span>
}

export default RotaIcon