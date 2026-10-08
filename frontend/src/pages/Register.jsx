import { useState } from "react";
// import "tailwindcss";/
import '../App.css';

const API_URL = "/api/register/"; // proxied to Django by vite.config.js
 
const BRANCHES = [
  { value: "CS", label: "Computer Science & IT" },
  { value: "EC", label: "Electronics & Communication" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "CE", label: "Civil Engineering" },
  { value: "CH", label: "Chemical Engineering" },
  { value: "IN", label: "Instrumentation Engineering" },
  { value: "OT", label: "Other" },
];
 
const currentYear = new Date().getFullYear();
const GATE_YEARS = Array.from({ length: 6 }, (_, i) => currentYear + i);
const today = new Date().toISOString().split("T")[0];
 
const initialForm = {
  name: "",
  dob: "",
  branch: "",
  gate_target_year: "",
  email: "",
  password: "",
  confirm_password: "",
};
 
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 " +
  "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";
 
function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
 
export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear the error for a field as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
 
  // Quick checks before hitting the server
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (!form.branch) e.branch = "Please select your branch.";
    if (!form.gate_target_year) e.gate_target_year = "Select your target year.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm_password)
      e.confirm_password = "Passwords do not match.";
    return e;
  };
 
  // DRF returns { field: ["msg", ...] } -> convert to { field: "msg" }
  const parseServerErrors = (data) => {
    const out = {};
    Object.entries(data).forEach(([key, val]) => {
      const msg = Array.isArray(val) ? val.join(" ") : String(val);
      out[key === "non_field_errors" || key === "detail" ? "form" : key] = msg;
    });
    return out;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }
 
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          gate_target_year: Number(form.gate_target_year),
        }),
      });
      const data = await res.json();
 
      if (res.ok) {
        setSuccess(data.student);
        setForm(initialForm);
      } else {
        setErrors(parseServerErrors(data));
      }
    } catch(error) {
      console.error("Fetch failed: ", error);
      setErrors({ form: "Could not reach the server. Please try again." });
    } finally {
      setLoading(false);
    }
  };
 
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-2xl font-semibold text-green-600">
            Registration successful 🎉
          </h2>
          <p className="mt-3 text-gray-700">
            Welcome, <span className="font-medium">{success.name}</span>!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {success.branch} · GATE {success.gate_target_year}
          </p>
          <button
            onClick={() => setSuccess(null)}
            className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Register another student
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-semibold text-gray-900">
          Student Registration
        </h1>
 
        {errors.form && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}
 
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Rahul Sharma"
            className={inputClass}
          />
        </Field>
 
        <Field label="Date of birth" error={errors.dob}>
          <input
            type="date"
            name="dob"
            max={today}
            value={form.dob}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
 
        <Field label="Branch" error={errors.branch}>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select branch</option>
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>
 
        <Field label="GATE target year" error={errors.gate_target_year}>
          <select
            name="gate_target_year"
            value={form.gate_target_year}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select year</option>
            {GATE_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
 
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </Field>
 
        <Field label="Password" error={errors.password}>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            className={inputClass}
          />
        </Field>
 
        <Field label="Confirm password" error={errors.confirm_password}>
          <input
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            autoComplete="new-password"
            className={inputClass}
          />
        </Field>
 
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
 
