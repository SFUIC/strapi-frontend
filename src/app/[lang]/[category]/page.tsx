import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import PostList from "@/app/[lang]/components/PostList";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: filter,
        },
      },
      populate: {
        cover: { fields: ["url"] },
        category: {
          populate: "*",
        },
        authorsBio: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  if (data.length === 0) return (
    <h2 className="text-center text-3xl font-bold py-6">N/A</h2>
  );

  const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <div>
      <h2 className="text-center text-3xl font-bold py-6">"{name}"</h2>
      <PostList data={data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
