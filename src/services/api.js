import axios from "axios";

export const fetchMockJobs = async () => {
  try {
    // 1. Make the API Call
    const response = await axios.get("https://dummyjson.com/products");
    
    // 2. We only take the first 5 items to not clutter our app
    const data = response.data.products.slice(0, 5); 

    // 3. Map their "product" data to match our "Job" data format
    const formattedJobs = data.map((item) => ({
      id: Date.now() + Math.random(), // Unique ID
      company: item.brand || "Mock Company",
      role: item.title,
      status: "Applied"
    }));

    return formattedJobs;
  } catch (error) {
    console.error("Error fetching mock data:", error);
    return [];
  }
};