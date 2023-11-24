import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // useNavigate dùng để điều hướng trang, không gây reload
  let navigate = useNavigate();
  return (
    <div>
      <div className="container h-20 flex items-center justify-between">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="font-medium text-red-500 text-3xl"
        >
          CyberFlix
        </span>
        <button
          onClick={() => {
            // navigate("/login");
            window.location.href = "/login";
            // windown => reload lại trang => dữ liệu trên redux sẽ mất
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
