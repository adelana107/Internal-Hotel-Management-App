import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
}

export async function createEditCabin(newCabin, id = null) {
  let imagePath = newCabin.image;

  // Only generate a new storage path and upload if image is a File object
  if (newCabin.image && newCabin.image instanceof File) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image, { cacheControl: "3600", upsert: false });

    if (storageError) {
      if (!id) await supabase.from("cabins").delete().eq("id", newCabin.id);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  // Insert or update cabin
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  else query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Cabin could not be created ");

  return data;
}

// Convenience function for creating new cabins
export async function createCabin(newCabin) {
  return createEditCabin(newCabin, null);
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
  return data;
}
