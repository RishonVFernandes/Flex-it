import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UserType {
    username: string;
    email: string;
    password: string;
}
const SignUpPage = () => {
    const [username, setUsername] = useState<string>("");
    // const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // const queryClient = useQueryClient();

    const { mutate: createUser, isPending: creating } = useMutation({
        mutationFn: (newUser: UserType) =>
            axios.post<{ user: UserType }>(
                "http://localhost:3000/auth/register",
                newUser
            ),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["users"] });
            setUsername("");
            setEmail("");
            setPassword("");
        },
        onError: (error) => {
            console.error('Mutation falied :', error)
        }
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            createUser({ username, email, password });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col bg-amber-100">
                <h1 className="text-2xl font-bold text-amber-800">
                    Create A New Account
                </h1>
                <div className="bg-amber-200 w-120 h-130 p-7 flex justify-center items-center rounded-2xl">
                    <form
                        // style={{clipPath: "circle(40%)"}}
                        action=""
                        onSubmit={handleSubmit}
                        className="bg-amber-300 w-full h-full rounded-xl flex flex-col justify-center items-center gap-5"
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="font-bold text-amber-950"
                            >
                                Enter Username :
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white p-2 focus:outline-amber-900 focus:outline-3 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="font-bold text-amber-950"
                            >
                                Enter Your E-mail :
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white p-2 focus:outline-amber-900 focus:outline-3 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="font-bold text-amber-950"
                            >
                                Enter Your Password :
                            </label>
                            <input
                                type="text"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white p-2 focus:outline-amber-900 focus:outline-3 rounded-xl"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-amber-800 text-white mt-2 px-6 py-3 rounded-xl focus:bg-amber-700 hover:bg-amber-700 cursor-pointer hover:shadow-xl"
                            >
                                {creating ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
