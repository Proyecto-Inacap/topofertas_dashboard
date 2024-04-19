'use client'
import React from 'react'
import { useSession, signIn} from "next-auth/react"


const LoginForm =  () => {
    const session = useSession()
    console.log(session.data?.user)
    const handleLogin = async () => {
        try {
            signIn("credentials", {
                email: "admin@admin.com",
                password: "123456",
                redirect: false
            })
        } catch (error) {
            console.error("Failed to login", error)
        }

    }
  return (
    <div>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" onClick={() => handleLogin()}>Login</button>
    </div>
  )
}

export default LoginForm