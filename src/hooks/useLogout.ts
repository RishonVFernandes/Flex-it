import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/authSlice";
import axios from "axios";

export const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
        mutationFn: () => {
            return axios.post("http://localhost:3000/auth/logout",{ }, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            dispatch(clearUser());
            queryClient.removeQueries({ queryKey: ["user"] });
            navigate("/login");
        },
        onError: (error) => {
            console.error(error)
        }
    });

    return {logoutUser, isLoggingOut};
}
