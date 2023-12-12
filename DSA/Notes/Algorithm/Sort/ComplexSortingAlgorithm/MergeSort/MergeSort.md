# Merge Sort

![Alt text](image.png)

![Alt text](image-1.png)

### Merging

![Alt text](image-2.png)

![Alt text](image-3.png)

```js
function merge(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  // if (i === arr1.length)
  // result = [...result, ...arr2.slice(j)]
  // else
  // result = [...result, ...arr1.slice(i)]
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}
```

### Merging + Sorting

![Alt text](image-5.png)

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
```

<br>

##### Big O

![Alt text](image-6.png)

- spliting - O(log n)
- Comparison in Merging - O(n)
- Merge Sort - O(n log n)

![Alt text](image-7.png)

![Alt text](image-8.png)
