import PropTypes from "prop-types";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendorSideBar from "../components/vendor/VendorSideBar";
import VendorHeader from "../components/vendor/VendorHeader";
import VendorFooter from "../components/vendor/VenodrFooter";
import Orders from "../pages/vendor/orders/Orders";
import OrdersView from "../pages/vendor/orders/OrdersView";
import Helper from "../pages/vendor/Helper/Helper";
import HelperAdd from "../pages/vendor/Helper/HelperAdd";
import HelperEdit from "../pages/vendor/Helper/HelperEdit";
import HelperView from "../pages/vendor/Helper/HelperView";
import Profile from "../pages/vendor/Profile/Profile";

function Vendor({ handleLogout }) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
        <VendorSideBar handleLogout={handleLogout} />
        <div className="flex-grow-1 h-screen overflow-y-auto">
          <VendorHeader handleLogout={handleLogout} />
          <main className="pt-2 bg-surface-secondary">
            <div style={{ minHeight: "90vh" }} className="px-2">
              <Routes>
                <Route path="/" element={<VendorDashboard />} />
                <Route path="*" element={<VendorDashboard />} />

                {/* SideMenu  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/view/:id" element={<OrdersView />} />

                {/* Helper */}
                <Route path="/helper" element={<Helper />} />
                <Route path="/helper/add" element={<HelperAdd />} />
                <Route path="/helper/edit/:id" element={<HelperEdit />} />
                <Route path="/helper/view/:id" element={<HelperView />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <VendorFooter />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

Vendor.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Vendor;
