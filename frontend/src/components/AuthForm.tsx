import React from "react";

interface AuthFormProps {
  title: string;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  firstName?: string;
  setFirstName?: (firstName: string) => void;
  lastName?: string;
  setLastName?: (lastName: string) => void;
  role?: string;
  setRole?: (role: string) => void;
  phone?: string;
  setPhone?: (phone: string) => void;
  address?: string;
  setAddress?: (address: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error?: string | null; // ✅ Added error prop
  success?: string | null;
  
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  role,
  setRole,
  phone,
  setPhone,
  address,
  setAddress,
  handleSubmit,
  error, 
  success,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {title}
      </h2>

      {/* ✅ Error Message */}
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded text-center">
          {error}
        </div>
      ) || success && (
        <div className="mb-4 text-green-600 bg-green-100 p-2 rounded text-center">
            {success}
        </div>
        )}

      {firstName !== undefined && setFirstName && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      {lastName !== undefined && setLastName && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
        />
      </div>

      {role !== undefined && setRole && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}

      {phone !== undefined && setPhone && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      {address !== undefined && setAddress && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
      >
        {title}
      </button>
    </form>
  );
};

export default AuthForm;
