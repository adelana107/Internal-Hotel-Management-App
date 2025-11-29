import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  if (error) return <div>Failed to load cabins.</div>;

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;

  // Filter cabins based on discount
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount === 0 || cabin.discount === null
    );
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount !== null && cabin.discount > 0
    );
  }

  // Sorting
  const sortBy = searchParams.get("sort") || "name-asc"; // match SortBy component
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * modifier;
    }

    return (aVal - bVal) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin, index) => (
            <CabinRow key={cabin.id} cabin={cabin} index={index} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
