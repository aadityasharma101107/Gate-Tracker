import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/auth/InputField';
import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authProvider';
import { isValid, validateIdentifier, validateRequired } from '../../utils/validators';
import axios from 'axios';

const INITIAL = { identifier: '', password: '', remember: false };

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const [email, setEmail] = useState('');
  // const [password,setPassword] = useState('');
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (v) => ({
    identifier: validateIdentifier(v.identifier),
    password: validateRequired(v.password, 'Password'),
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear the field error as soon as the user starts fixing it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'remember') return;
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) return;

    setLoading(true);
    setFormError('');
    try {
      // await login({
      //   identifier: values.identifier.trim(),
      //   password: values.password,
      //   remember: values.remember,
      // });
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: values.identifier.trim(), // or email, depending on your Django USERNAME_FIELD
        password: values.password,
      });

      // 2. Pass the access token to the context login helper
      login(response.data.access);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if(err.response?.data) {
        const data = err.response.data;
        const msg = data.detail || data.non_field_errors?.[0] || 'Invalid credentials or request.';
        setFormError(msg);
      } else {
        setFormError(err.message || 'Unable to connect to server.');
      }

      // if (err.fieldErrors && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
      // setFormError(err.status === 401 ? 'Incorrect email/ID or password.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your GATE CS preparation."
      footer={
        <>
          New to GATE CS Tracker?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <InputField
          label="Email / Enrollment ID"
          name="identifier"
          type="text"
          icon={Mail}
          placeholder="you@example.com or enrollment ID"
          autoComplete="username"
          value={values.identifier}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.identifier}
          disabled={loading}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          showToggle
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          disabled={loading}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton loading={loading} loadingText="Signing in...">
          Sign in
        </AuthButton>
      </form>
    </AuthLayout>
  );
}