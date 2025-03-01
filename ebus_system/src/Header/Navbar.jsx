// import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('TOKEN');
  let role = localStorage.getItem('ROLE'); // Get user role from localStorage, default to 'user'

  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if the route is an Admin route
  const isDriverRoute = location.pathname.startsWith('/driver'); // Check if the route is an Driver route



  

  // useEffect(() => {
  //   // Redirect to admin dashboard if role is admin
  //   if (role === 'admin') {
  //     navigate('/admin/dashboard');
  //   }
  // }, [role, navigate]);


  return (
    <nav className="bg-orange-400 flex items-center px-6 py-3 border-b-4 border-pink-800 shadow-2xl sticky top-0 z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-2 text-2xl font-bold cursor-pointer">
        <Link to="/">
        <span className="text-pink-800 text-primary">EBus</span>
        <span className="text-red-600">System</span>
        </Link>
      </div>

      {/* Center: Role-Based Options */}
      <div className="flex-1 flex justify-evenly space-x-4">
        {
        console.log(role+" " + token)
        
        }
        {role === 'user' && (
          <>
           
          
            <Link to="/" className={`navbar_link font-medium ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>

            <Link to="/available_buses" className={`navbar_link font-medium ${location.pathname === "/available_buses" ? "active" : ""}`}>
              Available Buses
            </Link>

            <Link to="/search" className={`navbar_link font-medium ${location.pathname === "/search" ? "active" : ""}`}>
              Search
            </Link>
          </>
        )}
        {role === 'driver' && (
          <>
            <Link to="/driver/bus_info" className={`navbar_link font-medium ${location.pathname === "/driver/bus_info" ? "active" : ""}`}>
              Add Bus Info
            </Link>
            <Link to="/driver/allbuses" className={`navbar_link font-medium ${location.pathname === "/driver/allbuses" ? "active" : ""}`}>
              Bus Details
            </Link>
          </>
        )}
        
      </div>

      {/* Right Side: Login, Register, and Logout */}
      <div className="flex items-center space-x-4">
        {!token &&(
          <>
          {!isAdminRoute && !isDriverRoute &&(
            <>
              <Link to="/login" className={`navbar_link font-medium ${location.pathname === "/login" ? "active" : ""}`}>
                Login
              </Link>
              <Link to="/register" className={`navbar_link font-medium ${location.pathname === "/register" ? "active" : ""}`}>
                Register
              </Link>
            </>
          )}

          {isAdminRoute &&(
            <>
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <span className="text-pink-800 text-primary">Admin Panel</span>
                {/* <span className="text-red-600">Panel</span> */}
              </div>
            </>
          )}

          {isDriverRoute &&(
            <>
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <span className="text-pink-800 text-primary">Driver Panel</span>
                {/* <span className="text-red-600">Panel</span> */}
              </div>
            </>
          )}
          </>
         
        )}
        

        {token && role && (
          <>
            {/* {(role==='user' || role==='driver' || role==='admin') && ( */}
            <Link to="/logout" className={`navbar_link font-medium ${location.pathname === "/logout" ? "active" : ""}`}>
              {/* <button type='submit'
                onClick={handleLogout}
                className="text-primary text-2xl font-medium cursor-pointer"
              >
                Logout
              </button> */}
              Logout
              </Link>
            {/* )} */}
          </>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;
