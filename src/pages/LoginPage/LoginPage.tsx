import axios from "axios";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(()=>{
      getData();
    },[])
    const getData = async () => {
        console.log("hello");

        try {
            const response = await axios.get("http://localhost:3000/users");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/user",
                { name, email },
                { withCredentials: true }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div>
                <div>Helllo this is login</div>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="bg-red-400 w-100 h-100"
                >
                    <label htmlFor="username" className="w-full m-2 peer">
                        Username
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {setName(e.target.value); console.log(e.target.value)}}
                        className="w-full m-2 "
                    />
                    <label
                        htmlFor="password"
                        className="w-full m-2 peer-hover:bg-red-800"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full m-2 "
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
