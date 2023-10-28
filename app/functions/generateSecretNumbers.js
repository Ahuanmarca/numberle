export function generateSecretNumbers(debug = false, count = 5, debugNums) {
  const secretNumbers = [];
  const secretMap = {};
  for (let i = 0; i < count; i++) {
    const number = Math.floor(Math.random() * 10);
    secretNumbers.push(number);
    if (!(number in secretMap)) secretMap[number] = 0;
    secretMap[number]++;
  }

  if (debug) {
    console.warn("🐞🐞 generateSecretNumbers() debug mode true 🐞🐞");
    console.warn("🐞🐞 secret numbers: ", secretNumbers);
  }
  return { secretNumbers, secretMap };
}
