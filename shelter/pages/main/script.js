window.addEventListener('load', () => {
  getQuotes()
})


async function getQuotes() {
  const listContainer = document.querySelectorAll('.list-container')
  const imgHelp = './help.json';
  const res = await fetch(imgHelp);

  const data = await res.json();

  listContainer.forEach((x, i) => {
    x.childNodes[1].style.background = `url('${data[i].icon}')`;
    x.childNodes[3].innerText = data[i].text

  })

}


