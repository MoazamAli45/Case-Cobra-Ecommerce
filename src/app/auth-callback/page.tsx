"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getAuthStatus } from "./action";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [configId, setConfigId] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurationId = JSON.parse(
      localStorage.getItem("configurationId")!
    );
    if (configurationId) {
      setConfigId(configurationId);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["get-auth-status"],
    queryFn: async () => getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  //     AS success is passed in server action
  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
    } else router.push("/");
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
