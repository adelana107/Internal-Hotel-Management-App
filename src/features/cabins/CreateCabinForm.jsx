import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { discount: 0 },
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // FIXED: No more { data, ... }
  function onSubmit(data) {
    mutate({
      ...data,
      image: data.image[0], // extract File from FileList
    });
  }

  function onError(errors) {
    console.log("Form errors:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Cabin Name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "Cabin name is required" })}
        />
        {errors?.name?.message && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.name.message}
          </span>
        )}
      </FormRow>

      {/* Maximum Capacity */}
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Label htmlFor="maxCapacity">Maximum capacity (guests)</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          min={1}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "There must be at least 1 guest" },
            valueAsNumber: true,
          })}
        />
        {errors?.maxCapacity?.message && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.maxCapacity.message}
          </span>
        )}
      </FormRow>

      {/* Regular Price */}
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          min={1}
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Price must be at least 1" },
            valueAsNumber: true,
          })}
        />
        {errors?.regularPrice?.message && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.regularPrice.message}
          </span>
        )}
      </FormRow>

      {/* Discount */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          min={0}
          {...register("discount", {
            required: "Discount is required",
            valueAsNumber: true,
            min: { value: 0, message: "Discount cannot be negative" },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than or equal to the regular price",
          })}
        />
        {errors?.discount?.message && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.discount.message}
          </span>
        )}
      </FormRow>

      {/* Description */}
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description", { required: "Description is required" })}
        />
        {errors?.description?.message && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.description.message}
          </span>
        )}
      </FormRow>

      {/* Cabin Photo */}
      <FormRow label="Cabin photo">
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", { required: "Image is required" })}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
