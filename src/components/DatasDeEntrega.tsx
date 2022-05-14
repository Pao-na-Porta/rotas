import React from "react";
import axios from "axios";

type DatasDeEntregaState = {datas:any, value:any}
type DatasDeEntregaProps = {onChangeCallback?:any}

export class DatasDeEntrega extends React.Component<DatasDeEntregaProps, DatasDeEntregaState> {

  constructor(props:any) {
    super(props)

    this.state = {
      value: null,
      datas: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event:any) {
    this.setState({"value": event.target.value})

    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback(event.target.value)
    }

  }

  componentDidMount(): void {
    axios.get('http://127.0.0.1:8000/mapa/v1/entregas-por-semana')
      .then((response) => {

        let datas = response.data.data
        this.setState({datas})

      })
      .catch(error => console.log(error))
  }

  render() {
    let options:any = [];

    if (this.state.datas.length > 0) {
      this.state.datas.forEach((semana:any) => {
        let value:any = [];
        let label:any = [];
        semana.entrega_at.map((entrega:any) => {
          let t = entrega.split(/[- :]/);
          t[1]--;
          let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

          value.push(entrega.split(' ')[0]);
          label.push(`${( "0" + d.getDate()).slice(-2)}/${("0" + d.getMonth()).slice(-2)}`);
        })
        options.push({"value": value, "label": label})
      })

    }

    return <div>
      <label>Datas de Entrega</label>
      <select id="entregaAt" className="w-100" onChange={this.handleChange}>
        <option>selecione uma semana</option>
        {options.map((item:any) => {return <option value={item.value.join(',')}>{item.label.join('-')}</option>})}
      </select>
    </div>
  }

}