const fileController = require("../controllers/FileController");
const { HttpError } = require("../helpers");

const getImage = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(HttpError(400, "Attached files not found"));
  }

  // Обработка основной фотографии
  if (req.files["mainPhoto"] && req.files["mainPhoto"].length > 0) {
    const mainPhotoFile = req.files["mainPhoto"][0];
    const { path: mainTmpDir } = mainPhotoFile;
    const { secure_url, public_id } = await fileController.upload(
      mainTmpDir,
      "images"
    );
    req.body.mainPhoto = secure_url;
    req.body.imageId = public_id;
  }

  // Обработка дополнительных фотографий (extraPhotos)
  if (req.files["extraPhotos"] && req.files["extraPhotos"].length > 0) {
    const extraPhotos = [];

    // Проход по всем файлам extraPhotos и асинхронная обработка каждого
    for (const extraPhotoFile of req.files["extraPhotos"]) {
      const { path: extraTmpDir } = extraPhotoFile;
      const { secure_url } = await fileController.upload(extraTmpDir, "images");
      extraPhotos.push(secure_url);
    }

    req.body.extraPhotos = extraPhotos;
  }

  next();
};

module.exports = getImage;
