import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}