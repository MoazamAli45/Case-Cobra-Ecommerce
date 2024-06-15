"use server";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) throw new Error("User not found");

  const order = await db.order.findFirst({
    where: {
      userId: user.id,
      id: orderId,
    },
    include: {
      user: true,
      shippingAddress: true,
      billingAddress: true,
      cofiguration: true,
    },
  });

  if (!order) throw new Error("Order not found");
  if (order.isPaid) return order;
  else return false;
};
