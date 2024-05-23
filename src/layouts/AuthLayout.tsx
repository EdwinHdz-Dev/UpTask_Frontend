import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
                <div className="py-10 lg:py-20 mx-auto w-full max-w-md px-5">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}

