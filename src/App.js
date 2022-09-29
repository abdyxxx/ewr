import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Modale from './components/Modale';
import NotFound from './components/NotFound';
import Spinner from './components/Spinner';

function App() {
  const isAuth = useSelector(state => state.isAuth.isAuth)
  console.log(isAuth)

  return (
    <div className="App">{
      !isAuth ?
        <Modale />
        : <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Spinner />} />
          <Route path="/reg" element={<Spinner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    }
    </div>
  );
}

export default App;
