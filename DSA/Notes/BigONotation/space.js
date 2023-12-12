//Space Complexity

//Length of input determines the space required for an algorithm
//But we dont add the space taken by the input 

const sumOfArray = (arr) => {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

//Get first n whole number in an array

function getWholeNumberArray(n) {
    const wholeNumberArray = [];
    for (let i = 0; i < n; i++) {
        wholeNumberArray.push(i)
    }
    return wholeNumberArray
}