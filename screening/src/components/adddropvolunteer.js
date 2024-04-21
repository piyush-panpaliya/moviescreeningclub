import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Input,
  getKeyValue,
} from "@nextui-org/react";
const SERVERIP = "http://14.139.34.10:8000";
const AddDropVolunteer = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("standard");
  const [roleFilter, setRoleFilter] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    // Check userType in local storage on component mount
    const storedUserType = localStorage.getItem("userType");
    if (!storedUserType || storedUserType !== "admin") {
      // If userType is not found or not "admin", redirect to the home page
      navigate("/");
    } else {
      setUserType(storedUserType);
      // Fetch user data from API endpoint
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      let url =`${SERVERIP}/user/fetchusers`;
      // Append search query to the URL if filterValue is not empty
      if (filterValue) {
        url += `?search=${encodeURIComponent(filterValue)}`;
      }
      if (roleFilter.length > 0) {
        const roleParams = roleFilter.map((role) => `role=${encodeURIComponent(role)}`).join("&");
        url += roleFilter.length > 0 ? `&${roleParams}` : "";
      }
  
      const response = await fetch(url, {
        method: "GET",
      });
  
      if (!response.ok) {
        console.log(response.json());
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      // Sort users based on userType: admin, volunteer, standard
      const sortedUsers = data.users.sort((a, b) => {
        const userTypeOrder = {
          admin: 0,
          movievolunteer: 1,
          ticketvolunteer: 2,
          standard: 3,
        };
      
        const userTypeA = a.usertype.toLowerCase();
        const userTypeB = b.usertype.toLowerCase();
      
        // Compare the userTypeOrder to sort users
        if (userTypeOrder[userTypeA] < userTypeOrder[userTypeB]) return -1;
        if (userTypeOrder[userTypeA] > userTypeOrder[userTypeB]) return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error or display appropriate message to the user
    }
  };
  

  const handleSubmit = async (email, userType) => {
    try {
      const response = await fetch(
        `${SERVERIP}/user/updateUserType`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, userType }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user type");
      }

      setEmail("");
      setUserType("standard");

      // Fetch updated user data
      fetchUserData();

      // Handle success or display appropriate message to the user
    } catch (error) {
      console.error("Error updating user type:", error);
      // Handle error or display appropriate message to the user
    }
  };

  const statusColorMap = {
    admin: "success",
    volunteer: "primary",
    standard: "secondary",
  };

  const getKeyValue = (item, key) => {
    switch (key) {
      case "name":
        return item.name;
      case "email":
        return item.email;
      case "designation":
        return item.designation;
      case "Role":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.usertype]}
            size="sm"
            variant="flat"
          >
            {item.usertype}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-center ">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    handleSubmit(item.email, "admin");
                  }}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    handleSubmit(item.email, "ticketvolunteer");
                  }}
                >
                  Ticket Volunteer
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    handleSubmit(item.email, "movievolunteer");
                  }}
                >
                  Movie Volunteer
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    handleSubmit(item.email, "standard");
                  }}
                >
                  Standard
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return item.userType;
    }
  };

  const columns = ["name", "email", "designation", "Role", "actions"];

  const RoleOptions = [
    { uid: 1, name: "admin" },
    { uid: 2, name: "ticketvolunteer" },
    { uid: 3, name: "movievolunteer" },
    { uid: 4, name: "standard" },
  ];

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-start gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            }
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={(value)=>setFilterValue(value)}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                }
                  size="sm"
                  variant="flat"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {RoleOptions.map((Role) => (
                  <DropdownItem key={Role.uid} className="capitalize">
                    {(Role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterValue.toLowerCase()) 
  );

  return (
    <div className="flex justify-center">
      <Table
        isStriped
        className="w-[80%] my-5"
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
  );
};

export default AddDropVolunteer;
