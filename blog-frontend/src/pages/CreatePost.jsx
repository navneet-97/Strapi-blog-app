import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState(null);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const response = await fetch(
                "http://localhost:1337/api/categories"
            );

            const data = await response.json();

            setCategories(data.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function uploadImage() {

        const formData = new FormData();

        formData.append("files", cover);

        const response = await fetch(
            "http://localhost:1337/api/upload",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

        const data = await response.json();

        return data[0].id;
    }

    async function createPost(e) {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            if (!cover) {
                throw new Error("Please select a cover image");
            }

            const coverId = await uploadImage();

            const response = await fetch(
                "http://localhost:1337/api/articles",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        data: {
                            title,
                            slug: title.toLowerCase().replace(/\s+/g, "-"),
                            excerpt,
                            content,
                            category: Number(category),
                            cover: coverId,
                        },
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error?.message ||
                    "Failed to create article"
                );
            }

            setMessage(
                "Article published successfully!"
            );

            setTitle("");
            setExcerpt("");
            setContent("");
            setCategory("");
            setCover(null);

            navigate(`/article/${data.data.documentId}`);
        } catch (error) {
            console.error(error);
            setMessage(
                error.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">

            <div className="max-w-4xl mx-auto">

                <form
                    onSubmit={createPost}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
                >

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Create New Article
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Share your thoughts with the world.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 rounded-xl bg-slate-100 border">
                            {message}
                        </div>
                    )}

                    <div className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                placeholder="Enter article title"
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Excerpt
                            </label>

                            <textarea
                                rows="4"
                                value={excerpt}
                                onChange={(e) =>
                                    setExcerpt(e.target.value)
                                }
                                placeholder="Short summary shown on article cards"
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((cat) => (
                                    <option
                                        key={cat.id}
                                        value={cat.id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Cover Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setCover(
                                        e.target.files[0]
                                    )
                                }
                                className="w-full border border-slate-300 rounded-xl px-4 py-3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Content
                            </label>

                            <textarea
                                rows="16"
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                                placeholder="Write your article here..."
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
                        >
                            {loading
                                ? "Publishing..."
                                : "Publish Article"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreatePost;