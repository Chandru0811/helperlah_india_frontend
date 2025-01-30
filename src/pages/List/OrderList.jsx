import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllOrderWithIds = async () => {
  try {
    const response = await api.get("admin/orders");
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllOrderWithIds;