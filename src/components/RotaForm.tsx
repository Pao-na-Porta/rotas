import React from "react"
import {SelectEntregador} from "./SelectEntregador";
import {SelectSuporte} from "./SelectSuporte";

interface Interface {
  rota: any
}

export const RotaForm = ({rota}: Interface) => {

  return <div className="form">
    <div className="form-row">
      <SelectEntregador
        label="Motorista"
        id={rota.motorista_id}/>

      <SelectEntregador
        label="Entregador"
        id={rota.entregador_id}
        prependClass="mdi mdi-human-dolly"/>
    </div>
    <div className="form-row">
      <div className="form-field">
        <SelectSuporte
          label="Suporte"
          id={rota.suporte_id}
          prependClass="mdi-account-heart-outline"/>
      </div>
      <div className="form-field">
        <label>Hora</label>
        <div className="form-input-prep">
                <span
                  className="mdi mdi-clock-check-outline">
                </span>
          <input
            type="text"
            value={rota.saida === null ? '' : rota.saida}
            onChange={(e) => {
              rota.saida = e.target.value
            }}/>
        </div>
      </div>
    </div>

    <div className="form-row">
      <div className="form-field">
        <label>Carro</label>
        <div className="form-input-prep">
          <span className="mdi mdi-car"></span>
          <input
            type="text"
            value={rota.carro === null ? '' : rota.carro}
            onChange={(e) => {
              rota.carro = e.target.value
            }}/>
        </div>
      </div>
      <div className="form-field">
        <label>Local</label>
        <div className="form-input-prep">
          <span className="mdi mdi-earth"></span>
          <input
            type="text"
            value={rota.local === null ? '' : rota.local}
            onChange={(e) => {
              rota.local = e.target.value
            }}/>
        </div>
      </div>
    </div>
  </div>
}