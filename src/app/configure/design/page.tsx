import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import DesignConfigurator from "./DesignConfigurator";
interface pageProps {
  searchParams: {
    [key: string]: string | string | undefined;
  };
}

const Page = async ({ searchParams }: pageProps) => {
  const { id } = searchParams;
  //  IF NOT ID
  if (!id || typeof id !== "string") return notFound();

  //  AS THIS IS SERVER SIDE PAGE SO
  const data = await db.configuration.findUnique({
    where: { id },
  });

  //  IF NO DATA FOUND
  if (!data) return notFound();

  //   AS WIDTH HEIGHT IMAGE URL IS STORED IN DATABASE
  const { width, height, imageUrl } = data;

  return (
    <DesignConfigurator
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
      configId={id}
    />
  );
};

export default Page;
