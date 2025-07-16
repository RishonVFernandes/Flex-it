import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostsType {
    id: number;
    username: string;
}
const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:3000/todo");
    return data;
};

const UsersPage = () => {
    const [users, setUsers] = useState<PostsType[]>([]);
    const fetchData = async () => {
        const data = await axios.get("http://localhost:3000/todo");
        console.log(data);
        setUsers(data.data);
    };
    fetchData();
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    console.log(data)
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div>
                <h1>Posts</h1>
                {users.map((post: PostsType) => (
                    <p key={post.id}>{post.username}</p>
                ))}
            </div>
        </>
    );
};

export default UsersPage;
