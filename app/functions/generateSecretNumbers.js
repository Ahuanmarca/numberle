export function generateSecretNumbers(debug = false, count = 5) {
  const secretNumbers = [];
  const debugNums = [1, 2, 3, 2, 1];
  for (let i = 0; i < count; i++) {
    const number = debug ? debugNums[i] : Math.floor(Math.random() * 10);
    secretNumbers.push(number);
  }

  if (debug) {
    console.warn("🐞🐞 debugging generateSecretNumbers()");
    console.warn("🐞🐞 secretNumbers: ", secretNumbers);
  }
  return secretNumbers;
}
