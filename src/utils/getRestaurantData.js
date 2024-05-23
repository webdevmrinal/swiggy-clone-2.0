import qs from "qs"

export const fetchRestaurants = async (params) => {
  try {
    const queryString = qs.stringify(params);
    const response = await fetch(`/api/restaurants?${queryString}`, {
    // const response = await fetch(`/dapi/restaurants/list/v5?${queryString}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
