import { useEffect } from "react";
import { QueryProvider } from "@/api/QueryProvider";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuthStore from "./stores/authStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!bg-black !text-white !rounded-full !px-5 !py-3 !text-sm",
        }}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/coupon/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </QueryProvider>
  );
}

export default App;
