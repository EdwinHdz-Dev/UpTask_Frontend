import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"

export default function NewPasswordView() {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center">Reestablecer Password</h1>
            <div className="text-center mt-5">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white">
                    Ingresa el codigo que recibiste
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-fuchsia-500 font-bold mt-2 sm:mt-0">
                    por email
                </p>
            </div>
            
            {!isValidToken ?
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
                <NewPasswordForm token={token} />}
        </>
    )
}

