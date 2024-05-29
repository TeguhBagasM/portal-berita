import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {news?.length > 0 ? (
                news.map((data, i) => <NewsItem key={i} data={data} />)
            ) : (
                <div>No News Available</div>
            )}
        </div>
    );
};

export default NewsList;
