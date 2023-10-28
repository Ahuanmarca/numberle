export function createGrid(rows, columns) {
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  for (let i = 0; i < rows; i++) {
    const newRow = document.createElement("div");
    newRow.className = `row row-${i}`;

    for (let j = 0; j < columns; j++) {
      const newCell = document.createElement("div");
      newCell.className = `cell cell-${j}`;
      newRow.appendChild(newCell);
    }
    gridContainer.appendChild(newRow);
  }
  return gridContainer;
}