export function checkGuess(guess, secretNumbers) {
  const green = "#79A86B";
  const yellow = "#C5B565";
  const gray = "#797C7E";

  const secretMap = {};
  secretNumbers.forEach((num) => {
    if (num in secretMap === false) secretMap[num] = 0;
    secretMap[num]++;
  });
  const guessCopy = [...guess];
  const output = Array(guess.length).fill(undefined);

  // GREEN CELLS
  guessCopy.forEach((num, index, ref) => {
    if (Number(num) === secretNumbers[index]) {
      output[index] = green;
      ref[index] = undefined;
      secretMap[num]--;
    }
  });

  // YELLOW CELLS
  guessCopy.forEach((num, index, ref) => {
    if (secretMap[num] > 0) {
      output[index] = yellow;
      secretMap[num]--;
    }
  });

  console.log(output, guessCopy, secretMap);

  // GRAY CELLS
  return output.map((c) => (c ? c : gray));
}