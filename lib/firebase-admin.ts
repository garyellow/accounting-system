import { initializeApp, cert } from 'firebase-admin/app'

const app = initializeApp({
    credential: cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string)),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export default app
