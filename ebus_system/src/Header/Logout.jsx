import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  let role = localStorage.getItem('ROLE'); // Get user role from localStorage, default to 'user'
  let navigate=useNavigate();

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

  useEffect(()=>{
    handleLogout()
  })

  return (
    <div>Logout</div>
  )
}

export default Logout