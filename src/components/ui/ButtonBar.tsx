import React, {useEffect, useState} from "react"

interface InterfaceButtonBar {
  xkey: any,
  children: JSX.Element[],
}

interface InterfaceButton {
  xkey: any,
  onClick?: any,
  onChange?: any,
  isCheckbox?: boolean,
  isChecked?: boolean,
  radioGroup?: string,
  label: string,
  icon?: string,
  value?: any,
}

interface InterfaceIcon {
  classes: string
}

export const ButtonBar = ({xkey, children}:  InterfaceButtonBar) => {

  return <div className="ml-5 mb-3 w-100" key={xkey}>
    <div className="topcoat-button-bar w-100">
      {children.map((element) => {return element})}
    </div>
  </div>

}

export const Icon  = ({classes}:InterfaceIcon) => {
  return <i className={classes}></i>
}

export const ButtonBarButton = ({xkey, onClick, onChange, isCheckbox, label, isChecked, icon, value}:InterfaceButton) => {

  const [checked, setChecked] = useState(isChecked)

  const handleChange = () => {
    if (typeof onChange === 'function') {
      onChange({checked: !checked, value: value})
    }
  }

  const handleClick = () => {
    setChecked(!checked)
    if (typeof onClick === 'function') {
      onClick({checked: !checked, value: value})
    }
    handleChange()
  }

  let iconElement:any = ""

  if (typeof icon === 'string') {
    iconElement =  <Icon classes={"mdi mdi-" + icon + " ml-5"}/>
  }

  useEffect(()=>{
    setChecked(isChecked)
  },[checked, isChecked])
  return <div className="topcoat-button-bar__item" key={xkey}>
    <button className={"topcoat-button-bar__button" + (isCheckbox && checked ? " topcoat-active" : "")} onClick={handleClick}>
      {iconElement}{label}
    </button>
  </div>

}