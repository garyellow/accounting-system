export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const user = await getCurrentUser()
        const idToken = await user.getIdToken(true)
        const isAdmin = await $fetch('/api/isAdmin', {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        })

        if (!isAdmin) {
            return abortNavigation('Unauthorized')
        }
    }
    else {
        return await navigateTo('/')
    }
})
