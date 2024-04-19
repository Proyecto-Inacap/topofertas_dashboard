'use client'
import React from 'react'
import { useSession, signIn, signOut, getSession,} from "next-auth/react"
import { getServerSession } from 'next-auth'


const LoginForm =  () => {
    const session = useSession()
    console.log(session)
    const handleLogin = async () => {
        try {
            console.log("Logging in")
            signIn("credentials", {
                email: "admin@admin.com",
                password: "123456",
            })
        } catch (error) {
            console.error("Failed to login", error)
        }

    }
  return (
    <div>
        <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" onClick={() => handleLogin()}>Login</button>
        </form>
    </div>
  )
}

export default LoginForm