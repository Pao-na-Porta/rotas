import React, {useEffect, useState} from "react"

interface RotaIconProps {
  checked: boolean,
  loading: boolean,
  color: string,
  bgcolor: string,
  onChange?: any,
  numero?: any,
  id?: any
}

export function RotaIcon({loading, checked, color, bgcolor, onChange, numero, id}: RotaIconProps) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleClick = (event: any) => {

    setIsChecked(!isChecked)
    if (typeof onChange === 'function') {
      onChange(!isChecked)
    }

  }

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

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