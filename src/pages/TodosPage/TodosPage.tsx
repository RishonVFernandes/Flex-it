import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface TodosType {
    id: number;
    title: string;
    isCompleted: boolean;
    createdAt: Date;
}
const TodosPage = () => {
    const [title, setTitle] = useState<string>("");
    const [editTitle, setEditTitle] = useState<string>("");

    const [selectedTodo, setSelectedTodo] = useState<TodosType | null>(null);

    const queryClient = useQueryClient();

    const fetchTodos = async (): Promise<TodosType[]> => {
        const res = await axios.get<{ todos: TodosType[] }>(
            "http://localhost:3000/todo",
            { withCredentials: true }
        );
        return res.data.todos;
    };

    const { data: todos = [], isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    const { mutate: createTodo, isPending: creating } = useMutation({
        mutationFn: (newTodo: { title: string }) =>
            axios.post<{ todo: TodosType }>(
                "http://localhost:3000/todo",
                newTodo
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setTitle("");
        },
    });

    const { mutate: updateTodo } = useMutation({
        mutationFn: ({
            id,
            editTitle,
        }: {
            id: number | undefined;
            editTitle: string;
        }) =>
            axios.patch(`http://localhost:3000/todo/${id}`, {
                title: editTitle,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const { mutate: deleteTodo } = useMutation({
        mutationFn: (id: number) =>
            axios.delete(`http://localhost:3000/todo/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const { mutate: toggleTodo } = useMutation({
        mutationFn: (id: number) =>
            axios.patch(`http://localhost:3000/todo/${id}/toggle`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;
        createTodo({ title });
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editTitle.trim() || !selectedTodo?.id) return;

        updateTodo(
            {
                id: selectedTodo.id,
                editTitle: editTitle,
            },
            {
                onSuccess: () => {
                    setSelectedTodo(null); // Close the edit form
                    setEditTitle(""); // Clear the input
                },
            }
        );
    };

    return (
        <>
            <div className="bg-purple-300 flex flex-col justify-center items-center p-4 dark:bg-gray-900">
                <h1 className="text-purple-900 text-2xl font-bold dark:text-blue-200">
                    Create a To-do
                </h1>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="bg-purple-500 w-90 sm:w-120 p-5 rounded-xl dark:bg-indigo-900"
                >
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-white font-bold">
                            Enter a Title :
                        </label>
                        <textarea
                            name=""
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-white p-2 focus:outline-purple-900 focus:outline-3 rounded-xl"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-800 text-white mt-2 px-6 py-3 rounded-xl focus:bg-purple-900 hover:bg-purple-900 cursor-pointer hover:shadow-xl dark:bg-blue-500"
                    >
                        {creating ? "Adding..." : "Add"}
                    </button>
                </form>
            </div>

            <div className="bg-blue-100 flex flex-col items-center dark:bg-gray-800">
                <div className="text-blue-900 text-2xl font-bold dark:text-blue-200">
                    Your To-dos
                </div>
                {!isLoading ? (
                    <div className="">
                        {todos.map((todo: TodosType, index: number) => (
                            <div
                                key={todo.id}
                                className="bg-blue-200 w-90 sm:w-120 md:w-150 lg:w-200 flex justify-between my-2 p-2 dark:bg-gray-900 dark:text-white"
                            >
                                <div className="flex gap-3 items-center">
                                    <div
                                        className={`font-bold text-lg cursor-pointer text-wrap  ${
                                            todo.isCompleted
                                                ? "line-through text-green-700"
                                                : "text-black dark:text-white"
                                        }`}
                                        style={{}}
                                        onClick={() => {
                                            toggleTodo(todo.id);
                                        }}
                                    >
                                        To-do {index + 1} : {todo.title}
                                    </div>
                                    {todo.isCompleted && (
                                        <div className="bg-green-700 w-4 h-4 flex justify-center rounded-sm">
                                            <div className="w-2 h-3 border-3 border-t-transparent border-l-transparent border-white rotate-z-30"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="md:flex gap-3 items-center">
                                    <div>
                                        {todo.createdAt
                                            .toLocaleString()
                                            .toString()
                                            .slice(0, 10)}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-blue-800 text-white px-2 py-1 rounded-lg focus:bg-blue-900 hover:bg-blue-900 cursor-pointer hover:shadow-xl"
                                            onClick={() => {
                                                setSelectedTodo(todo);
                                                setEditTitle(todo.title);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-blue-800 text-white px-2 py-1 rounded-lg focus:bg-blue-900 hover:bg-blue-900 cursor-pointer hover:shadow-xl"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading ...</div>
                )}
            </div>
            {selectedTodo && (
                <>
                    <div className="w-full h-full absolute top-0 flex justify-center items-center">
                        <div className="bg-blue-400 w-100 h-60 rounded-lg shadow-2xl flex justify-center items-center">
                            <form
                                action=""
                                onSubmit={handleUpdate}
                                className="w-80"
                            >
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="edit_title"
                                        className="font-bold text-2xl text-blue-900"
                                    >
                                        Edit Todo :
                                    </label>
                                    <button
                                        className="font-bold text-blue-900 border border-3 w-6 h-6 rounded-md hover:bg-blue-900 hover:text-white hover:border-blue-900"
                                        onClick={() => setSelectedTodo(null)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                        id="edit_title"
                                        className="w-full bg-white p-2 focus:outline-blue-900 focus:outline-3 rounded-xl"
                                    />
                                </div>
                                <button
                                    className="bg-blue-800 text-white mt-2 px-6 py-3 rounded-xl focus:bg-blue-900 hover:bg-blue-900 cursor-pointer hover:shadow-xl"
                                    type="submit"
                                >
                                    Update Todo
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default TodosPage;
