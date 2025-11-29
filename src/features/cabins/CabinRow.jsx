import PropTypes from "prop-types";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const CabinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Img = styled.img`
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin, index }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount = 0, // default to 0 if null
    image,
    description,
  } = cabin;

  // Calculate final price after discount
  const finalPrice = regularPrice - discount;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <div>{index + 1}</div>

      <CabinInfo>
        <Img src={image} alt={name} />
        <CabinName>{name}</CabinName>
      </CabinInfo>

      <div>Fits up to {maxCapacity} guests</div>

      <Price>{formatCurrency(regularPrice)}</Price>

      {/* Show final price instead of percentage */}
      {discount > 0 ? (
        <Discount>{formatCurrency(finalPrice)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      {/* ACTIONS MENU */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            {/* DUPLICATE */}
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            {/* EDIT */}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            {/* DELETE */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* EDIT WINDOW */}
        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        {/* DELETE WINDOW */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="cabin"
            disabled={isDeleting}
            onConfirm={() => deleteCabin(cabinId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CabinRow;
