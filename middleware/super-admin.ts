export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const user = await getCurrentUser()
        const idToken = await user.getIdToken(true)
        const isSuperAdmin = await $fetch('/api/isSuperAdmin', {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        })

        if (!isSuperAdmin) {
            return abortNavigation('Unauthorized')
        }
    }
    else {
        return await navigateTo('/')
    }
})
