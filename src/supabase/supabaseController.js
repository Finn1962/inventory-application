const { supabase } = require("./supabaseClient.js");

async function uploadImage(file) {
  try {
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(`public/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new Error(error);
    } else {
      return data.path;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getImageUrl(filePath) {
  // filePath is for example "public/Frau mit Lampe.png"

  try {
    const { data } = await supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error(error);
  }
}

async function deleteImage(filePath) {
  const { data, error } = await supabase.storage
    .from("product-images")
    .remove(filePath);

  if (error) {
    throw new Error(error);
  } else {
    return data.path;
  }
}

module.exports = {
  uploadImage,
  getImageUrl,
  deleteImage,
};
