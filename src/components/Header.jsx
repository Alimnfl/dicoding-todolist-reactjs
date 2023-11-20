import PropTypes from 'prop-types';

function Header({ handleToggleMode, toggleMode }) {
  const handleToggleDarkMode = () => {
    handleToggleMode((previousDarkmode) => !previousDarkmode);
  };

  return (
    <div className="flex items-center justify-between w-full text-black">
      <h1 className={`text-2xl font-bold ${toggleMode ? 'text-white' : 'text-black'}`}>Alimnfl Todos</h1>
      <button onClick={handleToggleDarkMode} className="p-1 px-3 font-medium rounded-xl bg-slate-300 text-md">
        Toggle Mode
      </button>
    </div>
  );
}

Header.propTypes = {
  handleToggleMode: PropTypes.func.isRequired,
  toggleMode: PropTypes.bool.isRequired,
};

export default Header;
