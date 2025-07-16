import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice.ts";

type Usertype = {
    email: string;
    password: string;
};
const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { mutate: loginUser, isPending: loading } = useMutation({
        mutationFn: (newUser: Usertype) =>
            axios
                .post("http://localhost:3000/auth/login", newUser, {
                    withCredentials: true,
                })
                .then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            dispatch(setUser(data.user));
            console.log(data.user);
            setEmail("");
            setPassword("");
            navigate("/portfolio/rishon");
        },
        onError: (error) => {
            console.error("Mutation error :", error);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            loginUser({ email, password });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col bg-violet-100">
                <h1 className="text-2xl font-bold text-violet-800">
                    Login To Your Account
                </h1>
                <div className="bg-violet-200 w-120 h-100 p-7 flex justify-center items-center rounded-2xl">
                    <form
                        onSubmit={handleSubmit}
                        action=""
                        className="bg-violet-300 w-full h-full rounded-xl flex flex-col justify-center items-center gap-5"
                    >
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="font-bold text-violet-950"
                            >
                                Enter Your E-mail :
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="bg-white p-2 focus:outline-violet-900 focus:outline-3 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="font-bold text-violet-950"
                            >
                                Enter Your Password :
                            </label>
                            <input
                                type="text"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="bg-white p-2 focus:outline-violet-900 focus:outline-3 rounded-xl"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-violet-800 text-white mt-2 px-6 py-3 rounded-xl focus:bg-violet-700 hover:bg-violet-700 cursor-pointer hover:shadow-xl"
                            >
                                {loading ? "Please Wait" : "Login"}
                            </button>
                        </div>
                        <div>Please enter your credentials</div>
                        <div>Dont have an account ?</div>
                        <div>
                            <a href="/signup">Click here to Create One</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
