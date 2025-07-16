import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { setUser, clearUser } from "../store/authSlice.ts";
import axios from "axios";

const fetchCurrentUser = async () => {
    const res = await axios.get("http://localhost:3000/auth/current", {
        withCredentials: true,
    });
    if (res.status !== 200) {
        throw new Error("Failed to fetch user");
    }
    return res.data.user;
};

export const useAuth = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.auth.user);

    const { data, error } = useQuery({
        queryKey: ["user"],
        queryFn: fetchCurrentUser,
        // enabled: !user, // ✅ only run if user is not already set
        refetchOnWindowFocus: false,
        // retry: false,
    });

    useEffect(() => {
        console.log(data);
        if (data) {
            dispatch(setUser(data));
        } else if (error) {
            dispatch(clearUser());
        }
    }, [data, error, dispatch]);
};
