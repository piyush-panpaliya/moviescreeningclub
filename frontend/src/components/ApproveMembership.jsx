import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export default function ApproveMembership() {
  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    fetchMembershipData();
  }, []);

  const fetchMembershipData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/membershipData');
      setMembershipData(response.data);
    } catch (error) {
      console.error('Error fetching membership data:', error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/confirmMembership/${id}`);
      fetchMembershipData(); // Refresh data after confirmation
    } catch (error) {
      console.error('Error confirming membership:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteMembership/${id}`);
      fetchMembershipData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting membership:', error);
    }
  };

  const columns = ["name", "email", "phone Number", "designation", "membership", "transaction id", "confirm", "delete"];

  return (
    <div>
      <h1>Approve Membership</h1>
      <div className="flex justify-center min-h-lvh">
        <Table
          isStriped
          className="w-5/6 max-sm:w-[95%] my-5"
          aria-label="Membership Table"
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
            {membershipData.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>{member.degree}</TableCell>
                <TableCell>{member.membership}</TableCell>
                <TableCell>{member.transactionId}</TableCell>
                <TableCell>
                  {member.flag === 'Yes' ? 'Confirmed' : <button onClick={() => handleConfirm(member._id)}>Confirm</button>}
                </TableCell>
                <TableCell>
                  {member.flag === 'Yes' ? 'Disabled' : <button onClick={() => handleDelete(member._id)}>Delete</button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
