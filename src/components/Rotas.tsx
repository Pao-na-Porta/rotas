import React, {useEffect, useState} from 'react'
import {useRecoilValue} from 'recoil'
import {Rota} from './Rota'
import {ButtonBar, ButtonBarButton} from "./ui/ButtonBar"
import {DataMysql2Date, DiaSemana} from "../helpers/Formatos"
import {rotasState} from "../atoms/Rotas"
import {dataDeEntregaState} from "../atoms/DataDeEntrega"

export const Rotas = () => {
  const rotas = useRecoilValue(rotasState)
  const dataEntrega = useRecoilValue(dataDeEntregaState)
  let elementoFiltrante:any = ''
  let datasEntrega = dataEntrega.split(',')
  const [filtroDias, setFiltroDias] = useState([])

  const rotasFiltradas = () => {
    return rotas.filter((rota: any) => {
      let f = (rota.entrega_at === null ? '' : rota.entrega_at.split(' ')[0])
      return (filtroDias.indexOf(f as never) >= 0);
    })
  }

  if (dataEntrega !== '') {
    elementoFiltrante = <div className="tab-row">
      <ButtonBar key={'FiltroRotas'}>
        {datasEntrega.sort().map((data) => {
          return <ButtonBarButton
            key={data}
            label={DataMysql2Date(data).toLocaleString().substring(0,5) + ' ' + DiaSemana(data)}
            value={data}
            onChange={(e:any) => {
              if (e.checked) {
                setFiltroDias([...filtroDias, e.value] as never[])
              } else {
                let updated = filtroDias.filter((value) => { return value !== e.value})
                setFiltroDias(updated)
              }
            }}
            isCheckbox={true}/>
        })}
      </ButtonBar>
    </div>
  }

  return <div>
    {elementoFiltrante}
  <div className="scroll-bar">
    <div className="tab-row m-5">
      {rotasFiltradas().map((rota: any) => {
        const key = `rotaComponent${rota.id}`
        return <Rota rota={rota} key={key}/>
      })}
    </div>
  </div>
  </div>
}