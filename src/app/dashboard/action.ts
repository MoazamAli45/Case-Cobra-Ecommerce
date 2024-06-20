"use server";

import { db } from "@/db";
import { orderStatus } from "@prisma/client";

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: orderStatus;
}) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
};
