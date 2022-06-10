import React from "react"

interface BadgeInterface {
  visible: boolean,
  color: string,
  value: string,
}
export const Badge = ({visible, color, value}:BadgeInterface) => {

  return <span className="custom-marker-sequencia"
               style={{display: (visible ? 'block' : 'none'), backgroundColor: color}}
  >
      {value}
    </span>
}