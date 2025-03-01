

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const role = localStorage.getItem('ROLE');

  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard'); // Check if the route is an Admin route


  useEffect(() => {
    // Check if the token exists in localStorage
    if (localStorage.getItem('TOKEN')) {
      setIsAuthenticated(true);
    } else {
      navigate('/admin'); // Redirect to login page if no token
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>; // Add a loader or spinner here if needed
  }

  return (
    <>
      <main className="secondary flex min-h-screen text-white">
        {/* Sidebar for Admin */}
        {role === 'admin' && (
          <aside className="w-64  p-4 sticky top-0">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/driver_register"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center primary"
                >
                  Add Driver
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/allbus_details"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center primary"
                >
                  All Bus Details
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/alldrivers"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center primary"
                >
                  All Drivers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/allusers"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center primary"
                >
                  All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/allcontacts"
                  className="block bg-pink-700 hover:bg-pink-800 rounded-md px-4 py-2 text-center primary"
                >
                  Contacts Messages
                </Link>
              </li>
            </ul>
          </aside>
        )}

        {/* Main Content */}
        {isAdminDashboard && (
          <div className="flex-1 relative">
            {/* Fullscreen Image */}
            <img
              src="https://img.freepik.com/premium-vector/bus-background-representing-transportation-services-bus-backdrop-signifying-urban-mobility_528469-12136.jpg?semt=ais_hybrid"
              className="w-full h-screen object-cover"
              alt="Transportation Background"
            />
          </div>
        )}
        
      </main>
    </>
  );
};

export default Dashboard;
