import React, { useState } from 'react';
import './App.css';
import Main from './components/Main';
import Modale from './components/Modale';

function App() {
  let [isAuth, setIsAuth] = useState(false);
  return (
    <div className="App">{
      !isAuth ? <Modale setIsAuth={setIsAuth}/> : <Main />
    }
    
    </div>
  );
}

export default App;
