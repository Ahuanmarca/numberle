export function createHeader(headerTitle) {
  const header = document.createElement('header');
  const title = document.createElement("h1");
  title.innerText = headerTitle;
  header.appendChild(title);
  return header;
}
