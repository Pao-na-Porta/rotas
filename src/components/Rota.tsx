import React from "react"

type RotaProps = { rota:any}
type RotaState = { rota:any}

export class Rota extends React.Component<RotaProps, RotaState> {

  constructor(props:any) {
    super(props)
    this.setState(props.rota)
  }

  render() {
    return <div className="accordion">
      <div className="accordion-tab">
        <span className="mdi mdi-map-marker rota-label"></span>
        <input type="checkbox" className="accordion-trigger" id="check1"   />
        <label className="acc-lbl" htmlFor="check1">
          Rota 66
          <small>12 pedidos</small>
          <small>07:00</small>
          <span className="mdi mdi-bullseye-arrow" id="mudar_rota"></span>
          <span className="mdi mdi-alpha-s-circle-outline" id="mudar_rota"></span>
          <span className="mdi mdi-eye-off-outline" id="mudar_rota"></span>

        </label>
      </div>
      <div className="accordion-content">
        <div className="tab-squared">
          <div className="active" data-target="listao1">Listão</div>
          <div data-target="end1">Endereço Final</div>
          <div data-target="roteirizador1">Roteirizador</div>
        </div>

        <div id="listao1" className="tab-squared-content active">
          <div className="form">
            <div className="form-row">
              <div className="form-field">
                <label>Motorista</label>
                <div className="form-input-prep">
                  <span className="mdi mdi-account-tie-hat-outline"></span>
                  <select>
                    <option>Zé das galinhas</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Entregador</label>
                <div className="form-input-prep">
                  <span className="mdi mdi-human-dolly"></span>
                  <select>
                    <option>Zé das galinhas</option>
                  </select>
                </div>
              </div>
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
                  <input type="text" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Carro</label>
                <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-car"></span>
                  <input type="text" />
                </div>
              </div>
              <div className="form-field">
                <label>Local</label>
                <div className="form-input-prep">
                                            <span
                                              className="mdi mdi-earth"></span>
                  <input type="text"/>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  }

}