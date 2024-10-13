import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';
import useAuth from '@/hooks/useAuth';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const initialIsRegistered = location.state?.initialIsRegistered ?? true;
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);

  useEffect(() => {
    if (!loading && user)
      navigate('/network');
  }, [loading, user, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          {isRegistered ? <LoginForm /> : <RegisterForm />}

          <p className="text-sm text-center text-gray-600 mt-4">
            {isRegistered ? "Don't have an account?" : "Already registered?"}{' '}
            <button
              type="button"
              className="text-indigo-500 hover:underline"
              onClick={() => setIsRegistered(!isRegistered)}
            >
              {isRegistered ? 'Sign up' : 'Log in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;