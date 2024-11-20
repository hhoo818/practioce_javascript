// grid を canvas に描画する
export function renderGrid(grid,rowSize,colSize,ctx,RESOLUTION) {
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const cell = grid[row][col];
        ctx.beginPath();
        ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
  }