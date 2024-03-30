class User {
    uid: string
    isAdmin: boolean
    constructor(uid: string, isAdmin: boolean) {
        this.uid = uid
        this.isAdmin = isAdmin
    }

    static toJson(user: User) {
        return {
            uid: user.uid,
            isAdmin: user.isAdmin,
        }
    }

    static fromJson(json: FirebaseFirestore.DocumentData | { uid: string, isAdmin: boolean }) {
        return new User(json.uid, json.isAdmin)
    }
}

export default User
