const fileController = require("../controllers/FileController");
const { HttpError } = require("../helpers");
const getImage = async (req, res, next) => {
  // Проверяем наличие mainPhoto в запросе
  if (
    req.files &&
    req.files["mainPhoto"] &&
    req.files["mainPhoto"].length > 0
  ) {
    const mainPhotoFile = req.files["mainPhoto"][0];
    const { path: mainTmpDir } = mainPhotoFile;
    const { secure_url, public_id } = await fileController.upload(
      mainTmpDir,
      "images"
    );
    req.body.mainPhoto = secure_url;
    req.body.imageId = public_id;
  }

  // Проверяем наличие extraPhotos в запросе
  if (
    req.files &&
    req.files["extraPhotos"] &&
    req.files["extraPhotos"].length > 0
  ) {
    const extraPhotos = [];

    // Проходим по всем файлам extraPhotos и асинхронно обрабатываем каждый
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
