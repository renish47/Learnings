//Big O Time

// It can measure the efficiency and performance of your algorithm using time and space compliexties


//4 operations
const getThirdElement = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (i === 2) return arr[i]
    }
}

//1 operation
// const getThirdElement = (arr) => arr[2]

// console.time("measureTime")
// console.log(getThirdElement([22, 33, 55, 66, 77]))
// console.timeEnd("measureTime")


// This is even though giving the time taken by our code to complete, it varies time to time which depends on the hardware it uses to run the code.

//So the other way to measure the time is by go throughing what are the operations the code is using and try to identify whether the code takes more time or not

//Which basically means How many tasks the algorithm in performing


//3 operations
function someOperation(n) {
    return (n * (n + 5)) / 2
}


// So in the above code if we increase the input,  it doen't increase the number of operations

//Hence the algorithm takes constant time to perform for whatever input we are providing 

//Hence we can mark it as O(3) => O(1)
// as constants are not considered in bigO


//first first n natural numbers
function printNumbers(n) {
    for (let i = 1; i <= n; i++) {
        console.log(n)
    }
}


//Here we can see as the input increasing, time need to complete the task is also getting increased as well

// O(n) since here the time complexity depends on n

//first first n natural numbers in both direction
function printNumbersInBothDirection(n) {
    console.log("Forward Direction")
    for (let i = 1; i <= n; i++) {
        console.log(n)
    }
    console.log("Backward Direction")
    for (let i = n; i > 0; i--) {
        console.log(n)
    }
}

//O(2+2n) => O(n)




function printCoordinates(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(`(${i}, ${j})`);
        }
    }
}

// O(n^2)

function printRightTriangle(n) {
    //n - height

    for (let i = 1; i <= n; i++) {
        let line = ""
        for (let j = 1; j <= i; j++) {
            line += "*"
        }
        console.log(line)
    }
}

printRightTriangle(3)

// 1,2,3,4,...,n  sum of the series
//n(n+1)/2 = (n^2+n)/2 




function logAtLeast5(n) {
    for (let i = 1; i <= Math.max(5, n); i++) {
        console.log(i)
    }
}
function logAtMost5(n) {
    for (let i = 1; i <= Math.min(5, n); i++) {
        console.log(i)
    }
}

arr[1, 2, 3, 4, 5]
