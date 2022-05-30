import React, {useEffect, useState} from "react"
import CheckIcon from "./CheckIcon"
import RotaIcon from "./RotaIcon"
import {SelectEntregador} from "./SelectEntregador"
import {SelectSuporte} from "./SelectSuporte"
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useSetRecoilState,
} from "recoil"
import {ListaRotaPedidos} from "./ListaRotaPedidos"
import {rotasFamily, rotaToLoad, rotasToLoad} from "../atoms/Rotas"
import {loadRota} from "../helpers/Requests"
import {pedidosFamily, pedidosUnloadState, pedidosVisibilitySelector} from "../atoms/Pedidos"
import {makeKey, marcadoresFamily, marcadorVisibilitySelector, marcadoresState} from "../atoms/Marcadores"

interface RotaProps {
  rota: any
}

export const Rota = ({rota}: RotaProps) => {
  const setPedidosUnload = useSetRecoilState(pedidosUnloadState)
  const [pedidosRota, setPedidosRota] = useState([])
  const [contentOpened, setContentOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tabVisible, setTabVisible] = useState(0)
  const setRotaFamily = useSetRecoilState(rotasFamily(rota.id))
  const [load, setLoad] = useRecoilState(rotaToLoad(rota.id))
  const [rotasACarregar, setRotasACarregar] = useRecoilState(rotasToLoad)
  const refresh = useRecoilRefresher_UNSTABLE(marcadorVisibilitySelector);


  const loadPedidosTransaction = useRecoilTransaction_UNSTABLE(({get, set}) => (pedidos:any) => {

    let pedidosWithProps = pedidos.map((pedido:any) => {
      pedido.visible = true
      pedido.solo = false
      pedido.atualizado = 0

      set(pedidosFamily(pedido.id), pedido)

      const marcadorId = makeKey(pedido)
      let marcadores = get(marcadoresState)
      let marcador = get(marcadoresFamily(marcadorId)) as any

      // valor default
      let novoMarcador = {
        id: marcadorId,
        pedidos: [pedido.id],
        latitude: pedido.latitude,
        longitude: pedido.longitude,
        atualizado: 0
      }

      if (marcador.pedidos !== undefined) {
        // atualiza marcador existente
        if (marcador.pedidos.indexOf(pedido.id) < 0) {
          novoMarcador = {
            id: marcadorId,
            pedidos: [...marcador.pedidos, pedido.id],
            latitude: marcador.latitude,
            longitude: marcador.longitude,
            atualizado: marcador.atualizado++
          }
        }
      } else {
        // marcador novo, adiciona a lista
        const newlist = [...marcadores, marcadorId]
        set(marcadoresState, newlist as never[])
      }

      set(marcadoresFamily(marcadorId), novoMarcador)

      return pedido
    })


    setPedidosRota(pedidosWithProps)

  })

  const setVisibiltyTransaction = useRecoilTransaction_UNSTABLE(({get, set, reset}) => (pedidos:any) => {

    let updatedPedidosRota = [] as never[]

    pedidos.map((pp: any) => {
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

    setPedidosRota([...updatedPedidosRota])

  });

  useEffect(() => {
    setRotaFamily(rota)
  }, [rota])

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
      loadPedidosTransaction(response.data.data)
      setLoading(false)
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
        <div className="mb-5">{rota.nome}</div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <small>{rota.pedidos_count} pedido{rota.pedidos_count === 1 ? '' : 's'}</small>
          <small>{rota.saida}</small>
          <span style={{fontSize: "20px"}}>
              <CheckIcon iconClass="mdi mdi-bullseye-arrow ml-5" checked={false}></CheckIcon>
              <CheckIcon iconClass="mdi mdi-alpha-s-circle-outline ml-5" checked={false}></CheckIcon>
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
        <div className="form">
          <div className="form-row">
            <SelectEntregador label="Motorista" id={rota.motorista_id}/>
            <SelectEntregador label="Entregador" id={rota.entregador_id} prependClass="mdi mdi-human-dolly"/>
          </div>
          <div className="form-row">
            <div className="form-field">
              <SelectSuporte label="Suporte" id={rota.suporte_id} prependClass="mdi-account-heart-outline"/>
            </div>
            <div className="form-field">
              <label>Hora</label>
              <div className="form-input-prep">
                <span
                  className="mdi mdi-clock-check-outline"></span>
                <input type="text" value={rota.saida} onChange={(e) => {rota.saida = e.target.value}}/>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Carro</label>
              <div className="form-input-prep">
                <span
                  className="mdi mdi-car"></span>
                <input type="text" value={rota.carro} onChange={(e) => {rota.carro = e.target.value}}/>
              </div>
            </div>
            <div className="form-field">
              <label>Local</label>
              <div className="form-input-prep">
                <span
                  className="mdi mdi-earth"></span>
                <input type="text" value={rota.local} onChange={(e) => {rota.local = e.target.value}}/>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={"tab-squared-content " + (tabVisible === 3 ? 'active' : '')}>
        <ListaRotaPedidos pedidos={pedidosRota} />
      </div>

    </div>
  </div>

}