import { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";

const UserTeller = () => {

    const user = useSelector(
        (state: RootState) => state.auth.user
    );
    return (
        <>
            <div className="w-40 h-auto bg-orange-500 fixed p-2 rounded-lg">
                <div>Username: {user?.username}</div>
                <div>Email: {user?.email}</div>
            </div>
        </>
    )
}

export default UserTeller;