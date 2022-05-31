import React from "react";

type CheckIconState = {checked:boolean}
type CheckIconProps = {
  onChangeCallback?:any,
  checked:boolean,
  checkedColor?:string,
  uncheckedColor?:string,
  iconClass:string,
  checkedClassName?:string
}

export class CheckIcon extends React.Component<CheckIconProps, CheckIconState> {
  checked = false
  defaultCheckedColor = '#4fff4f'
  defaultUncheckedColor = 'white'
  checkedClassName = ''

  constructor(props:any) {
    super(props)
    this.state = {checked: props.checked}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event:any) {
    let chk = !this.state.checked
      this.setState({checked: chk})

    if (typeof this.props.onChangeCallback === 'function') {
        this.props.onChangeCallback(chk)
    }
  }

  render() {
    let style = {"color": "", "cursor": "pointer"}
    if (this.state.checked) {
      style.color = this.props.checkedColor ? this.props.checkedColor : this.defaultCheckedColor
    } else {
      style.color = this.props.uncheckedColor ? this.props.uncheckedColor : this.defaultUncheckedColor
    }

    return <span className={this.props.iconClass + (this.state.checked ? ' ' + this.props.checkedClassName : '')} style={style} onClick={this.handleChange}></span>
  }
}

export default CheckIcon