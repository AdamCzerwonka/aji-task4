import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCancelOrder } from "@/data/orders/useCancelOrder";
import { useRealiseOrder } from "@/data/orders/useRealiseOrder";
import { useUnrealisedOrders } from "@/data/orders/useUnrealisedOrders";
import { FC } from "react";

const UnrealisedOrdersPage: FC = () => {
  const { unrealisedOrders } = useUnrealisedOrders();
  const { cancelOrder } = useCancelOrder();
  const { realiseOrder } = useRealiseOrder();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Confirmation date</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unrealisedOrders
            ?.filter((order) => order.orderStatusId === 1)
            .map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {order.confirmationDate?.toString() || ""}
                </TableCell>
                <TableCell>
                  {order.items
                    .flatMap((item) => item.price)
                    .reduce((prev, curr) => prev + curr, 0)
                    .toFixed(2)}
                  $
                </TableCell>
                <TableCell>
                  <ul className="list-disc">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.product.name} - {item.amount}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      realiseOrder({
                        orderId: order.id,
                        orderStatusId: order.orderStatusId === 1 ? 2 : 4,
                      })
                    }
                  >
                    Realise
                  </Button>
                  <Button onClick={() => cancelOrder(order.id)}>Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnrealisedOrdersPage;
