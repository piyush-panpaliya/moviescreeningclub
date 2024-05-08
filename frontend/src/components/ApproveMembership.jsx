import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ApproveMembership() {
  const columns = ["name", "email", "phone Number", "designation",'transaction id',"actions"];
  return (
    <div>
      <h1>Approve Membership</h1>
      <div className="flex justify-center min-h-lvh">
        <Table
          isStriped
          className="w-5/6 max-sm:w-[95%] my-5"
          aria-label="Example static collection table"
        >
          <TableHeader
            className="capitalize"
            columns={columns.map((column) => ({ key: column, label: column }))}
          >
            {(column) => (
              <TableColumn className="capitalize" key={column.key}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
