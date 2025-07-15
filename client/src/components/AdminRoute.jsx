// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then(res => res.ok ? res.json() : null)
      .then(user => {
        if (user?.role === "admin") {
          setAuthorized(true);
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Checking access...</p>;

  return authorized ? children : null;
}
