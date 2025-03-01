import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from '../Admin/Dashboard';
import DriverNavbar from '../Driver/DriverNavbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation(); // Get current route
  // const navigate = useNavigate();

  const role = localStorage.getItem('ROLE');
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if the route is an Admin route
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard'); // Check if the route is an Admin route

  //   // Redirect to login page if not authenticated as admin
  //   if (isAdminRoute && role !== 'admin') {
  //     navigate('/admin'); // Redirect to login if not an admin
  //     return null; // Prevent rendering of the layout
  //   }

  return (
    <>
      {/* {!isDriverRoute &&( */}
        <Navbar />
      {/* // )} */}
      
      {/* {isDriverRoute && role === "driver" && (
        <DriverNavbar/>
      )} */}

      <main className="flex">
      {/* {isAdminRoute && role === 'admin' && (
          <aside className="secondary text-white min-h-screen p-4 sticky">
            <ul className="space-y-4 layout_ul">
              <li>
                <Link
                  to="/admin/driver_register"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center"
                >
                  Add Driver
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/allbus_details"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center"
                >
                  All Bus Details
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/alldrivers"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center"
                >
                  All Drivers
                </Link>
              </li>
            </ul>
          </aside>

        )} */}

        {/* Display Dashboard for Admin Routes */}
         {isAdminRoute && role === "admin" && (
          // <aside className="secondary text-white min-h-screen p-4 sticky ">
            <Dashboard />
          // </aside>
        )}
        <section className={`flex-1 outlet_section `}>
          {!isAdminDashboard && (
            <Outlet />
          )} 
          
          
        </section>
      </main>

      {/* Footer */}
        <Footer/>
    </>
  );
};

export default Layout;

