module.exports = (data) => {
  const validKeys = ['event', 'meta', 'user', 'page', 'data'];
  const dataKeys = Object.keys(data);

  if (validKeys.length !== dataKeys.length) {
    return false;
  }

  const invalidDataKeys = dataKeys.filter(key => validKeys.indexOf(key) === -1);
  if (invalidDataKeys.length) {
    return false;
  }

  const dataSize = sizeof(data);
  if (dataSize > 4000) {
    return;
  }

  return true;
}
