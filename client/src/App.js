import React, {useState, createContext} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import UserPage from './UserPage';

export const LangContext = createContext(null);
export default function App() {
  const [lang, setLang] = useState('KOR');
  const changeLangTo = value => {
    setLang(value);
    // console.log(`Lang : ${lang}`)
  }
  return (
    <LangContext.Provider value={{lang, changeLangTo}}>
        <Routes>
            <Route exact path='/' element={<LoginPage />}/>
            <Route exact path='user' element={<UserPage />}/>
        </Routes>
    </LangContext.Provider>
  )
}




