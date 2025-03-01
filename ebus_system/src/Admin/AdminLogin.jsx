import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase.js"; // Import Firebase authentication
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {

  let navigate=useNavigate();

  let [adminData,setAdminData]=useState({
    username:"",
    password:""
  })

  let [error, setError] = useState("");

  let{username,password}=adminData;

  let handleInput=(e)=>{
    let{name,value}=e.target;
    setAdminData({...adminData,[name]:value})
  }

  let handleSubmit= async(e)=>{
    e.preventDefault();
    setError("");
    console.log(adminData);

    try {
      // Assuming username is used as email for login
      await signInWithEmailAndPassword(auth, username, password);
      navigate('/admin/dashboard')
      // Redirect to admin dashboard or homepage after successful login
      console.log("Login successful!");
       // Store token and role in localStorage
      localStorage.setItem("TOKEN", 'AdminLogin');
      localStorage.setItem('ROLE', 'admin'); // After successful admin login
      // Navigate to admin dashboard
      // navigate("/admin-dashboard"); (You can add this if you're using react-router)
    } catch (e) {
      setError("Invalid username or password");
    }

    setAdminData({
      username:"",
      password:""
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 primary">
      <div className="bg-white dark:bg-gray-800  shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-primary dark:text-primary mb-6 uppercase">Admin Login</h1>
        
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>  
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-primary dark:text-primary mb-1 uppercase">
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-4 secondary dark:secondary border border-r-0 border-primary dark:border-primary rounded-l-md">
                <i className="fas fa-user-circle text-primary dark:text-primary"></i>
              </span>
              <input
                type="text"
                id="username"
                className="flex-1 rounded-r-md secondary dark:secondary border border-primary dark:border-primary  dark:text-white focus:ring-blue-500 focus:border-primary block w-full p-2.5"
                placeholder="Enter your username"
                name="username" value={username} onChange={handleInput}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary dark:text-primary mb-1 uppercase">
              Password
            </label>
            <div className="flex">
            <span className="inline-flex items-center px-4 secondary dark:secondary border border-r-0 border-primary dark:border-primary rounded-l-md">
              <i className="fas fa-lock text-primary dark:text-primary"></i>
            </span>
             
              <input
                type="password"
                id="password"
                className="flex-1 rounded-r-md secondary dark:secondary border border-primary dark:border-primary text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your password"
                name="password" value={password} onChange={handleInput}
              />
            </div>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full primary text-white text-[19px] font-medium uppercase py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
