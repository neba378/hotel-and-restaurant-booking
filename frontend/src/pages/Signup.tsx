import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
      contactDetails: {
        phone,
        address,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500); // Redirect after 1.5s
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Signup"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      phone={phone}
      setPhone={setPhone}
      address={address}
      setAddress={setAddress}
      role={role}
      setRole={setRole}
      handleSubmit={handleSubmit}
      error={error}
      success={success} // ✅ Pass success prop
    />
  );
};

export default Signup;
