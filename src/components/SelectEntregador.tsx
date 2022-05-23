import React from "react"
import { useRecoilState } from "recoil"
import {entregadorState} from "../atoms/Entregadores"

interface SelectEntregadorProps {
    label?: string;
    id?: string;
    prependClass?: string;
}

export function SelectEntregador({label, id, prependClass}: SelectEntregadorProps) {
    const [entregadores, setEntregadores] = useRecoilState<any>(entregadorState)

    if (typeof prependClass === 'undefined') {
      prependClass = "mdi mdi-account-tie-hat-outline"
    }

    return (
        <div className="form-field">
        <label>{label}</label>
        <div className="form-input-prep">
            <span className={prependClass}></span>
            <select>
            <option value="" key="empty">selecione um entregador</option>
            {entregadores.map((entregador:any) => (
              <option value={entregador.id} key={entregador.id} selected={entregador.id === id}>{entregador.name}</option>
            ))}
            </select>
        </div>
        </div>
    )
}
