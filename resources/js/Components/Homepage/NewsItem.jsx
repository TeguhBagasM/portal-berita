import React from "react";

const NewsItem = ({ data }) => {
    return (
        <div className="card w-full lg:w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src={`cover/${data.image}`}
                    alt={data.title}
                    height={300}
                    width={300}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{data.category}</div>
                    <div className="badge badge-outline">{data.author}</div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
