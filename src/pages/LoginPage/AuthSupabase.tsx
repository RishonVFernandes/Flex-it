// src/Auth.js
import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient.ts"; // Adjust the import path as necessary

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("LOGIN"); // or 'SIGNUP'
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let result;

        if (mode === "SIGNUP") {
            result = await supabase.auth.signUp({ email, password });
        } else {
            result = await supabase.auth.signInWithPassword({
                email,
                password,
            });
        }

        if (result.error) {
            setMessage(result.error.message);
        } else {
            setMessage(
                mode === "SIGNUP"
                    ? "Signup successful! Check your email."
                    : "Logged in!"
            );
            console.log(result.data);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>{mode === "LOGIN" ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">{mode}</button>
            </form>
            <p>{message}</p>
            <button
                onClick={() => setMode(mode === "LOGIN" ? "SIGNUP" : "LOGIN")}
            >
                Switch to {mode === "LOGIN" ? "Sign Up" : "Login"}
            </button>
        </div>
    );
}
