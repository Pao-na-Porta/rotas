import React from "react"
import { useRecoilState } from "recoil"
import {suporteState} from "../atoms/Suporte";

interface SelectSuporteProps {
    label?: string;
    id?: string;
    prependClass?: string;
}

export function SelectSuporte({label, id, prependClass}: SelectSuporteProps) {
    const [suportes, setSuportes] = useRecoilState<any>(suporteState)

    if (typeof prependClass === 'undefined') {
      prependClass = "mdi mdi-account-tie-hat-outline"
    }

    return (
        <div className="form-field">
        <label>{label}</label>
        <div className="form-input-prep">
            <span className={prependClass}></span>
            <select>
            <option value="" key="empty">selecione suporte</option>
            {suportes.map((suporte:any) => (
              <option value={suporte.id} key={suporte.id} selected={suporte.id === id}>{suporte.name}</option>
            ))}
            </select>
        </div>
        </div>
    )
}
