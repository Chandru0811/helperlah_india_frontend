import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllServiceWithIds = async () => {
  try {
    const response = await api.get("admin/services/list");
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllServiceWithIds;