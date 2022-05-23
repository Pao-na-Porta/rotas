import React from "react"
import axios from "axios"
import {useRecoilState} from "recoil";
import { datasDeEntregaState } from "../atoms/DatasDeEntrega";
import { dataDeEntregaState } from "../atoms/DataDeEntrega";
import {rotasState} from "../atoms/Rotas";

interface DatasDeEntregaProps {
  onChangeCallback?:any
}

export const DatasDeEntrega = (props:DatasDeEntregaProps) => {

  const [datasDeEntrega, setDatasDeEntrega] = useRecoilState(datasDeEntregaState)
  const [dataDeEntrega, setDataDeEntrega] = useRecoilState(dataDeEntregaState)
  const [rotas, setRotas] = useRecoilState(rotasState)

  const onChange = (event: any) => {
    setDataDeEntrega(event.target.value);
    if (typeof props.onChangeCallback === 'function') {
      props.onChangeCallback()
    }
    console.log('Data de entrega selecionada: ' + event.target.value)

    if (event.target.value.length) {
      // data selecionada carrega rotas
      let datas = event.target.value.split(',');

      axios.get('http://127.0.0.1:8000/mapa/v1/rotas', {params: {entrega_at: datas}})
        .then((response) => {
          console.log(`Total rotas carregadas: ${response.data.data.length}`)
          setRotas(response.data.data)
        })
        .catch(error => console.log(error))
    }

  };

  let options: any = [];

  if (datasDeEntrega.length > 0) {
    datasDeEntrega.forEach((semana: any) => {
      let value: any = [];
      let label: any = [];
      semana.entrega_at.map((entrega: any) => {
        let t = entrega.split(/[- :]/);
        t[1]--;
        let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

        value.push(entrega.split(' ')[0]);
        label.push(`${("0" + d.getDate()).slice(-2)}/${("0" + d.getMonth()).slice(-2)}`);
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
