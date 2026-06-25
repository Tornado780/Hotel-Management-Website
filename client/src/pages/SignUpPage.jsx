import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage({ setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      try {
        const loginRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const loginData = await loginRes.json();
        const token = loginData.token;
        if (token) {
          localStorage.setItem('authToken', token);
        }

        if (loginRes.ok) {
          const userRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
            credentials: "include",
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            setUser?.(userData);
            navigate("/");
            return;
          }

          if (loginData.user) {
            setUser?.(loginData.user);
            navigate("/");
            return;
          }
        }
      } catch (loginErr) {
        console.error("Auto-login after signup failed:", loginErr);
      }

      alert("Signup successful! Please log in.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Signup</h2>

      <input
        className="border px-4 py-2 rounded"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="border px-4 py-2 rounded"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="border px-4 py-2 rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Signup
      </button>
    </form>
  );
}
