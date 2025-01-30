import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ServiceGroup from "../pages/admin/ServiceGroup/ServiceGroup";
import ServiceGroupAdd from "../pages/admin/ServiceGroup/ServiceGroupAdd";
import ServiceGroupEdit from "../pages/admin/ServiceGroup/ServiceGroupEdit";
import ServiceGroupView from "../pages/admin/ServiceGroup/ServiceGroupView";
import Service from "../pages/admin/Service/Service";
import ServiceAdd from "../pages/admin/Service/ServiceAdd";
import ServiceEdit from "../pages/admin/Service/ServiceEdit";
import ServiceView from "../pages/admin/Service/ServiceView";
import Subscription from "../pages/admin/Subscription/Subscription";
import SubscriptionAdd from "../pages/admin/Subscription/SubscriptionAdd";
import SubscriptionEdit from "../pages/admin/Subscription/SubscriptionEdit";
import SubscriptionView from "../pages/admin/Subscription/SubscriptionView";
import CustomPackageEdit from "../pages/admin/CustomPackage/CustomPackageEdit";
import CustomPackage from "../pages/admin/CustomPackage/CustomPackage";
import CustomPackageView from "../pages/admin/CustomPackage/CustomPackageView";
import User from "../pages/admin/User/User";
import UserView from "../pages/admin/User/UserView";
import OrderView from "../pages/admin/Order/OrderView";
import Order from "../pages/admin/Order/Order";
import ServiceAssignmentView from "../pages/admin/ServiceAssignment/ServiceAssignmentView";
import ServiceAssignmentEdit from "../pages/admin/ServiceAssignment/ServiceAssignmentEdit";
import ServiceAssignment from "../pages/admin/ServiceAssignment/ServiceAssignment";
import PaymentView from "../pages/admin/Payment/PaymentView";
import PaymentEdit from "../pages/admin/Payment/PaymentEdit";
import Payment from "../pages/admin/Payment/Payment";
import PaymentTypeAdd from "../pages/admin/PaymentType/PaymentTypeAdd";
import PaymentTypeEdit from "../pages/admin/PaymentType/PaymentTypeEdit";
import PaymentTypeView from "../pages/admin/PaymentType/PaymentTypeView";
import PaymentType from "../pages/admin/PaymentType/PaymentType";
import Offers from "../pages/admin/Offers/Offers";
import OffersAdd from "../pages/admin/Offers/OffersAdd";
import OffersEdit from "../pages/admin/Offers/OffersEdit";
import OffersView from "../pages/admin/Offers/OffersView";
import Company from "../pages/admin/Company/Company";
import CompanyEdit from "../pages/admin/Company/CompanyEdit";
import CompanyView from "../pages/admin/Company/CompanyView";
import Helper from "../pages/admin/Helper/Helper";
import HelperView from "../pages/admin/Helper/HelperView";
import Profile from "../pages/admin/Profile/Profile";

function Admin({ handleLogout }) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
        <AdminSideBar handleLogout={handleLogout} />
        <div className="flex-grow-1 h-screen overflow-y-auto">
          <AdminHeader handleLogout={handleLogout} />
          <main className="pt-2 bg-surface-secondary">
            <div style={{ minHeight: "90vh" }} className="px-2">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="*" element={<AdminDashboard />} />

                {/* Side Menu  */}

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />

                {/* Company */}
                <Route path="/company" element={<Company />} />
                <Route path="/company/edit" element={<CompanyEdit />} />
                <Route path="/company/view/:id" element={<CompanyView />} />

                {/* Service Group */}
                <Route path="/servicegroup" element={<ServiceGroup />} />
                <Route path="/servicegroup/add" element={<ServiceGroupAdd />} />
                <Route
                  path="/servicegroup/edit/:id"
                  element={<ServiceGroupEdit />}
                />
                <Route
                  path="/servicegroup/view/:id"
                  element={<ServiceGroupView />}
                />

                {/* Service */}
                <Route path="/service" element={<Service />} />
                <Route path="/service/add" element={<ServiceAdd />} />
                <Route path="/service/edit/:id" element={<ServiceEdit />} />
                <Route path="/service/view/:id" element={<ServiceView />} />

                {/* Offers */}
                <Route path="/offers" element={<Offers />} />
                <Route path="/offers/add" element={<OffersAdd />} />
                <Route path="/offers/edit/:id" element={<OffersEdit />} />
                <Route path="/offers/view/:id" element={<OffersView />} />

                {/* Subscription */}
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/subscription/add" element={<SubscriptionAdd />} />
                <Route
                  path="/subscription/edit/:id"
                  element={<SubscriptionEdit />}
                />
                <Route
                  path="/subscription/view/:id"
                  element={<SubscriptionView />}
                />

                {/* Custom Package */}
                <Route path="/custompackage" element={<CustomPackage />} />
                <Route
                  path="/custompackage/edit/:id"
                  element={<CustomPackageEdit />}
                />
                <Route
                  path="/custompackage/view/:id"
                  element={<CustomPackageView />}
                />

                {/* Helper */}
                <Route path="/helper" element={<Helper />} />
                <Route path="/helper/view" element={<HelperView />} />

                {/* User */}
                <Route path="/user" element={<User />} />
                <Route path="/user/view/:id" element={<UserView />} />

                {/* Order */}
                <Route path="/order" element={<Order />} />
                <Route path="/order/view/:id" element={<OrderView />} />

                {/* Service Assignment */}
                <Route path="/assignment" element={<ServiceAssignment />} />
                <Route
                  path="/assignment/edit/:id"
                  element={<ServiceAssignmentEdit />}
                />
                <Route
                  path="/assignment/view/:id"
                  element={<ServiceAssignmentView />}
                />

                {/* Payment */}
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/edit/:id" element={<PaymentEdit />} />
                <Route path="/payment/view/:id" element={<PaymentView />} />

                {/* Payment Type */}
                <Route path="/paymenttype" element={<PaymentType />} />
                <Route path="/paymenttype/add" element={<PaymentTypeAdd />} />
                <Route path="/paymenttype/edit" element={<PaymentTypeEdit />} />
                <Route path="/paymenttype/view" element={<PaymentTypeView />} />
              </Routes>
            </div>
            <AdminFooter />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

Admin.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Admin;
