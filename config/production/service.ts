const config = {
    // Configuración nginx
    nginx: {
        discover_uri:'http://localhost/nginxproxy/discover',
        hide_uri: 'http://localhost/nginxproxy/hide',
        payload:{
            entity_name:'',
            prefix:'',
            scheme:'http',
            port:'',
            extra:'',
            tagaSearch:''
        }
    },
    // Security Headers
    securityHeaders: {
        // Strict-Transport-Security
        // "preload", which is necessary for inclusion in all major web browsers' HSTS preload lists, like Chromium, Edge, and Firefox.
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

        // X-Frame-Options
        'X-Frame-Options': 'SAMEORIGIN', // "DENY"

        // X-Content-Type-Options
        // "nosniff" Blocks a request if the request destination is of type style and the MIME type is not text/css,
        // or of type script and the MIME type is not a JavaScript MIME type.
        'X-Content-Type-Options': 'nosniff',

        // Content-Security-Policy
        'Content-Security-Policy': "default-src 'self';style-src 'self' fonts.googleapis.com;font-src 'self' fonts.gstatic.com;", // connect-src 'self' https://srfrt-001.contesta.es
    },
};

export default config;
