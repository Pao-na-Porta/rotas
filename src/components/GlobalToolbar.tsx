import React from "react"
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {ButtonBar, ButtonBarButton} from "./ui/ButtonBar";
import {rotasState, rotasToLoad} from "../atoms/Rotas"
import {showOnlyMultipleMarker,showSequenciaEntrega} from "../atoms/GlobalAtoms";
import {marcadorUpdateAll, marcadorVisibilitySelector} from "../atoms/Marcadores";

export const GlobalToolbar = () => {
  const setToLoad = useSetRecoilState(rotasToLoad)
  const rotasDisponiveis = useRecoilValue(rotasState)
  const [viewOnlyMultiple, setViewOnlyMultiple] = useRecoilState(showOnlyMultipleMarker)
  const updateAll = useSetRecoilState(marcadorUpdateAll)
  const [sequenciaVisibility, setPedidoSequenciaVisibility] = useRecoilState(showSequenciaEntrega)
  const refresh = useRecoilRefresher_UNSTABLE(marcadorVisibilitySelector)

  const carregaRotas = (e:any) => {
    const rotas = rotasDisponiveis.map((rota:any) => {return rota.id})
    setToLoad(rotas as never[])
  }

  const switchMarkersMultipleVisibility = (e:any) => {
    setViewOnlyMultiple(e.checked)
    updateAll(e.checked)
    refresh()
  }
  const switchPedidoSequenciaVisibility = (e:any) => {
    setPedidoSequenciaVisibility(e.checked)
    updateAll(e.checked)
    refresh()
  }

  return <ButtonBar key={'OKthen'}>
    <ButtonBarButton key='1' label='' icon='reload' onClick={(e:any) => {carregaRotas(e)}} />
    <ButtonBarButton key='2'
                     label=''
                     icon='layers-triple-outline'
                     isCheckbox={true}
                     isChecked={viewOnlyMultiple}
                     onChange={switchMarkersMultipleVisibility} />
    <ButtonBarButton key='3' label='' icon='sigma' />
    <ButtonBarButton key='4' label='' icon='sprout-outline' />
    <ButtonBarButton key='5'
                     label=''
                     icon='sort-numeric-ascending'
                     isCheckbox={true}
                     isChecked={sequenciaVisibility}
                     onChange={switchPedidoSequenciaVisibility} />
  </ButtonBar>

}