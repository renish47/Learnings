//Big O

// 3 operations
const getThirdElement = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (i === 2) return arr[i];
  }
};
//1 operation
// const getThirdElement = (arr) => arr[2];

// console.time("measureTime");
// console.log(getThirdElement([22, 33, 55, 66, 77]));
// console.timeEnd("measureTime");

//time  complexity:

// 3 operations
// function someOperation(n) {
//   return (n * (n + 5)) / 2;
// }
// //Constant time
// //O(1)

// // someOperation(30);

// // first first n natural numbers
// function printNumbers(n) {
//   for (let i = 1; i <= n; i++) {
//     i+=1;
//   }
// }

//linear
//O(n)

// printNumbers(10); //10 operations
// printNumbers(100); //100 operations

//Rules

//Arithmetic Operations are constants

//Constants don't matter

//In loop, the complexity is the length of the loop time the complexity of whatever happens inside the loop

function printCoordinates(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`(${i}, ${j})`);
    }
  }
}

//Quadratic
//O(n*n) = O(n^2)
// printCoordinates(5);

//O(500) = O(1)
//O(2n) = O(n)
//O(100n + 10) = O(n+1) = O(n)

//O(13n^2) = O(n^2)

function printRightTriangle(n) {
  //   //n - height

  for (let i = 0; i <= n; i++) {
    let line = "";

    for (let j = 1; j <= i; j++) {
      line += "*"; //O(n)
    }
    console.log(line);
  }
}

printRightTriangle(100); //O(n)

// 1,2,3,4,...,n sum of the series
//n(n+1)/2 = (n^2+n)/2

//O(n ^2);

// 1000000 + 1000;

// function logAtLeast5(n) {
//   for (let i = 1; i <= Math.max(5, n); i++) {
//     console.log(i);
//   }
// }

// //O(n)

// function logAtMost5(n) {
//   for (let i = 1; i <= Math.min(5, 6); i++) {
//     console.log(i);
//   }
// }

//O(1)


function someFunction(N, M) {
  let a = 0, b = 0;
  for (i = 0; i < N; i++) {
    a = a + Math.random();
  }
  for (j = 0; j < M; j++) {
    b = b + Math.random();
  }
}


// [[],[]]
// {{},{}} //O(n^2)



//[   23, 45 , 677, 3939 ]
//     0   1     2     3

// arr[0]

