import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLogin } from "./LoginContext"; // Import useLogin hook
const SERVERIP = "http://14.139.34.10:8000";

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();
  // const [memberships, setMemberships] = useState([]);
  const [currentMemberships, setCurrentMemberships] = useState([]);
  const [previousMemberships, setPreviousMemberships] = useState([]);

  useEffect(() => {
    const loggedInUseremail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUseremail) {
      navigate("/");
    } else {
      axios
        .get(`${SERVERIP}/memrouter/${loggedInUseremail}`)
        .then((response) => {
          // Sort memberships based on purchase date in ascending order
          const sortedMemberships = response.data.memberships.sort((a, b) => {
            return (
              new Date(a.purchasedate.split("-").reverse().join("-")) -
              new Date(b.purchasedate.split("-").reverse().join("-"))
            );
          });

          // Filter memberships into current and previous
          const currentDate = new Date();
          const current = sortedMemberships.filter(
            (membership) =>
              new Date(membership.validitydate.split("-").reverse().join("-")) >
              currentDate
          );
          const previous = sortedMemberships.filter(
            (membership) =>
              new Date(
                membership.validitydate.split("-").reverse().join("-")
              ) <= currentDate
          );

          // Update state with filtered memberships
          setCurrentMemberships(current);
          setPreviousMemberships(previous);
        })
        .catch((error) => {
          console.error("Error fetching memberships:", error);
        });
    }
  }, [loggedIn, navigate]);

  // Function to assign color to membership type
  const getColor = (memType) => {
    switch (memType.toLowerCase()) {
      case "gold":
        return "bg-yellow-200";
      case "silver":
        return "bg-gray-200";
      case "base":
        return "bg-orange-200";
      default:
        return "bg-blue-200";
    }
  };

  // Function to convert string to title case
  const toTitleCase = (str) => {
    return str.replace(/\b\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div>
      <div className="bg-gray-200 flex flex-col items-center min-h-screen">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 mt-7">Your Memberships</h2>
        <div className="flex flex-col bg-white w-4/5 my-10 rounded-xl shadow-lg">
          <div className="flex flex-col justify-between my-3 mx-5 ">
            <h3 className="text-xl lg:text-2xl font-semibold mb-2">Active Memberships</h3>
            <div className="grid gap-6 my-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5">
              {currentMemberships.map((membership, index) => (
                <Link
                  key={index}
                  to={`/QR`}
                  className="object-cover"
                >
                  <div
                    className="flex items-center justify-center"
                    
                  >
                    
                    <div
                      className={`px-4 flex flex-col justify-evenly rounded-md shadow-lg ${getColor(
                        membership.memtype
                      )} text-center w-[230px] lg:w-[250px] h-[280px] max-sm:w-full `}
                      // style={getCardStyle(230, 180)}
                    >
                      <h3 className="text-xl lg:text-2xl font-semibold">
                        {toTitleCase(membership.memtype)}
                      </h3>
                      <p>
                        <strong className="lg:text-lg">Purchase Date -</strong>{" "}
                        {new Date(
                          membership.purchasedate.split("-").reverse().join("-")
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong className="lg:text-lg">Validity Date -</strong>{" "}
                        {new Date(
                          membership.validitydate.split("-").reverse().join("-")
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white h-1/2 w-4/5 my-10 rounded-xl shadow-lg">
          <div className="flex flex-col justify-between my-3 mx-5">
            <h3 className="text-xl lg:text-2xl font-semibold">Previous Memberships</h3>
            <div className="grid gap-6 my-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5">
              {previousMemberships.map((membership, index) => (
                <div
                  key={index}
                  className="membership-card-container"
                  style={{ margin: "8px" }}
                >
                  <div
                    className={`px-4 flex flex-col justify-evenly rounded-md shadow-lg ${getColor(
                      membership.memtype
                    )} text-center w-[230px] h-[280px] max-sm:w-full `}
                    // style={getCardStyle(150, 180)}
                  >
                    <h3 className="text-xl font-semibold ">
                      {toTitleCase(membership.memtype)}
                    </h3>
                    <p>
                      <strong className="lg:text-lg">Purchase Date -</strong>{' '}
                      {new Date(
                        membership.purchasedate.split("-").reverse().join("-")
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong className="lg:text-lg">Validity Date -</strong>{' '}
                      {new Date(
                        membership.validitydate.split("-").reverse().join("-")
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
