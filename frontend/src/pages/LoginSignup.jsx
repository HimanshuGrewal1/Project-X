import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginSignup() {
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    login,
    signup,
    isLoading,
    error,
  } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup(
        signupData.name,
        signupData.email,
        signupData.password
      );

      navigate("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="grid place-items-center h-full w-full min-h-screen font-['Poppins',sans-serif] p-4"
      style={{ background: "linear-gradient(to right, #0f172a, #2563eb)" }}
    >
      <div className="wrapper overflow-hidden w-full max-w-[390px] bg-white p-[30px] rounded-[5px] shadow-[0px_15px_20px_rgba(0,0,0,0.1)]">

        <div
          className="title-text flex w-[200%] transition-all duration-[600ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
          style={{ marginLeft: isLogin ? "0%" : "-100%" }}
        >
          <div className="title w-1/2 text-[35px] font-semibold text-center text-slate-800">Login Form</div>
          <div className="title w-1/2 text-[35px] font-semibold text-center text-slate-800">Signup Form</div>
        </div>

        <div className="form-container w-full overflow-hidden">
          <div className="slide-controls relative flex h-[50px] w-full overflow-hidden my-[30px] mt-[30px] mb-[10px] justify-between border border-[lightgrey] rounded-[5px]">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`slide h-full w-full text-[18px] font-medium text-center leading-[48px] z-[1] transition-all duration-[600ms] ease-in-out ${
                isLogin ? "text-white cursor-default" : "text-black cursor-pointer"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`slide h-full w-full text-[18px] font-medium text-center leading-[48px] z-[1] transition-all duration-[600ms] ease-in-out ${
                !isLogin ? "text-white cursor-default" : "text-black cursor-pointer"
              }`}
            >
              Signup
            </button>
            <div
              className="slider-tab absolute h-full w-1/2 z-0 rounded-[5px] transition-all duration-[600ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
              style={{
                left: isLogin ? "0%" : "50%",
                background: "linear-gradient(to right, #0f172a, #2563eb)",
              }}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">
              {error}
            </p>
          )}

          <div
            className="form-inner flex w-[200%] transition-all duration-[600ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            style={{ marginLeft: isLogin ? "0%" : "-100%" }}
          >
            <form className="login w-1/2 pr-[10px]" onSubmit={handleLogin}>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={loginData.email}
                  onChange={(e)=>
                    setLoginData({
                      ...loginData,
                      email:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e)=>
                    setLoginData({
                      ...loginData,
                      password:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="pass-link mt-[15px]">
                <Link to="/forgot-password" className="text-[#2563eb] no-underline hover:underline text-[15px]">
                  Forgot password?
                </Link>
              </div>
              <div className="field btn group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[20px]">
                <div
                  className="btn-layer h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-[400ms] ease-in-out group-hover:left-0"
                  style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
                />
                <input
                  type="submit"
                  value={isLoading ? "Loading..." : "Login"}
                  disabled={isLoading}
                  className="h-full w-full z-[1] relative bg-transparent border-none text-white pl-0 rounded-[5px] text-[20px] font-medium cursor-pointer"
                />
              </div>
              <div className="signup-link text-center mt-[30px]">
                Not a member?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-[#2563eb] no-underline hover:underline font-medium"
                >
                  Signup now
                </button>
              </div>
            </form>

            <form className="signup w-1/2 pl-[10px]" onSubmit={handleSignup}>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={signupData.name}
                  onChange={(e)=>
                    setSignupData({
                      ...signupData,
                      name:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={signupData.email}
                  onChange={(e)=>
                    setSignupData({
                      ...signupData,
                      email:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={(e)=>
                    setSignupData({
                      ...signupData,
                      password:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field h-[50px] w-full mt-[20px]">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={signupData.confirmPassword}
                  onChange={(e)=>
                    setSignupData({
                      ...signupData,
                      confirmPassword:e.target.value
                    })
                  }
                  className="h-full w-full outline-none pl-[15px] rounded-[5px] border border-[lightgrey] border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-[#3b82f6] placeholder:text-[#999] focus:placeholder:text-[#b3b3b3]"
                />
              </div>
              <div className="field btn group h-[50px] w-full rounded-[5px] relative overflow-hidden mt-[20px]">
                <div
                  className="btn-layer h-full w-[300%] absolute left-[-100%] rounded-[5px] transition-all duration-[400ms] ease-in-out group-hover:left-0"
                  style={{ background: "linear-gradient(to right, #0f172a, #2563eb, #0f172a, #2563eb)" }}
                />
                <input
                  type="submit"
                  value={isLoading ? "Loading..." : "Signup"}
                  disabled={isLoading}
                  className="h-full w-full z-[1] relative bg-transparent border-none text-white pl-0 rounded-[5px] text-[20px] font-medium cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}