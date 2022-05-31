import React, {useState} from "react"

interface Interface {
  children: JSX.Element[],
  key: any
}

interface InterfaceButton {
  key: any,
  onClick?: any,
  onChange?: any,
  isCheckbox?: boolean,
  isChecked?: boolean,
  label: string,
  icon?: string,
  value?: any
}

interface InterfaceIcon {
  classes: string
}

export const ButtonBar = ({key, children}: Interface) => {

  return <div className="ml-5 mb-3 w-100" key={key}>
    <div className="topcoat-button-bar w-100">
      {children.map((element) => {return element})}
    </div>
  </div>

}

export const Icon  = ({classes}:InterfaceIcon) => {
  return <i className={classes}></i>
}

export const ButtonBarButton = ({key, onClick, onChange, isCheckbox, label, isChecked, icon, value}:InterfaceButton) => {

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

  return <div className="topcoat-button-bar__item" key={key}>
    <button className={"topcoat-button-bar__button" + (isCheckbox && checked ? " topcoat-active" : "")} onClick={handleClick}>
      {iconElement}{label}
    </button>
  </div>

}