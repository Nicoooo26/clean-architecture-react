// Dependencias
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    // Endpoint / Token desarrollo
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.DEV_PROXY_ENDPOINT,
            changeOrigin: true,
            //selfHandleResponse : true,    // Para el uso de onResponseRes con responseInterceptor
            pathRewrite: {
                '^/api': '',
            },
            // Req
            onProxyReq: (proxyReq, req, res) => {
                // CROS
                proxyReq.setHeader('Accept', req.header('Accept') || 'application/json');
                proxyReq.setHeader('Access-Control-Allow-Origin', '*');
                proxyReq.setHeader('Content-Type', req.header('Content-Type') || 'application/json');

                // Cabeceras
                proxyReq.setHeader('x-p-traceroute', 'developer');
                proxyReq.setHeader('x-p-appname', 'developer');
                proxyReq.setHeader('x-p-apptoken', process.env.DEV_PROXY_TOKEN);
                proxyReq.setHeader('x-p-username', req.header('x-p-username') || 'NOUSER');
                proxyReq.setHeader('Authorization', req.header('Authorization'));
            },
            // Response
            //onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            //    console.log(`onProxyRes: ${req.path}`);
            //    return responseBuffer;
            //}),
        })
    );
};
