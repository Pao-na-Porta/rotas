import React from 'react'
import {useTheme} from '@material-ui/core/styles'
import {RecoilRoot} from 'recoil';
import {Loader} from "./components/Loader";
import {MainWindow} from './components/MainWindow'
import './App.css'

function App() {

  const theme = useTheme()

  const myPersonalThing = () => { return <div>Hello world! </div>}

  return (
    <RecoilRoot>
      <Loader/>
      <div className="App">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css"/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
              integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
              crossOrigin=""/>
        <MainWindow/>
      </div>
    </RecoilRoot>
  )
}

export default App
