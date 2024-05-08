import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";


export default function ApproveMembership() {
  const columns = ["name", "email", "designation", "Role", "actions"];
  return (
    <div>
      <h1>Approve Membership</h1>
      <div className="flex justify-center min-h-lvh">
      <Table
        isStriped
        className="w-4/5 max-sm:w-[95%] my-5"
        aria-label="Controlled table example with dynamic content"
        topContent={topContent}
        topContentPlacement="outside"
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
        <TableBody items={filteredUsers}>
          {(item) => (
            <TableRow key={item._id}>
              {columns.map((columnKey) => (
                <TableCell key={columnKey}>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}