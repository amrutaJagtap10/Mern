// import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DriverNavbar = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('TOKEN');
  let role = localStorage.getItem('ROLE'); // Get user role from localStorage, default to 'user'

  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if the route is an Admin route
  const isDriverRoute = location.pathname.startsWith('/driver'); // Check if the route is an Driver route



  const handleLogout = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'driver') {
      navigate('/driver');
    } else {
      navigate('/'); // Default to user page
    }

    // Clear token and role after navigating
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ROLE');
  };

  // useEffect(() => {
  //   // Redirect to admin dashboard if role is admin
  //   if (role === 'admin') {
  //     navigate('/admin/dashboard');
  //   }
  // }, [role, navigate]);


  return (
    <nav className="bg-orange-400 flex items-center px-6 py-3 border-b-4 border-pink-800">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-2 text-2xl font-bold">
        <span className="text-pink-800 text-primary">EBus</span>
        <span className="text-red-600">System</span>
      </div>

      {/* Center: Role-Based Options */}
      <div className="flex-1 flex justify-center space-x-4">
        {
        console.log(role + token)
        
        }
        {role === 'user' && (
          <>
            <Link to="/businfo" className="text-primary font-medium hover:text-white">
              Bus Info
            </Link>
            <Link to="/search" className="text-primary font-medium hover:text-white">
              Search
            </Link>
          </>
        )}
        {role === 'driver' && (
          <>
            <Link to="/bus_info" className="text-primary font-medium hover:text-white">
              Add Bus Info
            </Link>
            <Link to="/driver-schedule" className="text-primary font-medium hover:text-white">
              Contact Details
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
              <Link to="/" className="text-primary font-medium hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-primary font-medium hover:text-white">
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
              <button type='submit'
                onClick={handleLogout}
                className="text-primary text-2xl font-medium cursor-pointer"
              >
                Logout
              </button>
            {/* )} */}
          </>
          
        )}
      </div>
    </nav>
  );
};

export default DriverNavbar;
