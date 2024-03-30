import app from '~/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
export default defineEventHandler(async (event) => {
    const id = getQuery(event).id as string | undefined
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required parameter "id".',
        })
    }
    if (isNaN(parseInt(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Parameter "id" must be a number.',
        })
    }

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
    const userRef = db.collection('users').doc(id)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found.',
        })
    }

    setResponseStatus(event, 200, 'User deleted.')
    await userRef.delete()
})
