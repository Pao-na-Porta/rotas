import React, {useEffect, useState} from "react"
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {ButtonBar, ButtonBarButton} from "./ui/ButtonBar";
import {rotasState, rotasToLoad} from "../atoms/Rotas"
import {
  showNumeroPedido,
  showOnlyMultipleMarker,
  showSequenciaEntrega,
  showTotalizadorHorta
} from "../atoms/GlobalAtoms";
import {marcadorUpdateAll, marcadorVisibilitySelector} from "../atoms/Marcadores";

export const GlobalToolbar = () => {
  const setToLoad = useSetRecoilState(rotasToLoad)
  const updateAll = useSetRecoilState(marcadorUpdateAll)
  const rotasDisponiveis = useRecoilValue(rotasState)
  const [viewOnlyMultiple, setViewOnlyMultiple] = useRecoilState(showOnlyMultipleMarker)
  const [sequenciaVisibility, setSequenciaEntregaVisibility] = useRecoilState(showSequenciaEntrega)
  const [numeroPedidoVisibility, setNumeroPedidoVisiblity] = useRecoilState(showNumeroPedido)
  const [hortaVisibility, setHortaVisiblity] = useRecoilState(showTotalizadorHorta)

  const refresh = useRecoilRefresher_UNSTABLE(marcadorVisibilitySelector)

  const [vPedido, setVPedido] = useState(false)
  const [vSequencia, setVSequencia] = useState(false)

  const carregaRotas = (e: any) => {
    const rotas = rotasDisponiveis.map((rota: any) => {
      return rota.id
    })
    setToLoad(rotas as never[])
  }

  const switchMarkersMultipleVisibility = (e: any) => {
    setViewOnlyMultiple(e.checked)
    updateAll(e.checked)
    refresh()
  }

  // esse grupo age como RADIO
  const switchSequenciaEntregaVisibility = (e: any) => {
    setHortaVisiblity(false)
    setNumeroPedidoVisiblity(false)
    setSequenciaEntregaVisibility(e.checked)
    updateAll(e.checked)
    refresh()
  }

  const switchNumeroPedidoVisibility = (e: any) => {
    setHortaVisiblity(false)
    setSequenciaEntregaVisibility(false)
    setNumeroPedidoVisiblity(e.checked)
    updateAll(e.checked)
    refresh()
  }

  const switchHortaVisibility = (e: any) => {
    setNumeroPedidoVisiblity(false)
    setSequenciaEntregaVisibility(false)
    setHortaVisiblity(e.checked)
    updateAll(e.checked)
    refresh()
  }

  useEffect(() => {
    setVPedido(numeroPedidoVisibility)
    setVSequencia(sequenciaVisibility)

  },[sequenciaVisibility, numeroPedidoVisibility])

  return <ButtonBar xkey={'okthen'}>
    <ButtonBarButton xkey='1' label='' icon='reload' onClick={(e: any) => {
      carregaRotas(e)
    }}/>
    <ButtonBarButton xkey='2'
                     label=''
                     icon='layers-triple-outline'
                     isCheckbox={true}
                     isChecked={viewOnlyMultiple}
                     onChange={switchMarkersMultipleVisibility}/>
    <ButtonBarButton xkey='3' label='' icon='sigma'/>
    <ButtonBarButton xkey='4'
                     label=''
                     icon='sprout-outline'
                     isCheckbox={true}
                     isChecked={hortaVisibility}
                     onChange={switchHortaVisibility}
    />
    <ButtonBarButton xkey='5'
                     label=''
                     icon='sort-numeric-ascending'
                     isCheckbox={true}
                     isChecked={sequenciaVisibility}
                     onChange={switchSequenciaEntregaVisibility}/>
    <ButtonBarButton xkey='6'
                     label=''
                     icon='music-accidental-sharp'
                     isCheckbox={true}
                     isChecked={numeroPedidoVisibility}
                     onChange={switchNumeroPedidoVisibility}/>
  </ButtonBar>

}