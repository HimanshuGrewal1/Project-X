import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/authStore"; 
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
const navigate = useNavigate();

const {
  verifyEmail,
  isLoading,
  error,
  user,
} = useAuthStore();

console.log("User in VerifyEmail:", user); // Debugging line

const [otp, setOtp] = useState(new Array(6).fill(""));
const [isVerified, setIsVerified] = useState(false);
const [resendText, setResendText] = useState("Resend");
const inputRefs = useRef([]);


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Focus previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const code = otp.join("");

  if (code.length !== 6) {
    return;
  }

  try {
    await verifyEmail(code);

    setIsVerified(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (err) {
    console.error(err);
  }
};

  const handleResend = (e) => {
    e.preventDefault();
    // TODO: Replace with real backend resend logic
    setResendText("Code sent");
  };

  return (
    <div className="bg-gradient-to-right from-slate-900 to-blue-600 grid place-items-center min-h-screen font-sans p-4 select-none">
      <div className="overflow-hidden max-w-[390px] w-full bg-white p-[30px] rounded-[5px] shadow-[0px_15px_20px_rgba(0,0,0,0.1)]">
    
        {!isVerified ? (
          <div>
            <div className="text-[28px] font-semibold text-center mb-[10px]">Verify your email</div>
            <p className="text-center text-gray-500 text-[14px] mb-[25px]">
              We sent a 6-digit code to <span className="font-medium text-black">{user?.email}</span>
            </p>
{error && (
  <p className="text-red-500 text-center mt-4">
    {error}
  </p>
)}
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between gap-2 mt-[20px]">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-[50px] w-[45px] text-center outline-none rounded-[5px] border border-gray-300 border-b-2 text-[20px] focus:border-blue-500 transition-all duration-300 ease-in-out"
                  />
                ))}
              </div>

              {/* Hover effect styled via group utility */}
              <div className="group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[25px] cursor-pointer">
                <div 
                  className="h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-400 ease-[ease] group-hover:left-0" 
                  style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
                />
               <button
  type="submit"
  disabled={isLoading}
  className="h-full w-full z-[1] relative bg-transparent border-none text-white rounded-[5px] text-[18px] font-medium"
>
    {isLoading ? "Verifying..." : "Verify"}
</button>
                  
              </div>
            </form>

            <div className="text-center mt-[20px] text-[14px] text-gray-500">
              Didn't get a code?{" "}
              <a href="#" onClick={handleResend} className="text-blue-600 no-underline hover:underline">
                {resendText}
              </a>
            </div>
            <div className="text-center mt-[15px] text-[14px]">
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
            <div className="text-[24px] font-semibold mb-[10px]">Email verified</div>
            <p className="text-gray-500 text-[14px] mb-[20px]">Your email has been verified. You can now log in to your account.</p>
            
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