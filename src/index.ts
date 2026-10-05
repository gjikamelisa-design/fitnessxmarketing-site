// Worker entry: serves the static site exactly as before (via the ASSETS binding)
// and sends an access log to Profound Agent Analytics in the background.
// Adapted from https://docs.tryprofound.com/agent-analytics/cloudflare_worker
// The ingestion token is NOT stored here. It is the Cloudflare secret
// PROFOUND_LOG_INGESTION_TOKEN.

export interface Env {
    ASSETS: Fetcher;
    PROFOUND_API_URL: string;
    PROFOUND_LOG_INGESTION_TOKEN: string;
}

const EXCLUDED_PATHS = ['/checkout', '/cart', '/admin', '/api'];
const DETAIL_LIMIT = 512;

function normalizePath(pathname: string): string {
    try {
        return decodeURIComponent(pathname).toLowerCase();
    } catch {
        return pathname.toLowerCase();
    }
}

function isExcluded(pathname: string): boolean {
    const path = normalizePath(pathname);
    return EXCLUDED_PATHS.some(
        (excluded) => path === excluded || path.startsWith(`${excluded}/`),
    );
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        // Serve the normal page from the static assets, unchanged.
        const response = await env.ASSETS.fetch(request);
        const skip = response.status === 101 || isExcluded(new URL(request.url).pathname);

        if (!skip) {
            ctx.waitUntil(
                sendLog(request, response, env).catch((error: unknown) =>
                    console.error(
                        'Failed to send logs:',
                        error instanceof Error ? `${error.name}: ${error.message}` : error,
                    ),
                ),
            );
        }

        return response;
    },
} satisfies ExportedHandler<Env>;

async function sendLog(request: Request, response: Response, env: Env) {
    const requestUrl = new URL(request.url);
    const headerSize = Array.from(response.headers.entries()).reduce(
        (total, [key, value]) => total + key.length + value.length + 4,
        0,
    );

    const contentLength = Number(response.headers.get('content-length'));
    const transmitsBody =
        request.method !== 'HEAD' && response.status !== 204 && response.status !== 304;
    const bodySize = transmitsBody && Number.isFinite(contentLength) ? contentLength : 0;
    const bytes = headerSize + bodySize;

    const logData = {
        timestamp: Date.now(),
        host: requestUrl.hostname,
        method: request.method,
        pathname: requestUrl.pathname,
        query_params: Object.fromEntries(requestUrl.searchParams),
        ip: request.headers.get('cf-connecting-ip'),
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        bytes,
        status: response.status,
    };

    const logResponse = await fetch(env.PROFOUND_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': env.PROFOUND_LOG_INGESTION_TOKEN,
        },
        body: JSON.stringify([logData]),
        signal: AbortSignal.timeout(5000),
    });

    if (!logResponse.ok) {
        const reader = logResponse.body?.getReader();
        const chunk = await reader?.read();
        await reader?.cancel();

        const detail = chunk?.value
            ? new TextDecoder().decode(chunk.value).slice(0, DETAIL_LIMIT)
            : '';

        console.error(`Log ingestion rejected the request: ${logResponse.status} ${detail}`);
        return;
    }

    await logResponse.body?.cancel();
}
