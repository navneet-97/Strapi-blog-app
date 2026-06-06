import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {

    const { token, user } = useContext(AuthContext);
    const [title, setTitle] =useState("");
    const [description, setDescription] =useState("");

    async function createPost(e) {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:1337/api/articles",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`,
                },

                body: JSON.stringify({
                    data: {
                        title,
                        description
                    },
                }),
            }
        );

        setTitle("");
        setDescription("");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16 px-4">

            <form
                onSubmit={createPost}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
            >

                <h1 className="text-3xl font-bold mb-2">
                    Create New Post
                </h1>

                <p className="text-gray-500 mb-8">
                    Share something with the community
                </p>

                <div className="space-y-6">

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows="8"
                            placeholder="Write your post here..."
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Publish Post
                    </button>

                </div>

            </form>

        </div>
    );
}

export default CreatePost;