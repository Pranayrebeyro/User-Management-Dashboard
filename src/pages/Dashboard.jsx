import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import FilterPopup from "../components/FilterPopup";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/api";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

const departments = [
  "IT",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
];

// Create 100 users from the original 10

const expandedUsers = [];

for (let i = 0; i < 10; i++) {
  response.data.forEach((user, index) => {
    const names = user.name.split(" ");

    expandedUsers.push({
      id: expandedUsers.length + 1,
      firstName: names[0],
      lastName: names.slice(1).join(" "),
      email: user.email,
      department: departments[index % departments.length],
    });
  });
}

setUsers(expandedUsers);

    } catch (error) {
  console.error("Fetch Error:", error);
  console.log(error.response);
  setError("Unable to fetch users.");
} finally {
      setLoading(false);
    }
  };

    // ===========================
  // Add User / Edit User
  // ===========================

  const handleAddOrUpdateUser = async (userData) => {
    try {

      if (selectedUser) {

        await updateUser(selectedUser.id, userData);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...userData,
                  id: selectedUser.id,
                }
              : user
          )
        );

      } else {

        const response = await addUser(userData);

        const newUser = {
          ...response.data,
          id: users.length + 1,
        };

        setUsers((prevUsers) => [
          ...prevUsers,
          newUser,
        ]);

      }

      setSelectedUser(null);

      setIsFormOpen(false);

    } catch (error) {

      console.error(error);

      alert("Unable to save user.");

    }
  };


  // ===========================
  // Delete User
  // ===========================

  const handleDeleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert("Unable to delete user.");

    }

  };

    // ===========================
  // Search Users
  // ===========================

  const searchedUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();

      return (
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    });
  }, [users, searchTerm]);



  // ===========================
  // Filter Users
  // ===========================

  const filteredUsers = useMemo(() => {
    return searchedUsers.filter((user) => {
      return (
        (filters.firstName === "" ||
          user.firstName
            .toLowerCase()
            .includes(filters.firstName.toLowerCase())) &&

        (filters.lastName === "" ||
          user.lastName
            .toLowerCase()
            .includes(filters.lastName.toLowerCase())) &&

        (filters.email === "" ||
          user.email
            .toLowerCase()
            .includes(filters.email.toLowerCase())) &&

        (filters.department === "" ||
          user.department === filters.department)
      );
    });
  }, [searchedUsers, filters]);



  // ===========================
  // Sort Users
  // ===========================

  const sortedUsers = useMemo(() => {
  const sorted = [...filteredUsers];

  sorted.sort((a, b) => {
    const valueA = a[sortField].toString().toLowerCase();
    const valueB = b[sortField].toString().toLowerCase();

    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    }

    return valueB.localeCompare(valueA);
  });

  return sorted;
}, [filteredUsers, sortField, sortOrder]);



  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.max(
  1,
  Math.ceil(sortedUsers.length / rowsPerPage)
  );

  const paginatedUsers = useMemo(() => {

    const startIndex =
      (currentPage - 1) * rowsPerPage;

    return sortedUsers.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  }, [
    sortedUsers,
    currentPage,
    rowsPerPage,
  ]);



  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return <Loader />;
  }



  // ===========================
  // Error
  // ===========================

  if (error) {
    return <h2>{error}</h2>;
  }

  if (error) {
  return <h2>{error}</h2>;
}

return (
  <div className="dashboard">

    <Navbar
      onAddUser={() => {
        setSelectedUser(null);
        setIsFormOpen(true);
      }}
    />

    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px",
  }}
>

  <button
    className="add-user-btn"
    onClick={() => setIsFilterOpen(true)}
  >
    Filter Users
  </button>

  <div style={{ display: "flex", gap: "10px" }}>

    <select
      value={sortField}
      onChange={(e) => setSortField(e.target.value)}
    >
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="email">Email</option>
      <option value="department">Department</option>
    </select>

    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

  </div>

  <p>Total Users: {sortedUsers.length}</p>

</div>

    <UserTable
      users={paginatedUsers}
      onEdit={(user) => {
        setSelectedUser(user);
        setIsFormOpen(true);
      }}
      onDelete={handleDeleteUser}
    />

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      onPageChange={setCurrentPage}
    />

    <UserForm
      isOpen={isFormOpen}
      onClose={() => {
        setIsFormOpen(false);
        setSelectedUser(null);
      }}
      onSubmit={handleAddOrUpdateUser}
      selectedUser={selectedUser}
    />

    <FilterPopup
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      onApply={(filterValues) => {
        setFilters(filterValues);
        setCurrentPage(1);
      }}
    />

  </div>
);

};

export default Dashboard;
