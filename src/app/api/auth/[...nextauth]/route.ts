import { authenticate } from "@/core/session/api/authenticate"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        console.log(credentials)
        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password)
          
          if (res !== null) {
            return { ...res.user }
          } else {

            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }