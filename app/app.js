import { createHeader } from "./components/createHeader.js";
import { createGrid } from "./components/createGrid.js";
import { createButtonBar } from "./components/createButtonBar.js";
import { generateSecretNumbers } from "./functions/generateSecretNumbers.js";
import { checkGuess } from "./functions/checkGuess.js";

const root = document.querySelector("#root");

// Page structure
/**
 * <div#root>
 *    <div.super-container>
 *      <div.game-container>
 *        <header>
 *          <h1>
 *          <hr>
 *        <div.grid-container>
 *          <div.row> x 6
 *            <div.cell> x 5
 *        <div.button-bar>
 *          <button divs> - enter, numbers, delete
 */

const { secretNumbers, secretMap } = generateSecretNumbers(true);

const game = {
  active: true,
  attempts: 0, // serves to index a grid row
  rows: 6, // attempts allowed
  columns: 5, // secret number length
  guess: [],
  secretNumbers,
  secretMap,
  testedNumbers: Array(10).fill(false),
};

// Building the page structure
const superContainer = document.createElement("div");
superContainer.classList.add("super-container");
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
gameContainer.appendChild(createHeader("NUMBERLE"));
gameContainer.appendChild(createGrid(game.rows, game.columns));
gameContainer.appendChild(
  createButtonBar(["Enter", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "Delete"])
);
superContainer.appendChild(gameContainer);
root.appendChild(superContainer);

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((b) =>
  b.addEventListener("click", (e) => {
    // if row no esta lleno, juego sigue activo
    if (game.guess.length < game.columns && game.active) {
      const row = document.querySelector(`.row-${game.attempts}`);
      const cells = row.childNodes;
      const currentCell = cells[game.guess.length];
      currentCell.innerText = e.target.value;
      game.guess.push(e.target.value);
    }
  })
);

const deleteButton = document.querySelector(".delete-button");
deleteButton.addEventListener("click", (e) => {
  if (game.guess.length > 0 && game.active) {
    const row = document.querySelector(`.row-${game.attempts}`);
    const cells = row.childNodes;
    const cell = cells[game.guess.length - 1];
    cell.innerText = "";
    game.guess.pop();
  }
});

const enterButton = document.querySelector(".enter-button");
enterButton.addEventListener("click", () => {
  if (game.guess.length === game.columns && game.active) {
    const rowColors = checkGuess(  // [ green, green, gray, gray, gray ]
      game.guess, // [ 1, 2, 3 , 4, 5]
      game.secretNumbers, // [ 1, 2, 0, 0, 0 ]
      game.secretMap
    );
    rowColors.forEach((color, index) => {
      // change cell color
      const cell = document.querySelector(`.row-${game.attempts}`).childNodes[
        index
      ];
      cell.style.backgroundColor = color;
      cell.style.color = "white";

      // change button color
      // TODO: Too confusing! 😵‍💫 REFACTOR!
      const colorStep = {
        false: 0,
        "#797C7E": 1, // gray, absent
        "#C5B565": 2, // yellow, present
        "#79A86B": 3, // green, correct
      };
      const button = document.querySelector(
        `.number-button-${game.guess[index]}`
      );
      if (colorStep[color] > colorStep[game.testedNumbers[game.guess[index]]]) {
        game.testedNumbers[game.guess[index]] = color;
        button.style.backgroundColor = color;
        button.style.color = "white";
      }
    });

    game.attempts++;
    game.guess.splice(0, game.guess.length);

    if (
      game.attempts === game.rows ||
      rowColors.every((color) => color === "#79A86B")
    )
      game.active = false;
  }
});
