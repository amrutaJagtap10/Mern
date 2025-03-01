import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Header/Layout"
import UserLogin from "./User/UserLogin"
import AdminLogin from "./Admin/AdminLogin"
import DriverLogin from "./Driver/DriverLogin"
import UserRegiter from "./User/UserRegiter"
import BusLocationSearch from "./User/BusLocationSearch"
import PageNotFound from "./PageNotFound"
import "./global.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import DriverRegistration from "./Admin/DriverRegistration"
import BusInfoForm from "./Driver/BusInfoForm"
import AllBusDetails from "./Admin/AllBusDetails"
import Dashboard from "./Admin/Dashboard"
import DriverList from "./Admin/DriverList"
import EditDriver from "./Admin/EditDriver"
import DriverDashboard from "./Driver/DriverDashboard"
import UserDashboard from "./User/UserDashboard"
import BusDetails from "./Driver/BusDetails"
import EditBusDetails from "./Driver/EditBusDetails"
import AvailableBuses from "./User/AvailableBuses"
import Logout from "./Header/Logout"
import AdminEditBusDetails from "./Admin/AdminEditBusDetails"
import AdminViewBusDetails from "./Admin/AdminViewBusDetails"
import ViewDriver from "./Admin/ViewDriver"
import AdminAllUserDetails from "./Admin/AdminAllUserDetails"
import AdminEditUser from "./Admin/AdminEditUser"
import AdminViewUser from "./Admin/AdminViewUser"
import About from "./About"
import Disclaimer from "./Disclaimer"
import Privacy_policy from "./Privacy_policy"
import Contact from "./Contact"
import AdminWebsiteMessage from "./Admin/AdminWebsiteMessage"
import AdminEditWebsiteMessage from "./Admin/AdminEditWebsiteMessage"
import AdminViewWebsiteMessage from "./Admin/AdminViewWebsiteMessage"
import UserBusDetails from "./User/UserBusDetails"



const routing=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<UserDashboard/>
      },
      {
        path:"/admin/",
        element:<AdminLogin/>
      },
      {
        path:"/admin/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/admin/driver_register",
        element:<DriverRegistration/>
      },
      {
        path:"/admin/allbus_details",
        element:<AllBusDetails/>
      },
      {
        path:"/admin/editbus/:id",
        element:<AdminEditBusDetails/>
      },
      {
        path:"/admin/viewbus/:id",
        element:<AdminViewBusDetails/>
      },
      {
        path:"/admin/alldrivers",
        element:<DriverList/>
      },
      {
        path:"/admin/editdriver/:id",
        element:<EditDriver/>
      },
      {
        path:"/admin/viewdriver/:id",
        element:<ViewDriver/>
      },
      {
        path:"/admin/allusers",
        element:<AdminAllUserDetails/>
      },
      {
        path:"/admin/edituser/:id",
        element:<AdminEditUser/>
      },
      {
        path:"/admin/viewuser/:id",
        element:<AdminViewUser/>
      },
      {
        path:"/admin/allcontacts",
        element:<AdminWebsiteMessage/>
      },
      {
        path:"/admin/editcontact/:id",
        element:<AdminEditWebsiteMessage/>
      },
      {
        path:"/admin/viewcontact/:id",
        element:<AdminViewWebsiteMessage/>
      },
      {
        path:"/driver",
        element:<DriverLogin/>
      },
      {
        path:"/driver/dashboard",
        element:<DriverDashboard/>
      },
      {
        path:"/driver/bus_info",
        element:<BusInfoForm/>
      },
      {
        path:"/driver/allbuses",
        element:<BusDetails/>
      },
      {
        path:"/driver/editbus/:id",
        element:<EditBusDetails/>
      },
      {
        path:"/register",
        element:<UserRegiter/>
      },
      {
        path:"/login",
        element:<UserLogin/>
      },
      {
        path:"/dashboard",
        element:<UserDashboard/>
      },
      {
        path:"/search",
        element:<AvailableBuses/>
      },
      {
        path:"/available_buses",
        element:<AvailableBuses/>
      },
      {
        path:"/busdetails/:id",
        element:<UserBusDetails/>
      },
      {
        path:"/logout",
        element:<Logout/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/disclaimer",
        element:<Disclaimer/>
      },{
        path:"/privacy_policy",
        element:<Privacy_policy/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"*",
        element:<PageNotFound/>
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={routing}/>

    </>
  )
}

export default App



