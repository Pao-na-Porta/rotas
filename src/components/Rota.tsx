import React, {useState} from "react"
import CheckIcon from "./CheckIcon"
import RotaIcon from "./RotaIcon"
import {SelectEntregador} from "./SelectEntregador"

interface RotaProps {
  rota: any
}

export const Rota = ({rota}: RotaProps) => {

  const [contentOpened, setContentOpened] = useState(false)

  return <div className="accordion" key={rota.id}>
    <div className="accordion-tab">
      <RotaIcon checked={false} bgcolor={rota.cor.background} color={rota.cor.text} numero={rota.numero}></RotaIcon>
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
        <div data-target="end1">Endereço Final</div>
        <div data-target="roteirizador1">Roteirizador</div>
      </div>

      <div id="listao1" className="tab-squared-content active">
        <div className="form">
          <div className="form-row">
            <SelectEntregador label="Motorista" id={rota.motorista_id}/>
            <SelectEntregador label="Entregador" id={rota.entregador_id} prependClass="mdi mdi-human-dolly"/>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Suporte</label>
              <div className="form-input-prep">
                                <span
                                  className="mdi mdi-account-heart-outline"></span>
                <select>
                  <option>Zé das galinhas</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Hora</label>
              <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-clock-check-outline"></span>
                <input type="text" value={rota.saida}/>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Carro</label>
              <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-car"></span>
                <input type="text" value={rota.carro}/>
              </div>
            </div>
            <div className="form-field">
              <label>Local</label>
              <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-earth"></span>
                <input type="text" value={rota.local}/>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

}