import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil";
import { datasDeEntregaState } from "../atoms/DatasDeEntrega";
import { dataDeEntregaState } from "../atoms/DataDeEntrega";
import {rotasState} from "../atoms/Rotas";
import {DataMysql2Date} from "../helpers/Formatos";
import {loadRotas} from "../helpers/Requests";

interface DatasDeEntregaProps {
  onChangeCallback?:any
}

export const DatasDeEntrega = (props:DatasDeEntregaProps) => {

  const datasDeEntrega = useRecoilValue(datasDeEntregaState)
  const setDataDeEntrega = useSetRecoilState(dataDeEntregaState)
  const setRotas = useSetRecoilState(rotasState)

  const onChange = (event: any) => {
    setDataDeEntrega(event.target.value);
    if (typeof props.onChangeCallback === 'function') {
      props.onChangeCallback()
    }
    console.log('Data de entrega selecionada: ' + event.target.value)

    if (event.target.value.length) {
      // data selecionada carrega rotas
      let datas = event.target.value.split(',');
      loadRotas(datas, (response: any) => {
        console.log(`Total rotas carregadas: ${response.data.data.length}`)
        setRotas(response.data.data)
      });
    }

  };

  let options: any = [];

  if (datasDeEntrega.length > 0) {
    datasDeEntrega.forEach((semana: any) => {
      let value: any = [];
      let label: any = [];
      semana.entrega_at.map((entrega: any) => {
        let d = DataMysql2Date(entrega)
        value.push(entrega.split(' ')[0]);
        label.push(`${d.toLocaleDateString().substring(0, 5)}`);
        return null
      })

      options.push({"value": value, "label": label})
    })

  }
  return <div>
    <label>Datas de Entrega</label>
    <select id="entregaAt" className="w-100" onChange={onChange}>
      <option key='1'>selecione uma semana</option>
      {options.map((item: any, index: number) => {
        return <option value={item.value.join(',')} key={index}>{item.label.join('-')}</option>
      })}
    </select>
  </div>


}
