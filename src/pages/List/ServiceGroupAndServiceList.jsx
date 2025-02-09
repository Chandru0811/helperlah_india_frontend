import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllServiceGroupAndServiceWithIds = async () => {
  try {
    const response = await api.get("serviceGroupAndService/list");
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllServiceGroupAndServiceWithIds;