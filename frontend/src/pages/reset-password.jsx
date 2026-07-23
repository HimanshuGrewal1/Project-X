import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function ResetPassword() {
  const { resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");

    await resetPassword(password);

    setIsDone(true);
  };

  return (
    <div className="bg-gradient-to-right from-slate-900 to-blue-600 grid place-items-center min-h-screen font-sans p-4 select-none">
      <div className="overflow-hidden max-w-[390px] w-full bg-white p-[30px] rounded-[5px] shadow-[0px_15px_20px_rgba(0,0,0,0.1)]">

        {!isDone ? (
          <div>
            <div className="text-[28px] font-semibold text-center mb-[10px]">Reset password</div>
            <p className="text-center text-gray-500 text-[14px] mb-[25px]">Enter a new password for your account.</p>

            <form onSubmit={handleSubmit}>
              <div className="field h-[50px] w-full mt-[20px]">
                <input 
                  type="password" 
                  placeholder="New password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-gray-300 border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-blue-500 placeholder:text-gray-400"
                />
              </div>
              <div className="field h-[50px] w-full mt-[20px]">
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-gray-300 border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-blue-500 placeholder:text-gray-400"
                />
              </div>
              
              {errorMsg && (
                <p className="text-red-600 text-[13px] mt-[8px]">{errorMsg}</p>
              )}

              <div className="group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[25px] cursor-pointer">
                <div 
                  className="h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-400 ease-[ease] group-hover:left-0" 
                  style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
                />
                <button 
                  type="submit" 
                  className="h-full w-full z-[1] relative bg-transparent border-none text-white rounded-[5px] text-[18px] font-medium pointer-events-none"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <div className="text-center mt-[25px] text-[14px]">
              <a href="/login" className="text-blue-600 no-underline hover:underline">Back to Login</a>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-[20px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-[24px] font-semibold mb-[10px]">Password reset</div>
            <p className="text-gray-500 text-[14px] mb-[20px]">Your password has been updated. You can now log in with your new password.</p>
            
            <div className="group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[10px]">
              <div 
                className="h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-400 ease-[ease] group-hover:left-0" 
                style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
              />
              <a href="/login" className="h-full w-full z-[1] relative bg-transparent border-none text-white rounded-[5px] text-[18px] font-medium flex items-center justify-center no-underline">
                Go to Login
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}