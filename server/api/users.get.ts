import app from '~/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import User from '~/lib/models/user'
export default defineEventHandler(async (event) => {
    const isAdmin = event.context.isAdmin as boolean | undefined
    if (isAdmin === undefined) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You are not login.',
        })
    }
    if (!isAdmin) {
        throw createError({
            statusCode: 403,
            statusMessage: 'You are not authorized to access this resource.',
        })
    }

    const db = getFirestore(app)
    const adminList = await db.collection('users').get()
    return adminList.docs.map(doc => User.fromJson(doc.data()))
})
