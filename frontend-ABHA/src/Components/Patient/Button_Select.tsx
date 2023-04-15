import "./about.css";

function Button_Select({ filenames, setFilenames, onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    setFilenames(filenames);
    onClick();
  };

  return (
    <div>
      <button className="custom-btn btn-3" onClick={handleClick}>
        <span>Show Files</span>
      </button>
    </div>
  );
}
export default Button_Select;
