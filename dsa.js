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
// QUEUE (FIFO): waitlist ke liye
class Queue {
  constructor(items) { this.items = items || []; }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items.shift(); }
  position(x) { return this.items.indexOf(x) + 1; }
  remove(x) { var i = this.items.indexOf(x); if (i > -1) this.items.splice(i, 1); }
  size() { return this.items.length; }
}
// GRAPH: adjacency list. Har location ek node, raasta ek edge (distance meters me)
var campus = {};
function addEdge(a, b, d) {
  if (!campus[a]) campus[a] = [];
  if (!campus[b]) campus[b] = [];
  campus[a].push({ to: b, dist: d });
  campus[b].push({ to: a, dist: d });
}
addEdge("Main Gate", "Library", 100);
addEdge("Main Gate", "Canteen", 80);
addEdge("Main Gate", "Parking", 50);
addEdge("Library", "Auditorium", 120);
addEdge("Library", "Seminar Hall", 90);
addEdge("Canteen", "Computer Lab", 110);
addEdge("Auditorium", "Computer Lab", 70);

// BFS: sabse kam hops wala path. Time O(V + E). Queue use hota hai
function bfs(start, end) {
  var q = new Queue();
  q.enqueue([start]);
  var visited = new Set([start]);
  while (q.size() > 0) {
    var path = q.dequeue();
    var node = path[path.length - 1];
    if (node === end) return path;
    var nb = campus[node] || [];
    for (var i = 0; i < nb.length; i++) {
      if (!visited.has(nb[i].to)) {
        visited.add(nb[i].to);
        q.enqueue(path.concat([nb[i].to]));
      }
    }
  }
  return null;   // koi path nahi
}

// DFS: start se end tak saare possible paths. Recursion use hota hai
function dfsAll(node, end, path, result) {
  if (node === end) { result.push(path.slice()); return; }
  var nb = campus[node] || [];
  for (var i = 0; i < nb.length; i++) {
    if (path.indexOf(nb[i].to) === -1) {
      path.push(nb[i].to);
      dfsAll(nb[i].to, end, path, result);
      path.pop();
    }
  }
}

// Path ki total distance
function pathDistance(path) {
  var total = 0;
  for (var i = 0; i < path.length - 1; i++) {
    var nb = campus[path[i]];
    for (var j = 0; j < nb.length; j++) {
      if (nb[j].to === path[i + 1]) total += nb[j].dist;
    }
  }
  return total;
}