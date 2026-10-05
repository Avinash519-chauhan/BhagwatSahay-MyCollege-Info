export async function onRequest(context) {
    const { request, params } = context;

    const path = Array.isArray(params.path)
        ? params.path.join("/")
        : params.path || "";

    const backendUrl =
        `https://bhagwatsahay-mycollege-info.onrender.com/${path}`;

    const url = new URL(request.url);
    const targetUrl = `${backendUrl}${url.search}`;

    const headers = new Headers(request.headers);

    // Prevent the browser from directly controlling the Host header
    headers.delete("host");

    const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers,
        body: ["GET", "HEAD"].includes(request.method)
            ? undefined
            : request.body,
        redirect: "manual",
    });

    const response = await fetch(proxyRequest);

    const responseHeaders = new Headers(response.headers);

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
    });
}