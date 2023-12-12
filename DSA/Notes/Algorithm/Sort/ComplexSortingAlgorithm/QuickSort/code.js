function pivot(arr, start, end) {
    let swapIndex = start;
    let swap = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }

    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < arr[start]) {
            swapIndex++
            swap(arr, swapIndex, i)
        }
    }

    swap(arr, swapIndex, start)

    return swapIndex
}

function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        let pivotIndex = pivot(arr, start, end)
        //left
        quickSort(arr, start, pivotIndex - 1)
        // right
        quickSort(arr, pivotIndex + 1, end)
    }
    return arr
}
console.log(quickSort([92, 21, 12, 45, 3, 5, 0, -22, -44, -9, 2389]).toString())