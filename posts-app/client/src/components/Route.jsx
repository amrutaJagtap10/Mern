import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
// import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import PostDetail from '../pages/PostDetail'


export const routing = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    // errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/posts/:id",
        element:<PostDetail/>
      },
      {
        path:"/post",
        element:<PostDetail/>
      }
    ]
  }
])
