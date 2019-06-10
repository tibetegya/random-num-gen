import localforage from 'localforage';

/**
 * Generates Phone numbers and pasists them to indexDB 
 * @param {*} numberArray // array of existing numbers
 * @param {*} maxNumber // ammount of phone numbers to generate
 */
export const generatedNumbers = (numberArray, maxNumber, data={}) => {
  const owner = localStorage.getItem('companyName');
  while(numberArray.length < maxNumber){
    const random = Math.random();
    const rad = String(random).split('.')[1];
    const gen = '0'+rad.substring(0, 9);
    if (!numberArray.includes(gen)) numberArray.push(gen);
  }
  const sortedArray = randomSort(numberArray)
  return localforage.setItem('data', {
    ...data,
    [owner]: {
      owner,
      numbers: numberArray,
      max: sortedArray[sortedArray.length - 1],
      min: sortedArray[0]
    }
  }).then(addedData => {
    return addedData[owner];
  });
};

/**
 * First checks for existing numbers and then
 * generates and persists phone numbers to indexDB
 * @param {*} maxNumbers 
 */
export function generate (maxNumbers) {
  const owner = localStorage.getItem('companyName');
  return new Promise((resolve, reject) => {
    const storedData = localforage.getItem('data').then(data => {
      let numberArray = [];
      let newMaxNumbers = maxNumbers;

      if(!data) {
        return generatedNumbers(numberArray, newMaxNumbers);
      } else {
        if(data[owner]) {
          if(data[owner].numbers.length > 0) {
            console.log('add existing numbers to new arr');
            numberArray = [ ...data[owner].numbers ]
            newMaxNumbers += numberArray.length
          }
        }
        return generatedNumbers(numberArray, newMaxNumbers, data);
      }
    })
    resolve(storedData)
  })
}

/**
 * Retrives data from indexDB
 */
export const getData = () => {
  const owner = localStorage.getItem('companyName');
  return new Promise((resolve, reject) => {
    const retrievedData = localforage.getItem('data').then(data => {
      if(data) return data[owner];
      return null;
    })
    resolve(retrievedData);
  })
}

/**
 * Sorts an array using Quick sort algorithm
 * @param {*} origArray 
 */
function quickSort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}
		return newArray.concat(quickSort(left), pivot, quickSort(right));
	}
};

/**
 * Creates integers from string phone numbers 
 * before sorting and also adds prefixing zeros
 * after sorting.
 * @param {*} stringNumbersArr // input Array with string numbers 
 */
export function randomSort (stringNumbersArr) {
  const intNums = stringNumbersArr.map(num => parseInt(num, 10));
  return quickSort(intNums).map(intNum => {
    let stringNum = String(intNum);
    while(stringNum.length < 10){
      stringNum = '0'+stringNum;
    }
    return stringNum;
  });
}

/**
 * Paginates a given array into pages
 * @param {*} numbers // input numbers array
 */
export const paginateNumbers = (numbers) => {
  const pages = Math.ceil(numbers.length / 25);
  let numberPages = {}
  for(let i = 0; i < pages; i++ ){
    const page = i + 1;
    const beginIndex = 25 * i;
    const endIndex = 25 * (i+1);
    numberPages = {
      ...numberPages,
      [page]: numbers.slice(beginIndex, endIndex)
    }
  };
  return numberPages;
}

/**
 * Creates a CSV file from
 * an input object of phone numbers
 * @param {*} numbersObject 
 */
export const createCsv = (numbersObject) => {
  const rows = Object.values(numbersObject);
  const arrayString = rows.map(e=>e.join(",")).join("\n");
  let contentType = 'data:text/csv;charset=utf-8,'
  return encodeURI(contentType+arrayString);
}

export const getName = () => {
  return localStorage.getItem('companyName') || '';
}

