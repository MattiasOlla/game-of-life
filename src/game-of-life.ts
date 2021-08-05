const RULES = {
  STAY_ALIVE: [2, 3],
  BIRTH: [3],
};

// size = 4
// 1,  2,  3,  4
// 5,  6,  7,  8
// 9,  10, 11, 12
// 13, 14, 15, 16

export function getNextGeneration(cellsAlive: boolean[]): boolean[] {
  const size = Math.sqrt(cellsAlive.length);
  return cellsAlive.map((aliveNow, index) => {
    const numAliveNeighbors = getNeighborIndices(index, size)
      .map((idx) => Number(cellsAlive[idx]))
      .reduce((a, b) => a + b);

    return aliveNow
      ? RULES.STAY_ALIVE.includes(numAliveNeighbors)
      : RULES.BIRTH.includes(numAliveNeighbors);
  });
}

function getNeighborIndices(index: number, size: number): number[] {
  const neighborIndices: number[] = [];
  const offsets = [-1, 0, 1];
  for (let rowOffset of offsets) {
    for (let colOffset of offsets) {
      let indexCandidate = index + colOffset + rowOffset * size;
      if (
        indexCandidate >= 0 &&
        indexCandidate < size ** 2 &&
        chebyshevDistance(index, indexCandidate, size) === 1
      )
        neighborIndices.push(indexCandidate);
    }
  }
  return neighborIndices;
}

function chebyshevDistance(index1: number, index2: number, size: number) {
  const columnDiff = Math.abs(Math.floor(index1 / size) - Math.floor(index2 / size));
  const rowDiff = Math.abs((index1 % size) - (index2 % size));
  return Math.max(rowDiff, columnDiff);
}
