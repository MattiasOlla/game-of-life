export interface GridSize {
  columns: number;
  rows: number;
}

const RULES = {
  STAY_ALIVE: [2, 3],
  BIRTH: [3],
};

// numCols = 4
// 1,  2,  3,  4
// 5,  6,  7,  8
// 9,  10, 11, 12
// 13, 14, 15, 16
// 17, 18, 19, 20

export function getNextGeneration(cellsAlive: boolean[], size: GridSize): boolean[] {
  return cellsAlive.map((aliveNow, index) => {
    const numAliveNeighbors = getNeighborIndices(index, size)
      .map((idx) => Number(cellsAlive[idx]))
      .reduce((a, b) => a + b);

    return aliveNow
      ? RULES.STAY_ALIVE.includes(numAliveNeighbors)
      : RULES.BIRTH.includes(numAliveNeighbors);
  });
}

function getNeighborIndices(index: number, size: GridSize): number[] {
  const neighborIndices: number[] = [];
  const offsets = [-1, 0, 1];
  for (let rowOffset of offsets) {
    for (let colOffset of offsets) {
      let indexCandidate = index + colOffset + rowOffset * size.columns;
      if (
        indexCandidate >= 0 &&
        indexCandidate < size.columns * size.rows &&
        chebyshevDistance(index, indexCandidate, size) === 1
      )
        neighborIndices.push(indexCandidate);
    }
  }
  return neighborIndices;
}

function chebyshevDistance(index1: number, index2: number, { columns }: GridSize) {
  const columnDiff = Math.abs(Math.floor(index1 / columns) - Math.floor(index2 / columns));
  const rowDiff = Math.abs((index1 % columns) - (index2 % columns));
  return Math.max(rowDiff, columnDiff);
}

export function list2coords(cellsAlive: boolean[], { columns }: GridSize): number[][] {
  return cellsAlive
    .map((alive, index) => (alive ? [Math.floor(index / columns), index % columns] : []))
    .filter((arr) => arr.length);
}

export function coords2list(coords: number[][], { rows, columns }: GridSize): boolean[] {
  const indices = new Set(coords.map(([i, j]) => j * columns + i));
  console.log(indices);
  return Array(rows * columns)
    .fill(0)
    .map((_, index) => indices.has(index));
}
