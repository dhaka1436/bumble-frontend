import './App.css'
import { NonLoggedInHeader } from './components/Header/Header.jsx'
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import Body from './Body'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"
import LogIn from './components/LogInPage/LogIn.jsx'
import Feed from './Feed'
import Profile from './Profile.jsx'

function App() {
    const appLayout = createBrowserRouter([
        {
            path: "/",
            element: <Body />,
            children: [
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/login",
                    element: <LogIn />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/connections",
                    element: <h1> Connections List</h1>
                },
            ]
        },
    ])

    return (
        <MantineProvider>
            <Provider store={appStore}>
                <RouterProvider router={appLayout} />
            </Provider>
        </MantineProvider>
    )
}

export default App 