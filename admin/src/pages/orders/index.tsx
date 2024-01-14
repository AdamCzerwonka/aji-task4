import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUnrealisedOrders } from "@/data/orders/useUnrealisedOrders";
import { FC } from "react";

const OrdersPage: FC = () => {
  const { unrealisedOrders } = useUnrealisedOrders();
  console.log(unrealisedOrders);
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
          {unrealisedOrders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.confirmationDate?.toString() || ""}</TableCell>
              <TableCell>
                {order.items
                  .flatMap((item) => item.price)
                  .reduce((prev, curr) => prev + curr, 0)}
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
                <Button>Realise</Button>
                <Button>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
