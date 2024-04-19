// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { UserNextAuth } from "@/core/users/types"
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,

        } & DefaultSession & UserNextAuth
    }

    interface User extends DefaultUser extends UserNextAuth {}
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT extends UserNextAuth{}
}