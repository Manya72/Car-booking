import Navbar from './components/Navbar/Navbar';
export default function Home() {
  return (
    <main >
      
     <div >
     <Navbar/>
      <h1>Welcome to [Car Wash Name]!</h1>
      <p>
        This is Car - wash boking System.
      </p>
      <p>
        Book your car wash online in a few simple steps. Sign up for an account for
        faster booking and convenient access to your booking history (optional).
      </p>
      <a href="/signup" className="signup-button">Sign Up</a> /
    
      <a href="/login" className="signup-button">Login</a>
    </div>
    </main>
  );
}
