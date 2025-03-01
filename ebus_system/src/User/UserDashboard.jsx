import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate for redirection
import BusList from "./BusList";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    if (localStorage.getItem("TOKEN")) {
      setIsAuthenticated(true);
    } else {
      navigate("/login"); // Redirect to login page if no token
    }
  }, [navigate]);

  return isAuthenticated ? (
    <div> <BusList/> {/* Your dashboard UI here */} </div>
  ) : (
    <div>Redirecting to login...</div> // You can add a loader or message
  );
};

export default UserDashboard