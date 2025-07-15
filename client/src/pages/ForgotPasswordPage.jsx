import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        alert(data.message || "Request failed");
      }
    } catch (err) {
      console.error("Forgot-password error:", err);
      alert("Request failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {sent ? (
          <div className="p-6 bg-green-50 border border-green-400 rounded">
            <h2 className="text-lg font-semibold text-green-700">
              Check your inbox!
            </h2>
            <p className="mt-2 text-sm">
              We’ve emailed a reset link to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold text-center">
              Forgot Password
            </h2>

            <input
              className="border px-4 py-2 rounded"
              type="email"
              placeholder="Your account email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded cursor-pointer active:scale-95 transition-all"
            >
              Send reset link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
