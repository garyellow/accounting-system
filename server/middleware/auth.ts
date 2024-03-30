import app from '~/lib/firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
export default defineEventHandler(async (event) => {
    const token = getHeader(event, 'Authorization')

    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        const idToken = token.substring(token.indexOf(' ') + 1)
        const user = await getAuth(app).verifyIdToken(idToken)

        // Attach user to context
        event.context.auth = user

        // Attach isSuperAdmin to context
        const isSuperAdmin = user.email!.substring(1, user.email!.indexOf('@gm.ntpu.edu.tw')) == useRuntimeConfig().superAdmin
        event.context.isSuperAdmin = isSuperAdmin

        // Attach isAdmin to context
        if (isSuperAdmin) {
            event.context.isAdmin = true
        }
        else {
            const db = getFirestore(app)
            const authRef = db.collection('users').doc(user.uid)
            const authDoc = await authRef.get()
            event.context.isAdmin = authDoc.exists && authDoc.get('isAdmin')
        }
    }
})
