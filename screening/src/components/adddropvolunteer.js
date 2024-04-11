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
  getKeyValue,
} from "@nextui-org/react";
// import './adddropvolunteer.css';

const AddDropVolunteer = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("standard");
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
    console.log("hey");
    try {
      const response = await fetch("http://localhost:8000/user/fetchusers", {
        method: "GET",
      });
      if (!response.ok) {
        console.log(response.json());
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      // Sort users based on userType: admin, volunteer, standard
      const sortedUsers = data.users.sort((a, b) => {
        if (a.usertype === "admin") return -1;
        if (a.usertype === "volunteer" && b.usertype !== "admin") return -1;
        return 1;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error or display appropriate message to the user
    }
  };

  const handleSubmit = async (email,userType) => {
    try {
      const response = await fetch(
        "http://localhost:8000/user/updateUserType",
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

  const getKeyValue = (item, key) => {
    switch (key) {
      case "name":
        return item.name;
      case "email":
        return item.email;
      case "designation":
        return item.designation;
      case "Role":
        return item.usertype;
      case "actions":
        return (
          <div className="relative flex justify-start items-center">
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
              <DropdownMenu >
                <DropdownItem onClick={()=>{handleSubmit(item.email,'admin')}}>Admin</DropdownItem>
                <DropdownItem onClick={()=>{handleSubmit(item.email,'volunteer')}}>Volunteer</DropdownItem>
                <DropdownItem onClick={()=>{handleSubmit(item.email,'standard')}}>Standard</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return "";
    }
  };


  const columns = ["name", "email", "designation", "Role", "actions"];

  return (
    <div className="flex justify-center">
      {/* <h1>Add/Drop Volunteer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
        <p></p>
        <button type="submit">Submit</button>
      </form> */}

      <Table
        isStriped
        className="w-[80%] mt-5"
        aria-label="Controlled table example with dynamic content"
      >
        <TableHeader
          columns={columns.map((column) => ({ key: column, label: column }))}
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
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
