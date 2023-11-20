import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function Search({ handleSearchText, toggleMode }) {
  const handleChange = (e) => {
    const searchText = e.target.value;
    handleSearchText(searchText);
  };
  return (
    <div className="flex flex-row items-center w-full gap-2 p-2 mt-6 border rounded-md bg-slate-200">
      <FaSearch size="12px" className={`${toggleMode ? 'text-white' : 'text-black'}`} />
      <input type="text" placeholder="Search your note" onChange={handleChange} className="bg-slate-200 w-full h-full text-[14px]" />
    </div>
  );
}

Search.propTypes = {
  handleSearchText: PropTypes.func.isRequired,
  toggleMode: PropTypes.bool.isRequired,
};

export default Search;
