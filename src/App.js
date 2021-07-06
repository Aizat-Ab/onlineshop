import React from 'react';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import axios  from 'axios';

function App() {

  React.useEffect(() => {
   (async()=>{
    const {data} = await axios.get('https://60d4148561160900173ca47f.mockapi.io/orders');  
    console.log(data.reduce((prev, obj)=>[...prev, ...obj.items], []))
   })()
}, [])

  return (
    <div className="wrapper clear">
      <Route exact path='/' component={Home}/>
    </div>
  );
}

export default App;
