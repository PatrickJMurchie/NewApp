import React, { useState } from 'react';
import Register from './pages/register';
import Login from './pages/login';
import ProjectsPage from './pages/projects';
import ProjectList from './pages/projectsList';
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
  } else if (currentPage === 'projectList' && isLoggedIn) {
    page = <ProjectList onLogout={handleLogout} />;
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
              <li><button onClick={() => setCurrentPage('projects')}>Create Project</button></li>
              <li><button onClick={() => setCurrentPage('projectList')}>Project List</button></li>
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
  return (

    <div>
      <h1>Welcome to Qudget</h1>
      <p>Qudget is a website designed to help you prepare quotes and budgets for project bids. Our platform allows you to:</p>
      <ul>
        <li>Enter time periods of work for your projects</li>
        <li>Define hourly or daily rates for your workers</li>
        <li>Calculate final budget figures using a sensible function</li>
        <li>Display information on how the final budget figure was calculated</li>
        <li>Create and access your own user accounts</li>
        <li>Save and delete quotes using our database</li>
        <li>Change existing quotes</li>
        <li>Add non-human resources to the calculation</li>
        <li>Select different pay grades such as "subject expert" or "casual worker"</li>
        <li>Keep hourly or daily rates private from users using our "fudge factor"</li>
      </ul>
      <p>With Qudget, you can save time and make more accurate project bids.</p>
    </div>
  );
}

export default App;
