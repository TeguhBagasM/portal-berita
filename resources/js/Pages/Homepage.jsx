import NewsList from "@/Components/Homepage/NewsLists";
import Paginator from "@/Components/Homepage/Paginator"; // Pastikan path benar
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            {/* user =  pashing */}
            <Navbar user={props.auth.user} />

            <div className="flex justify-center flex-wrap items-stretch gap-4 p-4">
                <NewsList news={props.news.data} />
            </div>
            <div className="flex justify-center items-center mt-4">
                <Paginator meta={props.news.meta} />{" "}
                {/* Mengirim `meta` yang benar */}
            </div>
        </div>
    );
}
