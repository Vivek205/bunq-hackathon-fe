import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TransactionTableProps } from "./types";

export const TransactionTable: FC<TransactionTableProps> = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }
  return (
    <Table className="w-full mt-2 table-auto border-collapse bg-white rounded-lg shadow-md">
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Receiver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ amount, created, description, alias }) => (
          // TODO: use id as key once BE starts sending it
          <TableRow key={amount + created}>
            <TableCell>{amount}</TableCell>
            <TableCell>{new Date(created).toDateString()}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{alias}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
