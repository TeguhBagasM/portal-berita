import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title || "");
    const [description, setDescription] = useState(
        props.myNews.description || ""
    );
    const [category, setCategory] = useState(props.myNews.category || "");
    const [image, setImage] = useState(null);
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData();
        formData.append("id", props.myNews.id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        Inertia.put(route("news.update", { id: props.myNews.id }), formData, {
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
        if (isNotif) {
            setTimeout(() => setIsNotif(false), 3000);
        }
    }, [isNotif]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex flex-col space-y-4">
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="p-4 text-2xl items-center">
                            News Update
                        </div>
                        {isNotif && (
                            <div className="alert alert-success">
                                News Updated Successfully!
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
                            placeholder="Image"
                            className="input input-bordered w-full m-2"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
