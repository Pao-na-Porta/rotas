import React from "react"
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState} from "recoil";
import {ButtonBar, ButtonBarButton} from "./ui/ButtonBar";
import {rotasState, rotasToLoad} from "../atoms/Rotas"
import {showOnlyMultipleMarker} from "../atoms/GlobalAtoms";
import {marcadorUpdateAll, marcadorVisibilitySelector} from "../atoms/Marcadores";

export const GlobalToolbar = () => {
  const setToLoad = useSetRecoilState(rotasToLoad)
  const rotasDisponiveis = useRecoilValue(rotasState)
  const setViewOnlyMultiple = useSetRecoilState(showOnlyMultipleMarker)
  const updateAll = useSetRecoilState(marcadorUpdateAll)
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

  return <ButtonBar key={'OKthen'}>
    <ButtonBarButton key='1' label='' icon='reload' onClick={(e:any) => {carregaRotas(e)}} />
    <ButtonBarButton key='2'
                     label=''
                     icon='layers-triple-outline'
                     isCheckbox={true}
                     isChecked={false}
                     onChange={switchMarkersMultipleVisibility} />
    <ButtonBarButton key='3' label='' icon='sigma' />
    <ButtonBarButton key='4' label='' icon='sprout-outline' />
    <ButtonBarButton key='5' label='' icon='sort-numeric-ascending' />
  </ButtonBar>

}