import React, {useState} from 'react'
import {blue} from "material-ui/colors";

interface Interface {
  k: any,
  label: string,
  produtos: any[],
}

export const Expandable = ({k, label, produtos}:Interface) => {
  const [open, setOpen] = useState(false)
  const qtdTotal = produtos.reduce((prev, produto) => {
    return produto.quantidade + prev
  }, 0)

  return <div className={'mb-1'} key={k}>
    <div onClick={() => {setOpen(!open)}}><strong style={{color: blue.A400}}>{label} ({qtdTotal})</strong></div>
    <div className={open ? '' : 'd-none'} >
      {produtos.map((produto) => {
        return <div key={produto.nome.replace(' ', '-')}>{produto.quantidade} {produto.nome}</div>
      })}
    </div>
  </div>

}