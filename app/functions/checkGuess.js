export function checkGuess(guess, secretNumbers, secretMap) {
  const yellow = "#C5B565";
  const green = "#79A86B";
  const gray = "#797C7E";

  const secretCopy = {...secretMap}
  const output = [];
  for (let i = 0; i < guess.length; i++) {
    if (Number(guess[i]) === secretNumbers[i]) {
      output.push(green);
      secretCopy[guess[i]]--;
    } else if (guess[i] in secretCopy && secretCopy[guess[i]] > 0) {
      output.push(yellow);
      secretCopy[guess[i]]--;
    } else {
      output.push(gray);
    }
  }
  return output;
}

// guess            [1,2,3,4,5]
// secretNumbers    [1,3,2,2,6]
// secretMap = { 1: 1, 2: 2, 2: 1, 6: 1}
// output = [ green, yellow, yellow, gray, gray ]