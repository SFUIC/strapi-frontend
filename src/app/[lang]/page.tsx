"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";

import Loader from "./components/Loader";
import PostList from "./components/PostList";
import PageHeader from "./components/PageHeader";
import Intro from "./components/Intro";
import FeedbackForm from "./components/FeedbackForm";
import { MdExpandMore } from "react-icons/md";
import { getPageBySlug } from "./services/page";
import { getStrapiMedia } from "./utils/api-helpers";

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
  const [landingPage, setLandingPage] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

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
      const landingPage = await getPageBySlug("landing");
      setLandingPage(landingPage);
    } catch (error) {
      console.error("Failed to fetch landing page data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    fetchLandingPage();
  }, [fetchData, fetchLandingPage]);

  if (!landingPage || !landingPage.data) return null;
  const { chunks } = landingPage.data[0].attributes;
  const { background, titleMain, titleSub } = chunks[0];
  const { introDescription, joinLink } = chunks[1];
  const featureBannerBackgroundUrl = getStrapiMedia(background.data.attributes.url);

  if (isLoading) return <Loader />;

  return (
    <div className="h-full">
      <PageHeader headingMain={titleMain} headingSub={titleSub} mediaSrc={featureBannerBackgroundUrl} mediaExt={background.data.attributes.ext} />
      <div className="flex flex-row">
        <div className="w-1/3 p-4">
          <div className="p-4 grid items-start gap-8">
            <div className="flex justify-center">
              <Intro description={introDescription} joinLink={joinLink} />
            </div>
            <div className="flex justify-center">
              <FeedbackForm />
            </div>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <PostList cols={2} data={data}>
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
