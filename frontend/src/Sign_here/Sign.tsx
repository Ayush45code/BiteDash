import { useState } from "react";
import { Cross } from "../Icons/Cross";
import { userAPI } from "../services/api";

type ChildProps = {
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin?: (user: any) => void;
  initialMode?: string;
};

export const Sign = ({ setopen, onLogin, initialMode = "Signin" }: ChildProps) => {
  const [sign, setsign] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = { name, email, password };
      let data;
      
      if (sign === "Signin") {
        data = await userAPI.login(userData);
      } else {
        data = await userAPI.register(userData);
      }

      if (data.success) {
        if (sign === "Signin") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login successful!");
          if (onLogin) {
            onLogin(data.user);
          }
          setopen(false);
        } else {
          alert("Account created successfully! Please login.");
          setsign("Signin");
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || "Server error");
      } else if (err.request) {
        setError("Network error. Please check if server is running.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 bg-slate-200 flex justify-center z-[999] items-center">
      <div className="relative bg-white shadow-lg p-5 rounded-xl w-96">
        <div className="flex justify-between items-center mb-4">
          {sign === "Signin" ? (
            <div className="text-2xl font-bold">Login</div>
          ) : (
            <div className="text-2xl font-bold">Sign Up</div>
          )}
          <div
            onClick={() => setopen(false)}
            className="cursor-pointer hover:bg-red-100 p-1 rounded"
          >
            <Cross />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {sign !== "Signin" && (
            <input
              className="border-2 p-2 rounded"
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            className="border-2 p-2 rounded"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border-2 p-2 rounded"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Loading..." : sign === "Signin" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="flex my-3 items-start">
          <input className="mt-1" type="checkbox" />
          <div className="text-xs text-slate-500 ml-1">
            By continuing I agree to the terms of use & privacy policy
          </div>
        </div>

        {sign !== "Signin" && (
          <div className="text-xs text-slate-500 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setsign("Signin")}
              className="cursor-pointer text-orange-500 hover:underline"
            >
              Login here
            </span>
          </div>
        )}

        {sign === "Signin" && (
          <div className="text-xs text-slate-500 text-center">
            Create a new account?{" "}
            <span
              onClick={() => setsign("Signup")}
              className="cursor-pointer text-orange-500 hover:underline"
            >
              Click here
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
