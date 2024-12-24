import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { client } from "@/lib/client";
import Post from "@/interfaces/post";
import DropdownCategory from "./dropdown-category";
import Search from "./search";

export const dynamic = "auto",
  fetchCache = "auto",
  revalidate = 10;

export default async function Navbar() {
  const categories = await client.getEntries({
    content_type: "blog3",
  });

  const categoriesArray = categories.items.map((post: Post) => {
    return post.fields.tags;
  });

  const categoriesFlat = categoriesArray.flat();

  const categoriesUnique = [
    ...(new Set(categoriesFlat) as typeof categoriesFlat),
  ];

  const response = await client.getEntries({
    content_type: "blog3",
  });

  const posts = response.items;

  return (
    <>
      <nav className="flex justify-between items-center max-lg:hidden  p-16">
        <ul className="flex space-x-4 justify-start items-center">
          <li>
            <Link href="/">
              <Image
                src="/next.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mr-8 dark:filter dark:invert"
              />
            </Link>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/entries">Entries</Link>
            </Button>
          </li>
          <li>
            <DropdownCategory categories={categoriesUnique} />
          </li>
        </ul>
        <div className="flex gap-4">
          <Search posts={posts} />
          <ThemeSwitcher />
        </div>
      </nav>
      <nav className="hidden max-lg:flex justify-center flex-col items-center p-16 gap-6">
        <ul>
          <li>
            <Link href="/">
              <Image
                src="/next.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mr-8 dark:filter dark:invert"
              />
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4 justify-end items-center">
          <li>
            <Button variant="ghost">
              {" "}
              <Link href="/entries">Entries</Link>
            </Button>
          </li>
          <li>
            <DropdownCategory categories={categoriesUnique} />
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
        <Search posts={posts} />
      </nav>
    </>
  );
}