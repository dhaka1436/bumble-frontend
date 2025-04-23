import './App.css'
import { NonLoggedInHeader } from './Header'
import { BrowserRouter,createBrowserRouter,Outlet,Route,RouterProvider,Routes } from 'react-router-dom'
import Body from './Body'

function App() {


  const appLayout = createBrowserRouter([
    {
      path : "/",
      element : <Body/>,
      children : [
        {
          path : "/login",
          element : <h1> Log In</h1>
        },
        {
          path : "/profile",
          element : <h1> User Profile</h1>
        },
        {
          path : "/connections",
          element : <h1> Connections List</h1>
        },
        
      ]
    },
    
  ])

  return (
    <>
      {/* <NonLoggedInHeader />

      <BrowserRouter basename="/">

        <Routes>
          <Route  path = "/login" element = {<NonLoggedInHeader/>}  />

        </Routes>
      </BrowserRouter> */}

      <RouterProvider router={appLayout} />
    </>
  )
}

export default App
