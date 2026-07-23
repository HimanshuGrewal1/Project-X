import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ForgotPassword() {
  const { forgotPassword } = useAuthStore();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword(email);

    setStep("sent");
  };

  return (
    <div
      className="grid place-items-center h-full w-full min-h-screen font-['Poppins',sans-serif]"
      style={{ background: "linear-gradient(to right, #0f172a, #2563eb)" }}
    >
      <div className="wrapper overflow-hidden max-w-[390px] w-full bg-white p-[30px] rounded-[5px] shadow-[0px_15px_20px_rgba(0,0,0,0.1)]">

        {step === "email" && (
          <div id="step-email">
            <div className="title text-[28px] font-semibold text-center mb-[10px]">Forgot Password?</div>
            <p className="text-center text-[#666] text-[14px] mb-[25px]">
              Enter your registered email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field btn group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[25px]">
                <div
                  className="btn-layer h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-[400ms] ease-in-out group-hover:left-0"
                  style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
                />
                <input
                  type="submit"
                  value="Send Reset Link"
                  className="h-full w-full z-[1] relative bg-transparent border-none text-white pl-0 rounded-[5px] text-[18px] font-medium cursor-pointer"
                />
              </div>
            </form>
            <div className="text-center mt-[25px] text-[14px]">
              <Link to="/login" className="text-[#2563eb] no-underline hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {step === "sent" && (
          <div id="step-sent" className="text-center">
            <div className="mb-[20px] flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-[#2563eb]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="title text-[24px] font-semibold mb-[10px]">Check your email</div>
            <p className="text-[#666] text-[14px] mb-[20px]">
              If an account exists for <span className="font-medium text-black">{email}</span>, a password reset
              link has been sent. The link expires in 30 minutes.
            </p>
            <div className="text-center mt-[15px] text-[14px]">
              <Link to="/login" className="text-[#2563eb] no-underline hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
