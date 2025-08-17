function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getRandomList(lstObj, count) {
  if (!Array.isArray(lstObj) || lstObj.length === 0 || count <= 0) return [];
  const arr = [...lstObj];
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

function returnMatchedLine(line1, line2, randomWord) {
  let arr = line1.split(' ');
  let arrInd = arr.findIndex((item) => item === randomWord);
  if (arrInd !== -1) {
    arr[arrInd] = '_';
    return { matchedLine: 'line1', replacedString: arr.join(' ') };
  }

  arr = line2.split(' ');
  arrInd = arr.findIndex((item) => item === randomWord);
  arr[arrInd] = '_';
  return { matchedLine: 'line2', replacedString: arr.join(' ') };
}

export {
  isEmpty,
  getRandomList,
  returnMatchedLine,
};
