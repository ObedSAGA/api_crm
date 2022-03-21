import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import NewClient from './pages/NewClient'
import UpdateClient from './pages/UpdateClient'
import ViewClient from './pages/ViewClient'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout/>}>
          <Route index  element={<Home/>}/>
          <Route path="nuevo" element={<NewClient/>}/>
          <Route path="editar/:id" element={<UpdateClient/>}/>
          <Route path=":id" element={<ViewClient/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
