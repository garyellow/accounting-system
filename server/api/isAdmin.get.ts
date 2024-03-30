export default defineEventHandler(async (event) => {
    const isAdmin = event.context.isAdmin as boolean | undefined
    if (isAdmin === undefined) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You are not login.',
        })
    }

    return isAdmin
})
