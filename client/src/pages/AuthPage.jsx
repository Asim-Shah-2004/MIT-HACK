import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from "sonner";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthPage = () => {
  const location = useLocation();
  const initialIsRegistered = location.state?.initialIsRegistered ?? true;
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);

  return (
    <>
      <Toaster position="top-right" richColors />

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
    </>
  );
}

export default AuthPage;