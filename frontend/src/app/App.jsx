import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './App.route'
import { Provider } from 'react-redux'
import { store } from './App.store'

import './App.css'

function App() {
 

  return (
    <>
    <Provider store={store} >
 <RouterProvider router={routes}></RouterProvider>
    </Provider>
      
    </>
  )
}

export default App
