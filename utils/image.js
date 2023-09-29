function getFilePath(file) {
  const filePath = file.path;
  const fileBar = filePath.replace(/\\/g, "/");
  const fileSplit = fileBar.split("/");

  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getFilePath,
};
