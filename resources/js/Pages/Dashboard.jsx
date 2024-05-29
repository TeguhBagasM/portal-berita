import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null); // Initial state for image as null
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        Inertia.post("/news", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                setIsNotif(true);
                setTitle("");
                setDescription("");
                setCategory("");
                setImage(null);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
    }, [props.myNews]);

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My News
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && (
                            <div role="alert" className="alert alert-info">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="stroke-current shrink-0 w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full m-2"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="input input-bordered w-full m-2"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered w-full m-2"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <input
                            type="file"
                            className="input input-bordered w-full m-2"
                            onChange={(e) => setImage(e.target.files[0])} // Changed to get the file object
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {props.myNews && props.myNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {props.myNews.map((news, i) => (
                                <div
                                    key={i}
                                    className="card bg-gray-100 shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
                                >
                                    <div className="relative">
                                        <img
                                            src={`cover/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <div className="badge badge-outline bg-blue-500 text-white">
                                                {news.category}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">
                                            {news.title}
                                        </h2>
                                        <p className="text-gray-700">
                                            {news.description}
                                        </p>
                                    </div>
                                    <div className="card-actions justify-end p-4">
                                        <div className="badge badge-outline bg-red-500 text-white cursor-pointer hover:bg-red-600 transition duration-300">
                                            <Link
                                                href={route("delete.news")}
                                                as="button"
                                                method="post"
                                                data={{ id: news.id }}
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card bg-gray-100 shadow-xl rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">
                                No News Available
                            </h2>
                            <p>You haven't made any news yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
