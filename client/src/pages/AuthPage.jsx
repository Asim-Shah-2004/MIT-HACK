import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/authPage/RegisterForm';
import LoginForm from '@/components/authPage/LoginForm';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const initialIsRegistered = location.state?.initialIsRegistered ?? true;
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);

  useEffect(() => {
    if (!loading && user)
      navigate('/network');
  }, [loading, user, navigate]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-indigo-100 to-purple-100'} flex items-center justify-center p-4`}>
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full border-2 border-gray-400 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} hover:bg-gray-500`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded-xl shadow-xl overflow-hidden`}>
        <div className="p-6">
          {isRegistered ? <LoginForm /> : <RegisterForm />}

          <p className={`text-sm text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isRegistered ? "Don't have an account?" : "Already registered?"}{' '}
            <button
              type="button"
              className={`text-indigo-500 hover:underline ${isDarkMode ? 'hover:text-indigo-300' : ''}`}
              onClick={() => setIsRegistered(!isRegistered)}
            >
              {isRegistered ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
