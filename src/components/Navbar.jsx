const Navbar = ({ onAddUser }) => {
  return (
    <div className="navbar">

      <div className="navbar-title">
        <h1>User Management Dashboard</h1>
        <p>Manage users using CRUD operations</p>
      </div>

      <button
        className="add-user-btn"
        onClick={onAddUser}
      >
        + Add User
      </button>

    </div>
  );
};

export default Navbar;