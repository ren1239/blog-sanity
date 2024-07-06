import React from "react";
import { client, urlFor } from "../../lib/sanity";
import Image from "next/image";
import { PortableText } from "next-sanity";

async function getData(id: string) {
  const query = `*[_type == "blog" && slug.current == "${id}"]{
"currentSlug" : slug.current,
  title,
  description,
  titleImage,
  price
}[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <div className="mt-8">
      <h1>
        <span className="tracking-tighter block text-base text-primary font-semibold uppercase text-center">
          Ren Tan Blog
        </span>
        <span className="mt-2 block text-center leading-8 font-bold tracking-tight sm:text-4xl ">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="title-image"
        width={1200}
        height={800}
        className="rounded-lg mt-8"
        priority
      />
      <div className="mt-16 prose prose-blue prose-lg  dark:prose-invert">
        <PortableText value={data.description} />
      </div>
    </div>
  );
}
