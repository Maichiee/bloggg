import EntriesSection from "@/components/entries-section";
import HeroCarousel from "@/components/hero-carousel";
import Post from "@/interfaces/post";
import { client } from "@/lib/client";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function Home() {
  const response = await client.getEntries({
    content_type: "blog3",
    limit: 3,
  });

  const posts: Post[] = response.items ?? [];

  const response2 = await client.getEntries({
    content_type: "blog3",
    limit: 3,
    skip: 3,
  });

  const posts2: Post[] = response2.items ?? [];

  const categories = posts2.map((post) => post.fields.tags);

  const categoriesFlat = categories.flat();

  const uniqueCategories = [
    ...(new Set(categoriesFlat) as unknown as string[]),
  ];

  return (
    <section className="lg:px-16 px-2">
      <HeroCarousel posts={posts} />
      <EntriesSection posts={posts2} categories={uniqueCategories} />
    </section>
  );
}