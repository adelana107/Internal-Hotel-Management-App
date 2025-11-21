import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // 1. Generate a clean file name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  // 2. Prepare final URL that will be stored in the DB
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 3. Insert cabin FIRST (with temporary URL)
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const createdCabin = data[0]; // Correctly reference the inserted cabin

  // 4. Upload image to storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    // Roll back cabin insert (use correct ID)
    await supabase.from("cabins").delete().eq("id", createdCabin.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return createdCabin;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
