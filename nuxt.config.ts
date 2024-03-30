// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        '/api/**': { cors: true },
        '/__/auth/**': {
            proxy: 'https://' + process.env.FIREBASE_AUTH_DOMAIN + '/__/auth/**',
        },
        '/__/auth/iframe': {
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
            },
        }
    },
    runtimeConfig: {
        superAdmin: 'superadmin',
        public: {
            productionDomain: 'localhost:3000',
        },
    },
    modules: [
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        'nuxt-quasar-ui',
        'nuxt-security',
        'nuxt-vuefire',
    ],
    plugins: [],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    vuefire: {
        auth: {
            enabled: true,
        },
        config: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.NUXT_PUBLIC_PRODUCTION_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
        },
    },
    googleFonts: {
        families: {
            'Noto+Sans+TC': [400, 700],
        },
    },
    security: {
        headers: {
            crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
            contentSecurityPolicy: {
                'script-src-attr': ["'unsafe-inline'"],
            }
        },
        corsHandler: {
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
        },
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    }
});
