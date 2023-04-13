import React, { useState } from 'react';
import Register from './pages/register';
import Login from './pages/login';
import ProjectsPage from './pages/projects';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true);
    setCurrentPage('projects');
  }

  const handleLogout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  }

  // render the appropriate page based on the state variable
  let page;
  if (currentPage === 'home') {
    page = <HomePage />;
  } else if (currentPage === 'login') {
    page = <Login handleLogin={handleLogin} />;
  } else if (currentPage === 'register') {
    page = <Register />;
  } else if (currentPage === 'projects' && isLoggedIn) {
    page = <ProjectsPage onLogout={handleLogout} />;
  } else if (isLoggedIn) {
    page = <h1>Access Denied</h1>; // show this if logged in but on an invalid page
  } else {
    page = <Login handleLogin={handleLogin} />; // show login page if not logged in
  }

  return (
    <div>
      <nav>
      <h1 id="Title">Qudget</h1>
        <ul>
          <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
          {!isLoggedIn && (
            <>
              <li><button onClick={() => setCurrentPage('login')}>Login</button></li>
              <li><button onClick={() => setCurrentPage('register')}>Register</button></li>
              </>
          )}
          {isLoggedIn && (
            <>
              <li><button onClick={() => setCurrentPage('projects')}>Projects</button></li>
              <li><button onClick={() => handleLogout()}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
      {page}
    </div>
  );
}


function HomePage() {
  return <h1>Home Page</h1>;
}

export default App;
