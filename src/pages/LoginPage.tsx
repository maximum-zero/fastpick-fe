import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import useAuthStore from "@/stores/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authLogin(data.accessToken, data.refreshToken, data.user);
      navigate("/");
    },
    onError: (err: any) => {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      console.error("Login failed:", err);
    },
  });

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ email, password });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 overflow-hidden px-4">
      <div className="max-w-md w-full bg-white p-10 border border-gray-100 shadow-sm rounded-2xl mx-4">
        <h1 className="text-2xl font-bold text-black text-center mb-10 tracking-tight">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="relative">
            <input
              type="email"
              className={`w-full py-3 border-b-2 ${emailError ? "border-red-500" : "border-gray-200"} focus:border-black outline-none transition-all text-[15px] text-black placeholder-gray-300`}
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="absolute text-[10px] text-red-500 mt-1 font-medium">
                {emailError}
              </p>
            )}
          </div>

          <div className="relative pt-1">
            <input
              type="password"
              className={`w-full py-3 border-b-2 ${passwordError ? "border-red-500" : "border-gray-200"} focus:border-black outline-none transition-all text-[15px] text-black placeholder-gray-300`}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="absolute text-[10px] text-red-500 mt-1 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold h-14 rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98] text-[15px] tracking-wider mt-6"
            disabled={isPending}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-10 text-center text-[13px] text-gray-500">
          회원이 아닌가요?{" "}
          <Link
            to="/signup"
            className="font-bold text-black underline underline-offset-4 decoration-1"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
