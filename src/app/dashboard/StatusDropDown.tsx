"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { orderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { changeOrderStatus } from "./action";
import { useRouter } from "next/navigation";

const LABEL_MAP: Record<keyof typeof orderStatus, string> = {
  awaited_shipment: "Awaiting Shipment",
  fullfilled: "Fulfilled",
  shipped: "Shipped",
};

const StatusDropDown = ({
  id,
  orderStatusChange,
}: {
  id: string;
  orderStatusChange: orderStatus;
}) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatusChange]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(orderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatusChange === status,
              }
            )}
            onClick={() => mutate({ id, newStatus: status as orderStatus })}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatusChange === status ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[status as orderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
