import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center">Iniciar Sesión</h1>
                <div className="text-center mt-5">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white">
                        Comienza a planear tus proyectos
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-fuchsia-500 font-bold mt-2 sm:mt-0">
                        iniciando sesión en este formulario
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-8 p-5 sm:p-10 bg-white mt-10 rounded-lg shadow-lg w-full max-w-md"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <label
                            className="font-normal text-lg sm:text-xl"
                        >Email</label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full p-3 border-gray-300 border rounded-md"
                            {...register("email", {
                                required: "El Email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="font-normal text-lg sm:text-xl"
                        >Password</label>

                        <input
                            type="password"
                            placeholder="Password de Registro"
                            className="w-full p-3 border-gray-300 border rounded-md"
                            {...register("password", {
                                required: "El Password es obligatorio",
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Iniciar Sesión'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-lg sm:text-xl cursor-pointer rounded-md"
                    />
                </form>
                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to={'/auth/register'}
                        className="text-center text-gray-300 font-normal"
                    >¿No tienes cuenta? Crear Una</Link>

                    <Link
                        to={'/auth/forgot-password'}
                        className="text-center text-gray-300 font-normal"
                    >¿Olvidaste tu contraseña? Reestablecer</Link>
                </nav>
            </div>
        </>
    )
}
