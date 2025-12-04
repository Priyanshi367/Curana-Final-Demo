import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logonew.png";
import hospitalBg from "@/assets/hospital-login-bg.jpg";


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hospitalBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-card rounded-3xl shadow-elegant p-12 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Curana Hub" className="h-24 w-auto" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold mb-3 text-foreground">
            Welcome to Curana Hub
          </h1>
          
          {/* Tagline */}
          <p className="text-muted-foreground mb-10 text-lg">
            Your digital workspace for collaboration, care, and connection.
          </p>

          {/* Sign In Button */}
          <Button
            onClick={handleLogin}
            className="w-full h-14 text-lg font-medium bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity rounded-full"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
              <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
              <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
              <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft 365
          </Button>

          {/* Footer */}
          <p className="text-sm text-muted-foreground mt-12">
            © 2025 Curana Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
