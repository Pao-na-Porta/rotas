import React, {useState} from "react"
import CheckIcon from "./CheckIcon"
import RotaIcon from "./RotaIcon"
import {SelectEntregador} from "./SelectEntregador"
import {SelectSuporte} from "./SelectSuporte";

interface RotaProps {
  rota: any
}

export const Rota = ({rota}: RotaProps) => {

  const [contentOpened, setContentOpened] = useState(false)

  return <div className="accordion" key={rota.id}>
    <div className="accordion-tab">
      <RotaIcon checked={false} bgcolor={rota.cor.background} color={rota.cor.text} numero={rota.numero} id={rota.id}></RotaIcon>
      <div style={{width: "100%"}}>
        <div className="mb-5">{rota.nome}</div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <small>{rota.pedidos_count} pedido{rota.pedidos_count == 1 ? '' : 's'}</small>
          <small>{rota.saida}</small>
          <span style={{fontSize: "20px"}}>
              <CheckIcon iconClass="mdi mdi-bullseye-arrow ml-5" checked={false}></CheckIcon>
              <CheckIcon iconClass="mdi mdi-alpha-s-circle-outline ml-5" checked={false}></CheckIcon>
              <CheckIcon iconClass="mdi mdi-eye-off-outline ml-5" checked={false}></CheckIcon>
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
        <div className="active" data-target="listao1">Listão</div>
        <div>Endereço Final</div>
        <div>Roteirizador</div>
      </div>

      <div className="tab-squared-content active">
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

    </div>
  </div>

}