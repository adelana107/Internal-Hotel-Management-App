import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";


function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-discount" },
          { value: "with-discount", label: "With-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by price (low first)" },
          { value: "regular-price-desc", label: "sort by price (high first)" },
          { value: "max-capacity-asc", label: "sort by capacity(low first)" },
          { value: "max-capacity-desc", label: "sort by capacity(high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
