import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllPaymentTypeWithIds = async () => {
  try {
    const response = await api.get("admin/paymentTypes");
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllPaymentTypeWithIds;