import 'bootstrap/dist/css/bootstrap.min.css'

import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Update from './components/Update';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />  
        <Route path='/register' element={<Register/>} />  
        <Route path='/update' element={<Update/>} />
      </Routes>
      
    </>
  );
}

export default App;
