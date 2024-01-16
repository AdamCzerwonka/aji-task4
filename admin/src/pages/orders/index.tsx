import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderStatus } from "@/data/orderStatus/useOrderStatus";
import { useUnrealisedOrders } from "@/data/orders/useUnrealisedOrders";
import { FC, useState } from "react";

const OrdersPage: FC = () => {
  const { orderStatus } = useOrderStatus();
  const { unrealisedOrders } = useUnrealisedOrders();

  const [status, setStatus] = useState<number>(2);
  return (
    <div>
      <div className="flex flex-row gap-2">
        {orderStatus?.map((s) => (
          <label className="flex flex-row gap-2">
            <input
              type="radio"
              name="category"
              value={s.id}
              onChange={(e) => setStatus(+e.target.value)}
              defaultChecked={s.id === 2}
            />
            {s.name}
          </label>
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Confirmation date</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Products</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unrealisedOrders
            ?.filter((order) => order.orderStatusId === status)
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
