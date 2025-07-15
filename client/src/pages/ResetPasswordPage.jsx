import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams(); // token comes from the email link
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: form.password }),
        }
      );

      if (res.ok) {
        alert("Password updated. Please log in.");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Reset failed");
      }
    } catch (err) {
      console.error("Reset-password error:", err);
      alert("Request failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold text-center">Set New Password</h2>

        <input
          className="border px-4 py-2 rounded"
          type="password"
          placeholder="New password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <input
          className="border px-4 py-2 rounded"
          type="password"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Update password
        </button>
      </form>
    </div>
  );
}
