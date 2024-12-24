import EntriesCard from "@/components/entries-card";
import Post from "@/interfaces/post";
import { client } from "@/lib/client";
import { Metadata } from "next/types";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export const metadata: Metadata = {
  title: "Blog Dev",
  description: "Next JS BLOG",
};

export default async function Entradas() {
  const response = await client.getEntries({
    content_type: "blog3",
  });

  const posts: Post[] = response.items;

  return (
    <section className="my-8 px-2 lg:px-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-10">
        Entries the blog
      </h1>
      <EntriesCard posts={posts} />
    </section>
  );
}