import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CalendarDays, Lock, Mail, User } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/auth/InputField';
import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authProvider';
import {
  PASSWORD_MIN_LENGTH,
  isValid,
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validateNewPassword,
  validateRequired,
} from '../../utils/validators';

const GATE_YEARS = [2027, 2028, 2029];

const INITIAL = {
  fullName: '',
  email: '',
  targetYear: '',
  password: '',
  confirmPassword: '',
};

const validate = (v) => ({
  fullName: validateFullName(v.fullName),
  email: validateEmail(v.email),
  targetYear: validateRequired(v.targetYear, 'Target GATE year'),
  password: validateNewPassword(v.password),
  confirmPassword: validateConfirmPassword(v.password, v.confirmPassword),
});

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const all = validate(values);
    setErrors((prev) => {
      const next = { ...prev, [name]: all[name] };
      // Keep the confirm field in sync when the password changes
      if (name === 'password' && values.confirmPassword) next.confirmPassword = all.confirmPassword;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) return;

    setLoading(true);
    setFormError('');
    try {
      await register({
        name: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        gate_target_year: Number(values.targetYear),
        password: values.password,
        confirm_password: values.confirmPassword,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if(err.response?.data) {
        const data = err.response.data;
        if(typeof data === 'object' && !data.detail && !data.message) {
          const fieldMap = {
            name: 'fullName',
            gate_target_year: 'targetYear',
            confirm_password: 'confirmPassword',
            email: 'email',
            password: 'password',
          };
          const mappedErrors = {};
          Object.entries(data).forEach(([key, messages]) => {
            const mappedKey = fieldMap[key] || key;
            mappedErrors[mappedKey] = Array.isArray(messages) ? messages[0] : messages;

          });
          setErrors(mappedErrors);
        }
        setFormError(data.detail || data.message || 'Registration failed. Please check your inputs.');

      } else {
        setFormError(err.message || 'Unable to connect to server.');
      }
      // if (err.fieldErrors && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
      // setFormError(err.status === 409 ? 'An account with this email already exists.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking your GATE CS preparation today."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Sign in
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
          label="Full name"
          name="fullName"
          icon={User}
          placeholder="Your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          disabled={loading}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          disabled={loading}
        />

        {/* Target year: native select styled to match InputField */}
        <div>
          <label
            htmlFor="targetYear"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Target GATE year
          </label>
          <div className="relative">
            <CalendarDays
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />
            <select
              id="targetYear"
              name="targetYear"
              value={values.targetYear}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              aria-invalid={Boolean(errors.targetYear)}
              aria-describedby={errors.targetYear ? 'targetYear-error' : undefined}
              className={[
                'block w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-4',
                'dark:bg-slate-900 dark:text-slate-100 disabled:cursor-not-allowed disabled:opacity-60',
                !values.targetYear ? 'text-slate-400 dark:text-slate-500' : '',
                errors.targetYear
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-slate-700',
              ].join(' ')}
            >
              <option value="" disabled>
                Select your target year
              </option>
              {GATE_YEARS.map((year) => (
                <option key={year} value={year} className="text-slate-900">
                  GATE {year}
                </option>
              ))}
            </select>
          </div>
          {errors.targetYear && (
            <p id="targetYear-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.targetYear}
            </p>
          )}
        </div>

        <InputField
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          showToggle
          placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          autoComplete="new-password"
          hint={`Minimum ${PASSWORD_MIN_LENGTH} characters, with a letter and a number.`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          disabled={loading}
        />

        <InputField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          showToggle
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          disabled={loading}
        />

        <AuthButton loading={loading} loadingText="Creating account...">
          Create account
        </AuthButton>
      </form>
    </AuthLayout>
  );
}