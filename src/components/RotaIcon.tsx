import React from "react"
import {wait} from "@testing-library/user-event/dist/utils";
import axios from "axios";

type RotaIconState = {checked:boolean, loading:boolean}
type RotaIconProps = {checked:boolean, color:string, bgcolor:string, onChange?:any, numero?:any}

export class RotaIcon extends React.Component<RotaIconProps, RotaIconState> {

  constructor(props:any) {
    super(props);
    this.state = {checked: typeof props.checked === 'undefined' ? false : props.checked, loading: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event:any) {
    console.log('clicked')

    this.setState(prevState => ({"loading": true, "checked": !prevState.checked}))

    if (!this.state.checked) {
      axios.get('http://127.0.0.1:8000/mapa/v1/entregas-por-semana')
        .then((response) => {
          wait(5000).then(
            () => {this.setState(prevState => ({"loading": false}))}
          )

        })
        .catch(error => console.log(error))

    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }

  }

  render() {
    let style = {
      borderRadius: "50%",
      padding: "5px",
      border: "solid 3px",
      marginRight: "8px",
      color: "white",
      backgroundColor: "black",
      borderColor: "white",
      fontSize: "25px",
      cursor: "pointer",
      minWidth: "50px",
      minHeight: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }

    // remove marcador... bota número
    // mdi mdi-map-marker
    let cl = this.state.loading ? 'loader-background' : ''

    if (this.props.color) {
      style.color = this.props.color;
      style.backgroundColor = this.props.bgcolor;
    }
    if (this.state.checked) {
      style.borderColor = "#7bf97b";
    }

    return <span className={cl} style={style} onClick={this.handleClick}>{this.props.numero}</span>
  }
}

export default RotaIcon