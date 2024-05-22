import qs from 'qs';

export default async function handler(req, res) {
  const queryString = qs.stringify(req.query);
  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?${queryString}`;

  const response = await fetch(apiUrl, {
    headers: {
      __fetch_req__: "true",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "https://www.swiggy.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: `HTTP error! status: ${response.status}` });
  }

  const result = await response.json();
  res.status(200).json(result);
}
