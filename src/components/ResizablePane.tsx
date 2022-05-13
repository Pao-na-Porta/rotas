import React, {ReactElement} from "react"

type ResizablePanelProps = { leftContent: ReactElement, rightContent: ReactElement}
type ResizablePanelState = { leftContent: ReactElement, rightContent: ReactElement}

export class ResizablePanel extends React.Component<ResizablePanelProps, ResizablePanelState> {
  leftPanel: HTMLDivElement;
  rightPanel: HTMLDivElement;
  prevX: number;

  constructor(props:any) {
    super(props);
    this.leftPanel = document.createElement('div');
    this.rightPanel = document.createElement('div');
    this.prevX = 0;

    this.state = {leftContent: props.leftContent, rightContent: props.rightContent}
  }

  handleEvent = (event:any) => {

    switch (event.type) {
      case "mousedown":
        this.prevX = event.x
        window.addEventListener('mousemove', this.handleEvent)
        window.addEventListener('mouseup', this.handleEvent)
        break

      case "mousemove":
        this.leftPanel.style.width = event.x + "px"
        break

      case "mouseup":
        window.removeEventListener('mousemove', this.handleEvent)
        window.removeEventListener('mouseup', this.handleEvent)
        break

    }
  }

  render() {
    return <div className="resizable-pane-wrapper">
      <div className="resizable-pane-pane resizable-pane-left" ref={(node: HTMLDivElement) => (this.leftPanel = node)}>
        {this.state.leftContent}
      </div>
      <div className="resizable-pane-pane resizable-pane-right" ref={(node: HTMLDivElement) => (this.rightPanel = node)}>
        {this.state.rightContent}
        <div className="resizable-pane-gutter" onMouseDown={this.handleEvent}></div>
      </div>
    </div>
  }
}
