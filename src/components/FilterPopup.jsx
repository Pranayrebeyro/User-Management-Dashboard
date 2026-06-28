import { useState } from "react";

const FilterPopup = ({
  isOpen,
  onClose,
  onApply,
}) => {

  const [filterData, setFilterData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    department:"",
  });

  const handleChange=(e)=>{
    setFilterData({
      ...filterData,
      [e.target.name]:e.target.value,
    });
  };

  const applyFilters=()=>{
    onApply(filterData);
    onClose();
  };

  const clearFilters=()=>{

    const empty={
      firstName:"",
      lastName:"",
      email:"",
      department:"",
    };

    setFilterData(empty);

    onApply(empty);

  };

  if(!isOpen) return null;

  return(

<div className="modal-overlay">

<div className="filter-popup">

<h2>Filter Users</h2>

<input
type="text"
name="firstName"
placeholder="First Name"
value={filterData.firstName}
onChange={handleChange}
/>

<input
type="text"
name="lastName"
placeholder="Last Name"
value={filterData.lastName}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={filterData.email}
onChange={handleChange}
/>

<select
name="department"
value={filterData.department}
onChange={handleChange}
>

<option value="">All Departments</option>

<option value="IT">IT</option>

<option value="HR">HR</option>

<option value="Finance">Finance</option>

<option value="Sales">Sales</option>

<option value="Marketing">Marketing</option>

</select>

<div className="form-buttons">

<button onClick={applyFilters}>
Apply
</button>

<button onClick={clearFilters}>
Reset
</button>

<button onClick={onClose}>
Close
</button>

</div>

</div>

</div>

  );

};

export default FilterPopup;