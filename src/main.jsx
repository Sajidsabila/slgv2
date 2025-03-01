import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Index from './pages/index.jsx'
import {createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Saxophone from './pages/saxophone.jsx'
import Violin from './pages/violin.jsx'
import Cfk1Piano from './pages/Piano/PrivateClass/cfk1piano.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  }, 
  {
    path: '/saxophone',
    element: <Saxophone />
  }, {
    path: "/violin",
    element: <Violin />
  }, 
  {
    path: '/cfk-1-piano',
    element: <Cfk1Piano />
  }
 
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
