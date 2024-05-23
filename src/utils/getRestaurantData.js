import qs from "qs";

export const fetchRestaurants = async (params, onProgress) => {
  try {
    const queryString = qs.stringify(params);
    const response = await fetch(`/api/restaurants?${queryString}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported in this browser.');
    }

    const contentLength = response.headers.get('Content-Length');
    if (!contentLength) {
      throw new Error('Content-Length header is missing.');
    }
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            loaded += value.byteLength;
            onProgress((loaded / total) * 100);
            controller.enqueue(value);
            push();
          });
        }

        push();
      },
    });

    const newResponse = new Response(stream, { headers: response.headers });
    const result = await newResponse.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
