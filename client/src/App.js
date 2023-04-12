import React, { useState } from 'react';
import Register from './pages/register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // render the appropriate page based on the state variable
  let page;
  if (currentPage === 'home') {
    page = <HomePage />;
  } else if (currentPage === 'login') {
    page = <LoginPage />;
  } else if (currentPage === 'register') {
    page = <Register />;
  }

  return (
    <div>
      <nav>
        <ul>
          <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
          <li><button onClick={() => setCurrentPage('login')}>Login</button></li>
          <li><button onClick={() => setCurrentPage('register')}>Register</button></li>
        </ul>
      </nav>
      {page}
    </div>
  );
}

function HomePage() {
  return <h1>Home Page</h1>;
}

function LoginPage() {
  return <h1>Login Page</h1>;
}

export default App;
