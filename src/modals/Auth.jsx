import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSellerLogin = () => {
    setShowUserLogin(false);
    window.location.href = "http://localhost:5173/seller";
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-white text-gray-700"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 w-[90%] sm:w-[360px] p-8 rounded-xl shadow-2xl border border-gray-100 bg-white"
      >
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex justify-center text-indigo-500 text-3xl mb-2">
            <FaUserAlt />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500">
            {state === "login"
              ? "Login to continue"
              : "Sign up to get started"}
          </p>
        </div>

        {/* Name */}
        {state === "register" && (
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your full name"
              className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            required
          />
        </div>

        {/* Toggle form & seller link */}
        <div className="text-sm text-gray-600 w-full">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-indigo-500 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-indigo-500 font-medium cursor-pointer hover:underline"
              >
                Register
              </span>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleSellerLogin}
                  className="w-full text-center mt-3 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 rounded-md transition-all"
                >
                  Login as Seller
                </button>
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium w-full py-2 mt-2 rounded-md transition-all"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
