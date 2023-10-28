export function createButtonBar(buttons) {
  const buttonBar = document.createElement("div");
  buttonBar.classList.add("button-bar");
  for (const button of buttons) {
    const newButton = document.createElement("button");
    if (typeof button === 'string') {
      newButton.classList.add(`${button.toLowerCase()}-button`);
      newButton.value = button.toLowerCase();
      newButton.innerText = button;
    } else if (typeof button === 'number') {
      newButton.classList.add('number-button', `number-button-${button}`)
      newButton.value = `${button}`;
      newButton.innerText = `${button}`;
    }
    buttonBar.appendChild(newButton);
  }
  return buttonBar;
}
