import React from "react"
import {ResizablePanel} from "./ResizablePane"
import {MapPanel} from "./MapPanel";
import {NavigationPanel} from "./NavigationPanel"

export const MainWindow = () => {

  return <ResizablePanel leftContent={<NavigationPanel />} rightContent={<MapPanel />}/>

}