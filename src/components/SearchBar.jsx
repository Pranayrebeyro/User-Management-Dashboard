const SearchBar = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="search-container">

      <input
        className="search-input"
        type="text"
        placeholder="Search by first name, last name or email..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

    </div>
  );
};

export default SearchBar;