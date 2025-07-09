import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
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
