import React from "react"
import { useRecoilState } from "recoil"
import {suporteState} from "../atoms/Suporte";

interface SelectSuporteProps {
    label?: string;
    id?: string;
    prependClass?: string;
    onChange?: any;
}

export function SelectSuporte({label, id, prependClass, onChange}: SelectSuporteProps) {
    const [suportes, setSuportes] = useRecoilState<any>(suporteState)

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
            <option value="" key="empty">selecione suporte</option>
            {suportes.map((suporte:any) => (
              <option value={suporte.id} key={suporte.id}>{suporte.name}</option>
            ))}
            </select>
        </div>
        </div>
    )
}
