import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import AssetRegistry from './Pages/AssetRegistry';
import Menu from './Components/Menu/index';
import DeviceRegistry from './Pages/DeviceRegistry';
import EditAsset from './Pages/EditAsset';
import DetachThing from './Pages/DetachThing';
import zoneView from './Components/zoneView/zoneView.js';

class App extends React.Component {

  render (){
    return (
      <Router>
          <Menu />
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/assetRegistry" exact component={AssetRegistry} />
          <Route path="/deviceRegistry" exact component={DeviceRegistry} />
          <Route path="/editAsset" exact component={EditAsset} />
          <Route path="/detachThing" exact component={DetachThing} />
          <Route path="/zoneView" exact component={zoneView} />
        </div>
      </Router>
    )
  }
}

export default App;