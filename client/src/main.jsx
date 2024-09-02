import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import CreateVeiculo from './CriarVeiculo'
import ReadVeiculo from './ListarVeiculo'
import UpdateVeiculo from './AlterarVeiculo'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
            <Routes>
                  <Route path="/" element={ <Home/> }/>
                  <Route path="/veiculo/cadastrar" element={ <CreateVeiculo/> }/>
                  <Route path="/veiculo" element={ <ReadVeiculo/> }/>
                  <Route path="/veiculo/alterar" element={ <UpdateVeiculo/>}/>
            </Routes> 
      </BrowserRouter>
  </React.StrictMode>,
)



