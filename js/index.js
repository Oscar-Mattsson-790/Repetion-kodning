/**
 * 1. Slumpar ett start och slutord
 * 2. Visa startord för användaren
 * 3. Koppla en eventlistener till en knapp och nör användaren klickar på knappen hämta värdet från inputfält och spara i en variabel
 * 4. Kolla att användaren enbart bytt en bokstav
 * 5. Kolla mot dictionary API att det är ett engelsk ord
 * 6. Visa det ändrade ordet i gränssnittet för användaren
 * 7. Om senaste ordert ej var slutordet starta om från steg 3
 *    Annars visa att användaren vann
 */

const words = [
  { start: "EYE", end: "LID" },
  { start: "FOUR", end: "FIVE" },
  { start: "TIGER", end: "ROSES" },
  { start: "WHEAT", end: "BREAD" },
];
let selectedWord = {};

const startWordElem = document.querySelector("#start-word");
const endWordElem = document.querySelector("#end-word");
const inputElem = document.querySelector("#word-input");
const buttonElem = document.querySelector("#change-word");

function startGame() {
  const index = Math.floor(Math.random() * words.length); // Slumpar ett tal mellan 0
  selectedWord = words[index];

  startWordElem.innerText = selectedWord.start;
  endWordElem.innerText = selectedWord.end;
}

buttonElem.addEventListener("click", () => {
  const changedWord = inputElem.value; // Hämtar värdet från inputfältet
  let changedLetters = 0;
  console.log(words);
  for (const index in changedWord) {
    console.log(index);
    if (changedWord[index] !== selectedWord[index]) {
      changedLetters++;
    }
  }

  const lettersChangedWord = changedWord.split("");
  const lettersStartWord = selectedWord.start.split("");
  for (let index = 0; index < lettersChangedWord.length; index++) {
    console.log(`Index: ${index}`);
    console.log(lettersChangedWord[index]);
    console.log(lettersStartWord[index]);
    if (lettersChangedWord[index] !== lettersStartWord[index]) {
      changedLetters++; // Öka med 1
    }

    console.log(`Antalet bokstäver bytna: ${changedLetters}`);
    if (changedLetters === 1) {
      // Om användaren enbart byt en bokstav fosätt spelet
    } else {
      // Användaren bytte mer än en bkostav, säg till användaren att göra om och rätt
    }
  }
});

startGame();
