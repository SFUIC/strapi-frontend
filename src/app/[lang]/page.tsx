"use client";
import { useState, useEffect, useCallback } from "react";

import Loader from "./components/Loader";
import PostList from "./components/PostList";
import PageHeader from "./components/PageHeader";
import Intro from "./components/Intro";
import FeedbackForm from "./components/FeedbackForm";
import { MdExpandMore } from "react-icons/md";
import { getPages } from "./services/pages";
import { getStrapiMedia } from "./utils/api-helpers";
import { useLocale } from "./contexts/LocaleContext";
import { getArticles } from "./services/articles";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [pages, setLandingPage] = useState<any>(null);
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

  const fetchLandingPage = useCallback(async () => {
    try {
      const landingPage = await getPages(locale);
      setLandingPage(landingPage);
    } catch (error) {
      console.error("Failed to fetch landing page data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    fetchLandingPage();
  }, [fetchData, fetchLandingPage]);

  if (!pages || !pages.data) return null;
  const { chunks } = pages.data[1].attributes;
  const { background, titleMain, titleSub } = chunks[0];
  const { description, join } = chunks[1];
  const featureBannerBackgroundUrl = getStrapiMedia(background.data.attributes.url);

  if (isLoading) return <Loader />;

  return (
    <div className="h-full">
      <PageHeader headingMain={titleMain} headingSub={titleSub} mediaSrc={featureBannerBackgroundUrl} mediaExt={background.data.attributes.ext} />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4">
          <div className="p-4 grid items-start gap-8">
            <div className="flex justify-center">
              <Intro description={description} joinText={join.text} joinLink={join.url} />
            </div>
            <div className="flex justify-center">
              <FeedbackForm formData={chunks[2]} />
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 p-4">
          <PostList data={data}>
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
