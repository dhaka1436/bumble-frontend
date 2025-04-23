import { Outlet } from "react-router-dom"
import { NonLoggedInHeader } from "./Header"

const Body = () => {

    return (
        <>
        <NonLoggedInHeader/>
        <Outlet/>
        </>
    )
}

export default Body;