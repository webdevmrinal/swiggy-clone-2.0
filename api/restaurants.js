import qs from "qs";

export default async function handler(req, res) {
  const queryString = qs.stringify(req.query);
  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?${queryString}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Connection: "keep-alive",
        "sec-ch-ua":
          '"Chromium";v="91", " Not;A Brand";v="99", "Google Chrome";v="91"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
      referrer: "https://www.swiggy.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `HTTP error! status: ${response.status}` });
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching data", details: error.toString() });
  }
}
