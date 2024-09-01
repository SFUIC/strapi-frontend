"use client";
import { useState, useEffect, useCallback } from "react";

import Loader from "../components/Loader";
import PostList from "../components/PostList";
import { MdExpandMore } from "react-icons/md";
import { getArticles } from "../services/articles";
import { useLocale } from "../contexts/LocaleContext";

interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    };
}

export default function Posts() {
    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const { locale } = useLocale();

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);
        try {
            const responseData = await getArticles(start, limit, locale);

            if (start === 0) {
                setData(responseData.data);
            } else {
                setData((prevData: any[]) => [...prevData, ...responseData.data]);
            }

            setMeta(responseData.meta);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    function loadMorePosts(): void {
        const nextPosts = meta!.pagination.start + meta!.pagination.limit;
        fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }, [fetchData]);

    if (isLoading) return <Loader />;

    return (
        <div>
            <div className="flex flex-row">
                <div className="w-full p-4">
                    <PostList cols={3} data={data}>
                        {meta!.pagination.start + meta!.pagination.limit <
                            meta!.pagination.total && (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
                                        onClick={loadMorePosts}
                                    >
                                        <MdExpandMore />
                                    </button>
                                </div>
                            )}
                    </PostList>
                </div>
            </div>
        </div>
    );
}