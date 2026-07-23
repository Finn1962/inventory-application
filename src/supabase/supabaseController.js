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

/*
const jpegBild = {
  fieldname: "images",
  originalname: "Frau mit Lampe.png",
  encoding: "7bit",
  mimetype: "image/png",
  buffer: Buffer.from("fake-image-data"),
  size: 35148989,
};

uploadImage(jpegBild).then(() => {
  console.log("upload vertig");
  getImageUrl("public/Frau mit Lampe.png");
});*/

module.exports = {
  uploadImage,
  getImageUrl,
};
