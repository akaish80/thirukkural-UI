function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getRandomList(lstObj, count) {
  let arrLst = [];
  const mySet1 = new Set();

  do {
    mySet1.add(lstObj[Math.floor(Math.random() * lstObj.length)]);
    arrLst = Array.from(mySet1);
  } while (arrLst.length < count);
  return arrLst;
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
