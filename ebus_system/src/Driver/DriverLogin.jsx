import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db, signInWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  let navigate= useNavigate();

  const [driverLogin, setDriverLogin] = useState({
    username: "",  // ✅ Changed from username to email
    password: "",
  });

  const { username, password } = driverLogin;
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverLogin({ ...driverLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      // Step 1: Query Firestore to check if the driver exists
      const driverRef = collection(db, "driver");
      console.log(driverRef);
      
      const q = query(driverRef, where("email", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No driver found with this email.");
        return;
      }

      // Step 2: Retrieve the driver document
      const driverDoc = querySnapshot.docs[0].data();
      const storedPassword = driverDoc.password; // Assuming you store password in Firestore (hashed ideally)

      // Step 3: Validate password
      if (password === storedPassword) {
        // If password matches, authenticate user with Firebase Authentication
        localStorage.setItem("TOKEN", username); // You can store the token
        localStorage.setItem("ROLE", "driver"); // Set role as driver

        alert("Login Successful!");
        // Navigate to driver dashboard here (using React Router or other methods)
        navigate("/driver/dashboard")
      } else {
        setError("Incorrect password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 primary">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-[#C40234] dark:text-white mb-6 uppercase">
            Driver Login
          </h1>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary dark:text-primary mb-1 uppercase"
              >
                Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 secondary dark:secondary border border-r-0 border-primary dark:border-primary rounded-l-md">
                  <i className="fas fa-user-circle text-primary dark:text-primary"></i>
                </span>
                <input
                  type="email"
                  id="username"
                  name="username"
                  className="flex-1 rounded-r-md secondary dark:secondary border border-primary dark:border-primary text-gray-900 dark:text-white focus:ring-[#C40234] focus:border-[#C40234] block w-full p-2.5"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary dark:text-primary mb-1 uppercase"
              >
                Password
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 secondary dark:secondary border border-r-0 border-primary dark:border-gray-600 rounded-l-md">
                  <i className="fas fa-lock text-primary dark:text-primary"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="flex-1 rounded-r-md secondary dark:secondary border border-primary dark:border-primary text-gray-900 dark:text-white focus:ring-[#C40234] focus:border-[#C40234] block w-full p-2.5"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#C40234] hover:bg-[#C40234] text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C40234] focus:ring-opacity-50 uppercase"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DriverLogin;
