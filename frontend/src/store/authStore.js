// import { create } from "zustand";
// import axios from "axios";
// const API_URLL = import.meta.env.VITE_API_URL;
// // const API_URL ="/api/auth";
//  const API_URL=`${API_URLL}/api/auth`

// axios.defaults.withCredentials = true;

// export const useAuthStore = create((set) => ({
// 	user: null,
// 	isAuthenticated: false,
// 	error: null,
// 	isLoading: false,
// 	isCheckingAuth: true,
// 	message: null,
// 	isVerified: false,

// 	signup: async (email, password, name) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
// 			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
// 		} catch (error) {
// 			set({ error: error.response.data.message || "Error signing up", isLoading: false });
// 			throw error;
// 		}
// 	},
// 	login: async (email, password) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/login`, { email, password });
			
// 			set({
// 				isAuthenticated: true,
// 				user: response.data.user,
// 				error: null,
// 				isLoading: false,
// 			});

// 		} catch (error) {
// 			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
// 			throw error;
// 		}
// 		return response;
// 	},

// 	logout: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			await axios.post(`${API_URL}/logout`);
// 			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
// 		} catch (error) {
// 			set({ error: "Error logging out", isLoading: false });
// 			throw error;
// 		}
// 	},
// 	verifyEmail: async (code) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/verify-email`, { code });
// 			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
// 			return response.data;
// 		} catch (error) {
// 			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
// 			throw error;
// 		}
// 	},
// 	checkAuth: async () => {
// 		set({ isCheckingAuth: true, error: null });
// 		try {
// 			const response = await axios.get(`${API_URL}/check-auth`,{
// 				withCredentials: true,
// 			});
// 			console.log("checkAuth response:", response);
// 			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
// 		} catch (error) {
// 			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
// 		}
// 	},
// 	forgotPassword: async (email) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/forgot-password`, { email });
// 			set({ message: response.data.message, isLoading: false });
// 		} catch (error) {
// 			set({
// 				isLoading: false,
// 				error: error.response.data.message || "Error sending reset password email",
// 			});
// 			throw error;
// 		}
// 	},
// 	resetPassword: async (token, password) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
// 			set({ message: response.data.message, isLoading: false });
// 		} catch (error) {
// 			set({
// 				isLoading: false,
// 				error: error.response.data.message || "Error resetting password",
// 			});
// 			throw error;
// 		}
// 	},
// }));


import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URLL}/api/auth`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        isLoading: false,
      });

      throw err;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });

      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await axios.post(`${API_URL}/logout`);

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Logout failed",
        isLoading: false,
      });

      throw err;
    }
  },

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
      error: null,
    });

    try {
      const { data } = await axios.get(`${API_URL}/check-auth`);

      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/verify-email`, { code });

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Verification failed",
        isLoading: false,
      });

      throw err;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });

      set({
        message: data.message,
        isLoading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to send email",
        isLoading: false,
      });

      throw err;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(
        `${API_URL}/reset-password/${token}`,
        { password }
      );

      set({
        message: data.message,
        isLoading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Reset failed",
        isLoading: false,
      });

      throw err;
    }
  },
}));