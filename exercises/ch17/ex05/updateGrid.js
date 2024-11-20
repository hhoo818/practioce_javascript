// Life Game のルールに従ってセルを更新する
export function updateGrid(grid,rowSize,colSize) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
  
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        let liveNeighbors = 0;
  
        // 周囲8セルの生存数を数える
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = (row + i + rowSize) % rowSize;
            const newCol = (col + j + colSize) % colSize;
            liveNeighbors += grid[newRow][newCol] ? 1 : 0;
          }
        }
  
        // ライフゲームのルールを適用
        if (grid[row][col]) {
          // 生きているセル
          nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
        } else {
          // 死んでいるセル
          nextGrid[row][col] = liveNeighbors === 3;
        }
      }
    }
    return nextGrid;
}