export default defineEventHandler(async (event) => {
    const isSuperAdmin = event.context.isSuperAdmin as boolean | undefined
    if (isSuperAdmin === undefined) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You are not login.',
        })
    }

    return isSuperAdmin
})
