import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles/common.css";
import "./styles/custom.css";
import Admin from "./layouts/Admin";
import Vendor from "./layouts/Vendor";
import Auth from "./layouts/Auth";

function App() {
  const [helperlah_isAdminAuthenticated, sethelperlah_isAdminAuthenticated] =
    useState(false);
  const [helperlah_isVendorAuthenticated, sethelperlah_isVendorAuthenticated] =
    useState(false);

  const loginAsAdmin = () => {
    localStorage.setItem("helperlah_isAdminAuthenticated", true);
    sethelperlah_isAdminAuthenticated(true);
  };

  const loginAsVendor = () => {
    localStorage.setItem("helperlah_isVendorAuthenticated", true);
    sethelperlah_isVendorAuthenticated(true);
  };

  const logout = async () => {
    try {
      toast.success("Logged out successfully");
      sethelperlah_isAdminAuthenticated(false);
      sethelperlah_isVendorAuthenticated(false);
      localStorage.removeItem("helperlah_isAdminAuthenticated");
      localStorage.removeItem("helperlah_isVendorAuthenticated");
      localStorage.removeItem("helperlah_token");
      localStorage.removeItem("helperlah_name");
      localStorage.removeItem("helperlah_id");
      localStorage.removeItem("helperlah_email");
      localStorage.removeItem("helperlah_role");
      localStorage.removeItem("helperlah_mobile");
    } catch (e) {
      toast.error("Logout unsuccessful", e?.response?.data?.message);
    }
  };

  useEffect(() => {
    const isAdminAuthFromStorage = localStorage.getItem(
      "helperlah_isAdminAuthenticated"
    );
    const isVendorAuthFromStorage = localStorage.getItem(
      "helperlah_isVendorAuthenticated"
    );

    if (isAdminAuthFromStorage === "true") {
      sethelperlah_isAdminAuthenticated(true);
    } else if (isVendorAuthFromStorage === "true") {
      sethelperlah_isVendorAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51 65 85)",
            color: "#fff",
          },
        }}
      />
      {helperlah_isAdminAuthenticated ? (
        <Admin handleLogout={logout} />
      ) : helperlah_isVendorAuthenticated ? (
        <Vendor handleLogout={logout} />
      ) : (
        <Auth loginAsAdmin={loginAsAdmin} loginAsVendor={loginAsVendor} />
      )}
    </div>
  );
}

export default App;
