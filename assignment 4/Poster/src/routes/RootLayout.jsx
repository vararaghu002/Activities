import { Outlet } from 'react-router-dom'
import MainHeader from "../Components/MainHeader.jsx"

function RootLayout(){
 return (
    <>
       <MainHeader/>
       <Outlet />
    </>
 )
}
export default RootLayout;