import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import SignupPage from "./pages/LoginSignup";
import ResetPassword from "./pages/reset-password";
//import LoginPage from "./Pages/LoginPage";
import HomePage from "./pages/Dashboard";
import EmailVerificationPage from "./pages/email-verification";
import ForgotPasswordPage from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore"
import LoadingSpinner from "./components/LoadingSpinner";
import ProjectPage from "./pages/Project";
import { ReactFlowProvider } from "@xyflow/react";


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
    
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user?.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user,isVerified } = useAuthStore();
	console.log("RedirectAuthenticatedUser - isAuthenticated:", isAuthenticated, "user:", user);

	if (isAuthenticated && isVerified) {
		return <Navigate to='/home' replace />;
	}

	return children;
};

export default function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div
				>
	
           {/* <Navbar/> */}
			<Routes>
			
          <Route path='/' element={<LandingPage />} />
        <Route
          path='/home'
          element={
             <ProtectedRoute>
              <HomePage />
             </ProtectedRoute>
          }
        />
			
				
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignupPage />
						</RedirectAuthenticatedUser>
					}
				/>
						{/* <Route
					path='/map'
					element={
				<ReactFlowProvider>
							<MindMap />
						</ReactFlowProvider>
					}
				/> */}
						{/* <Route
					path='/project/:projectId'
					element={
				<ReactFlowProvider>
							<MindMap2 />
						</ReactFlowProvider>
					}
				/> */}
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<SignupPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route 
				 path={`/project/:projectId`}
				 element={
					<ProtectedRoute>
						<ProjectPage />
					</ProtectedRoute>
				}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPassword />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

