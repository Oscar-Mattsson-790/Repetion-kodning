/**
 * 1. Slumpar ett start och slutord
 * 2. Visa start-och slutord för användaren
 * 3. Koppla en eventlistener till en knapp och när användaren klickar på knappen
 * hämta värde från inputfält och spara i en variabel
 * 4. Kolla att användaren enbart bytt ut en bokstav
 * 5. Kolla mot dictionary API att det är ett engelskt ord
 * 6. Visa det ändrade ordet i gränssnittet för användaren
 * 7. Om senaste ordet ej var slutordet starta om från steg 3
 *    Annars visa att användaren vann
 */

const words = [
  { start: "EYE", end: "LID" },
  { start: "FOUR", end: "FIVE" },
];
let selectedWord = {};
let changedWords = [];

const startWordElem = document.querySelector("#start-word");
const endWordElem = document.querySelector("#end-word");
const inputElem = document.querySelector("#word-input");
const buttonElem = document.querySelector("#change-word");
const wordsElem = document.querySelector("#words");

function startGame() {
  const index = Math.floor(Math.random() * words.length); // Slumpar ett tal mellan 0 och längden på arrayen words
  selectedWord = words[index];

  startWordElem.innerText = selectedWord.start;
  endWordElem.innerText = selectedWord.end;
}

function checkIfOnlyChangedOneLetter(word) {
  console.log(word);
  let changedLetters = 0;
  let lastWord = ""; // Deklarerar en tom variabel här för att variabler som deklaras i ett block (alltså inom {}) blir enbart synliga i det blocket (exempelvis en if-sats)

  if (changedWords.length > 0) {
    lastWord = changedWords[changedWords.length - 1]; // Hämta alltid det sista ordet i array:en
  } else {
    lastWord = selectedWord.start;
  }

  const lettersChangedWord = word.split(""); // Splitta ordet till en array med varje bokstav i var sin position
  lastWordArray = lastWord.split(""); // Splitta startordet till en array med varje bokstav i var sin position
  for (let index = 0; index < lettersChangedWord.length; index++) {
    if (lettersChangedWord[index] !== lastWordArray[index]) {
      // Kolla om varje bokstav är olik eller är samma
      changedLetters++; // Öka med 1
    }
  }

  return changedLetters;
}

async function checkIfEnglishWord(changedWord) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${changedWord}`
  );
  const data = await response.json();

  return data;
}

function displayWords() {
  wordsElem.innerHTML = ""; // Ta bort alla li-taggar i ul-taggen

  for (let i = 0; i < changedWords.length; i++) {
    const elem = document.createElement("li");
    elem.innerText = changedWords[i];
    wordsElem.append(elem); // Lägg till li-taggen i vår ul-tagg så den syns i HTML-trädet
  }
}

function hasWon(changedWord) {
  if (changedWord === selectedWord.end) {
    alert("Du vann!");
  }
}

buttonElem.addEventListener("click", async () => {
  const changedWord = inputElem.value; // Hämtar värde från inputfältet
  if (changedWord.length === selectedWord.start.length) {
    const changes = checkIfOnlyChangedOneLetter(changedWord);
    console.log(`Antalet bokstäver bytna: ${changes}`);
    if (changes === 1) {
      // Om användaren enbart byt en bokstav, fortsätt spelet
      const result = await checkIfEnglishWord(changedWord);

      if (result.title) {
        console.log(result.title);
      } else {
        console.log("Korrekt engelskt ord");
        changedWords.push(changedWord);

        displayWords();
        hasWon(changedWord);
      }
    } else {
      // Användaren bytte mer än en bokstav, säg till användaren att göra om och rätt
      alert("Du får bara byta ut en bokstav åt gången!");
    }
  }
});

startGame();
