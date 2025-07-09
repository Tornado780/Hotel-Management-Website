import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            credentials: "include", // ✅ needed for cookies
            });

            const data = await res.json();
            console.log("Login response:", data);

            if (res.ok) {
            // ✅ Optional: preload the user info from cookie
            const userRes = await fetch("http://localhost:5000/api/auth/me", {
                credentials: "include", // again, for cookies
            });

            const user = await userRes.json();
            console.log("Fetched user after login:", user);

            alert("Login successful!");

            // ✅ Navigate only after user is available
            navigate("/");
                } else {
                alert(data.message || "Login failed");
                }
            } catch (err) {
                console.error("Login error:", err);
                alert("Login request failed");
            }
    };

  

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Login</h2>

      <input
        className="border px-4 py-2 rounded"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        className="border px-4 py-2 rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
