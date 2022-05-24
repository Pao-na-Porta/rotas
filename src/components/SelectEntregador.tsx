import React from "react"
import { useRecoilState } from "recoil"
import {entregadorState} from "../atoms/Entregadores"

interface SelectEntregadorProps {
    label?: string;
    id?: string;
    prependClass?: string;
    onChange?: any;
}

export function SelectEntregador({label, id, prependClass, onChange}: SelectEntregadorProps) {
    const [entregadores, setEntregadores] = useRecoilState<any>(entregadorState)

    const handleChange = (e:any) => {
        if (typeof onChange === 'function') {
            onChange(e)
        }
    }

    if (typeof prependClass === 'undefined') {
      prependClass = "mdi mdi-account-tie-hat-outline"
    }

    return (
        <div className="form-field">
        <label>{label}</label>
        <div className="form-input-prep">
            <span className={prependClass}></span>
            <select onChange={handleChange} defaultValue={id}>
            <option value="" key="empty">selecione um entregador</option>
            {entregadores.map((entregador:any) => (
              <option value={entregador.id} key={entregador.id}>{entregador.name}</option>
            ))}
            </select>
        </div>
        </div>
    )
}
