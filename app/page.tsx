import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // how often to revalidate

async function getData() {
  const query = `*[_type == 'blog'] | order(createdAt desc) {
  title,
    smallDescription,
    price,
    "currentSlug":slug.current,
    titleImage
}`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 ">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            className=" object-cover rounded-t-lg h-[200px]"
            width={800}
            height={500}
            src={urlFor(post.titleImage).url()}
            alt="image"
          />
          <CardContent className="mt-5">
            <h2 className="text-lg line-clamp-2 font-bold">{post.title}</h2>
            <div className=" text-gray-600 dark:text-gray-300">
              <p className="text-sm line-clamp-3 mt-2">
                {post.smallDescription}
              </p>
              <p className=" font-bold mt-5  ">${post.price} USD</p>
            </div>
            <Button asChild className=" w-32 lg:w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}> ReadMore</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
