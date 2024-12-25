import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { toast } from "react-toastify";
import { TbUserEdit } from "react-icons/tb";
import ChangeUserRole from "../components/ChangeUserRole";
import { MdDelete } from "react-icons/md";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
        method: SummaryApi.deleteUser.method,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("User deleted successfully.");
        fetchAllUsers(); // Refresh user list
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>№</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => (
            <tr key={el._id}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{moment(el?.createdAt).format("LLL")}</td>
              <td className="flex justify-evenly">
                {/* Edit button */}
                <button
                  className="bg-white p-2 rounded-full cursor-pointer hover:bg-cyan-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUpdateRole(true);
                  }}
                >
                  <TbUserEdit className="text-xl" />
                </button>
                {/* Delete button */}
                <button
                  className="bg-white p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                  onClick={() => deleteUser(el._id)}
                >
                  <MdDelete className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
