import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLogin } from "./LoginContext"; // Import useLogin hook
import { SERVERIP } from "../config";

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
        return "bg-gradient-to-t from-yellow-100 to-yellow-200";
      case "silver":
        return "bg-gradient-to-t from-neutral-300 to-stone-400";
      case "base":
        return "bg-gradient-to-t from-orange-100 to-orange-300";
      default:
        return "bg-gradient-to-t from-blue-200 to-blue-300";
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
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 mt-7">
          Your Memberships
        </h2>
        <div className="flex flex-col w-4/5 my-10">
          <div className="flex flex-col justify-start my-3 mx-5 ">
            <h3 className="text-xl lg:text-2xl font-semibold mb-2">
              Active Memberships
            </h3>
            <div className="flex gap-6 my-4 flex-wrap">
              {currentMemberships.map((membership, index) => (
                <Link key={index} to={`/QR`} className="object-cover">
                  <div className="flex flex-col py-3 px-3 justify-center bg-white rounded-lg">
                    <div
                      className={`rounded-md ${getColor(
                        membership.memtype
                      )} text-center w-[230px] lg:w-[250px] h-[280px] max-sm:w-full max-sm:h-[200px] mb-5`}
                      // style={getCardStyle(230, 180)}
                    >
                      {/* <p>
                        <strong className="lg:text-lg">Purchase Date -</strong>{" "}
                        {new Date(
                          membership.purchasedate.split("-").reverse().join("-")
                        ).toLocaleDateString()}
                      </p> */}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                      {toTitleCase(membership.memtype)}
                    </h3>
                    <p>
                      <div className="flex capitalize">
                        Validity till :{" "}
                        {new Date(
                          membership.validitydate.split("-").reverse().join("-")
                        ).toLocaleDateString()}
                      </div>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-1/2 w-4/5 my-10">
          <div className="flex flex-col justify-between my-3 mx-5">
            <h3 className="text-xl lg:text-2xl font-semibold">
              Previous Memberships
            </h3>
            <div className="flex gap-6 my-4 flex-wrap">
              {previousMemberships.map((membership, index) => (
                <div
                  key={index}
                  className="flex flex-col py-3 px-3 justify-center bg-white rounded-lg"
                >
                  <div
                    className={`px-4 flex flex-col justify-evenly rounded-md ${getColor(
                      membership.memtype
                    )} text-center w-[230px] lg:w-[250px] h-[280px] max-sm:w-full mb-5`}
                    // style={getCardStyle(150, 180)}
                  ></div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                    {toTitleCase(membership.memtype)}
                  </h3>
                  {/* <p>
                      <strong className="lg:text-lg">Purchase Date -</strong>{" "}
                      {new Date(
                        membership.purchasedate.split("-").reverse().join("-")
                      ).toLocaleDateString()}
                    </p> */}
                  <p>
                    <div className="flex capitalize">
                      Valid till :{" "}
                      {new Date(
                        membership.validitydate.split("-").reverse().join("-")
                      ).toLocaleDateString()}
                    </div>{" "}
                  </p>
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
