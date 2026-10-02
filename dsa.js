// MERGE SORT: O(n log n)
function mergeSort(arr, key, asc = true) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key, asc);
  const right = mergeSort(arr.slice(mid), key, asc);
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    const takeLeft = asc ? left[i][key] <= right[j][key] : left[i][key] >= right[j][key];
    if (takeLeft) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

// LINEAR SEARCH (substring match): O(n)
function searchEvents(list, query) {
  const q = query.toLowerCase();
  const found = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].title.toLowerCase().includes(q)) found.push(list[i]);
  }
  return found;
}