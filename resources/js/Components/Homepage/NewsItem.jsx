import React from "react";

const NewsItem = ({ data }) => {
    return (
        <div className="card w-full lg:w-96 bg-white shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out rounded-lg overflow-hidden">
            <figure className="relative">
                <img
                    src={`cover/${data.image}`}
                    alt={data.title}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full flex items-end p-4">
                    <h2 className="text-white text-lg font-bold">
                        {data.title}
                    </h2>
                </div>
            </figure>
            <div className="card-body p-6">
                <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                <p className="text-gray-700 mb-4">{data.description}</p>
                <div className="flex justify-between items-center">
                    <div className="badge bg-blue-500 text-white px-2 py-1 rounded">
                        {data.category}
                    </div>
                    <div className="text-gray-500 text-sm">{data.author}</div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
