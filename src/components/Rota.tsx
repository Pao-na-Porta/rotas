import React, {useEffect, useState} from "react"
import CheckIcon from "./ui/CheckIcon"
import RotaIcon from "./RotaIcon"
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useSetRecoilState,
} from "recoil"
import {ListaRotaPedidos} from "./ListaRotaPedidos"
import {rotasFamily, pedidosRotaFamily, rotaToLoad, rotasToLoad} from "../atoms/Rotas"
import {loadRota} from "../helpers/Requests"
import {pedidosFamily, pedidosUnloadState, pedidosSolo} from "../atoms/Pedidos"
import {
  makeKey,
  marcadoresFamily,
  marcadorVisibilitySelector,
  marcadoresState,
} from "../atoms/Marcadores"
import {DataMysql2Date, DiaSemana} from "../helpers/Formatos";
import {RotaForm} from "./RotaForm";

interface RotaProps {
  rota: any
}

export const Rota = ({rota}: RotaProps) => {
  const setPedidosUnload = useSetRecoilState(pedidosUnloadState)
  const setRotaFamily = useSetRecoilState(rotasFamily(rota.id))
  const [load, setLoad] = useRecoilState(rotaToLoad(rota.id))
  const [rotasACarregar, setRotasACarregar] = useRecoilState(rotasToLoad)
  const refresh = useRecoilRefresher_UNSTABLE(marcadorVisibilitySelector)
  const [pedidosRota, setPedidosRota] = useRecoilState(pedidosRotaFamily(rota.id))
  const [contentOpened, setContentOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tabVisible, setTabVisible] = useState(0)

  const loadPedidosTransaction = useRecoilTransaction_UNSTABLE(({get, set}) => (pedidos:any) => {

    let pedidosWithProps = pedidos.map((pedido:any) => {

      let copy = {...pedido}
      copy.visible = true
      copy.atualizado = 0
      console.log(JSON.stringify(pedido.id + ' : ' + typeof pedido.id))
      set(pedidosFamily(pedido.id), {...copy})

      const marcadorId = makeKey(pedido)
      let marcadores = get(marcadoresState)
      let marcador = {...get(marcadoresFamily(marcadorId))}

      // valor default
      if (marcador.id != marcadorId) {
        marcador.id = marcadorId
        marcador.pedidos = [pedido.id]
        marcador.latitude = pedido.latitude
        marcador.longitude = pedido.longitude
        marcador.atualizado = 1
        marcador.visible = true

        set(marcadoresState, [...marcadores, marcadorId] as never[])

      } else {
        // atualiza marcador existente
        if (marcador.pedidos.indexOf(pedido.id) < 0) {
          marcador.pedidos = [...marcador.pedidos, pedido.id]
          marcador.atualizado = marcador.atualizado + 1
          marcador.visible = true
        }
      }

      set(marcadoresFamily(marcadorId), {...marcador})

      return pedido

    })

    set(pedidosRotaFamily(rota.id), pedidosWithProps as never[])

  })

  const unsetSoloTransaction = useRecoilTransaction_UNSTABLE(({get, set}) => (pedidos:any) => {
    const listaSolo = get(pedidosSolo) as any[]
    let updated = listaSolo.filter((value) => {
      return pedidos.find((pedido: any) => {
        return pedido.id === value
      }) === undefined
    })
    set(pedidosSolo, updated as never[])

    get(marcadoresState).forEach((id: any) => {
      const m = get(marcadoresFamily(id)) as any
      set(marcadoresFamily(m.id), {...m, atualizado: m.atualizado+1})
    })

  })

  const setSoloTransaction = useRecoilTransaction_UNSTABLE(({get, set}) => (pedidos:any) => {
    const listaSolo = get(pedidosSolo) as any[]
    let updated = [...listaSolo]

    pedidos.forEach((pp: any) => {
      if (updated.indexOf(pp) < 0) {
        updated = [...updated, pp.id]
      }
    })
    set(pedidosSolo, [...updated] as never[])

    get(marcadoresState).forEach((id: any) => {
      const m = get(marcadoresFamily(id)) as any
      set(marcadoresFamily(m.id), {...m, atualizado: m.atualizado+1})
    })

  })

  const setVisibiltyTransaction = useRecoilTransaction_UNSTABLE(({get, set, reset}) => (pedidos:any) => {

    let updatedPedidosRota = [] as never[]

    pedidos.forEach((pp: any) => {
      const p = get(pedidosFamily(pp.id))
      let pedido = {...p} as any
      pedido.visible = !pedido.visible
      pedido.atualizado++
      set(pedidosFamily(pp.id), {...pedido})
      updatedPedidosRota.push({...pedido} as never)

      // UPDATE RELATED MARKER
      const key = makeKey(pedido)
      const marcador = get(marcadoresFamily(key))
      let updated = {...marcador} as any
      updated.atualizado++
      set(marcadoresFamily(key), {...updated})

    })

    set(pedidosRotaFamily(rota.id), [...updatedPedidosRota])

  });

  useEffect(() => {
    setRotaFamily(rota)

  }, [rota, setRotaFamily])

  const handleChange = () => {
    setLoad(false)
    setLoading(true)

    // pedidos estão carregados
    if (pedidosRota.length) {
      console.log(`Descarregando ${pedidosRota.length} pedidos na rota #${rota.id} - ${rota.nome}`)
      setPedidosUnload(pedidosRota)
      setPedidosRota([])
    }

    loadRota(rota.id, (response:any) => {
      console.log(`Pedidos carregados: ${response.data.data.length} na rota #${rota.id} - ${rota.nome}`)
      // loadPedidosTransaction(response.data.data)

      loadPedidosTransaction(response.data.data)
      setLoading(false)

      // se está usando a fila... remove item atual
      if (rotasACarregar.length) {
        const newList = [] as never[]
        for (let i=1; i<rotasACarregar.length; i++) {
          newList.push(rotasACarregar[i])
        }
        setRotasACarregar(newList)
      }
    })
  }

  if (load) {
    handleChange()
  }

  return <div className="accordion" key={`acordionRota-${rota.id}`}>
    <div className="accordion-tab">
      <RotaIcon
        loading={loading}
        checked={pedidosRota.length > 0}
        bgcolor={rota.cor.background}
        color={rota.cor.text}
        numero={rota.numero}
        id={rota.id}
        onChange={handleChange}></RotaIcon>
      <div style={{width: "100%"}}>
        <div className={"accordion-rota-title dia-semana-" + DataMysql2Date(rota.entrega_at).getDay()}>{rota.nome} / {rota.entrega_at === null ? '' : DiaSemana(rota.entrega_at)}</div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <small>{rota.pedidos_count} pedido{rota.pedidos_count === 1 ? '' : 's'}</small>
          <small>{rota.saida}</small>
          <span style={{fontSize: "20px"}}>
              <CheckIcon iconClass="mdi mdi-bullseye-arrow ml-5" checked={false}></CheckIcon>
              <CheckIcon iconClass="mdi mdi-alpha-s-circle-outline ml-5"
                         checked={false}
                         onChangeCallback={(checked:boolean) => {
                           if (checked) {
                             setSoloTransaction(pedidosRota)
                           } else {
                             unsetSoloTransaction(pedidosRota)
                           }
                           refresh()
                         }}
              ></CheckIcon>
              <CheckIcon iconClass="mdi mdi-eye-off-outline ml-5"
                         checked={false}
                         onChangeCallback={(checked:boolean) => {
                           setVisibiltyTransaction(pedidosRota)
                           refresh()
                         }}
              ></CheckIcon>
              <CheckIcon iconClass="mdi mdi-chevron-right ml-5 accordion-close"
                         checked={false}
                         checkedColor="white"
                         checkedClassName="accordion-open"
                         onChangeCallback={(opened:boolean) => {
                           setContentOpened(opened)
                         }}
                         key={rota.id}></CheckIcon>
            </span>
        </div>
      </div>
    </div>
    <div className={"accordion-content" + (contentOpened ? ' accordion-content-opened' : '')}>
      <div className="tab-squared">
        <div className={(tabVisible === 0 ? 'active' : '')} onClick={(e)=> {setTabVisible(0)}}>Listão</div>
        <div>Endereço Final</div>
        <div>Roteirizador</div>
        <div className={(tabVisible === 3 ? 'active' : '')} onClick={(e)=> {setTabVisible(3)}}>Sequencia</div>
      </div>

      <div className={"tab-squared-content " + (tabVisible === 0 ? 'active' : '')}>
        <RotaForm rota={rota}/>
      </div>

      <div className={"tab-squared-content " + (tabVisible === 3 ? 'active' : '')}>
        <ListaRotaPedidos pedidos={pedidosRota} />
      </div>

    </div>
  </div>

}