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

    const isSuperAdmin = event.context.isSuperAdmin as boolean | undefined
    if (isSuperAdmin === undefined) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You are not login.',
        })
    }
    if (!isSuperAdmin) {
        throw createError({
            statusCode: 403,
            statusMessage: 'You are not authorized to access this resource.',
        })
    }

    const db = getFirestore(app)
    const adminRef = db.collection('users').doc(id)
    const adminDoc = await adminRef.get()

    if (!adminDoc.exists) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found.',
        })
    }

    setResponseStatus(event, 200, 'Admin removed.')
    await adminRef.update({
        isAdmin: false,
    })
})
