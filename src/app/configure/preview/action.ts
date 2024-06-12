import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { configuration } from "@prisma/client";
("use server");

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) throw new Error("Configuration not found");

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("User not found");
};
