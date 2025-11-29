import Select from "./Select";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const value = e.target.value;
    // Update the "sort" query parameter in the URL
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  // Get the current sort value from search params
  const currentValue = searchParams.get("sort") || "";

  return (
    <Select
      options={options}
      type="white"
      value={currentValue}
      onChange={handleChange}
    />
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SortBy;
