function isSpaNavigation(request) {
  if (request.method !== 'GET') return false;

  const pathname = new URL(request.url).pathname;
  return !pathname.includes('.');
}

function indexRequest(request) {
  const url = new URL(request.url);
  url.pathname = '/index.html';
  return new Request(url.toString(), request);
}

export default {
  async fetch(request, env) {
    if (!env?.ASSETS || typeof env.ASSETS.fetch !== 'function') {
      return new Response('Static assets are unavailable.', { status: 503 });
    }

    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404 || !isSpaNavigation(request)) {
      return asset;
    }

    return env.ASSETS.fetch(indexRequest(request));
  },
};
