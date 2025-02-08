const wordList = [
  { word: "apple", hint: "A common fruit that keeps the doctor away." },
  { word: "cat", hint: "A small domestic animal that says 'meow'." },
  { word: "ball", hint: "A round object used in many sports." },
  { word: "tree", hint: "A tall plant with leaves and a trunk." },
  { word: "fish", hint: "An animal that lives in water and has gills." },
  { word: "bird", hint: "A creature with feathers that can fly." },
  { word: "book", hint: "A collection of written pages, often with stories." },
  { word: "moon", hint: "A natural satellite that orbits the Earth." },
  { word: "rain", hint: "Water that falls from the sky in droplets." },
  { word: "star", hint: "A bright object in the night sky." }
];

let selectedWordObj = wordList[Math.floor(Math.random() * wordList.length)];
let selectedWord = selectedWordObj.word;
let guessedWord = Array(selectedWord.length).fill("_");
let wrongGuesses = 0;

document.getElementById("word-display").textContent = guessedWord.join(" ");
document.getElementById("hint").textContent = `Hint: ${selectedWordObj.hint}`;

const keyboard = document.getElementById("keyboard");
for (let i = 97; i <= 122; i++) {
  let btn = document.createElement("button");
  btn.textContent = String.fromCharCode(i);
  btn.onclick = () => guessLetter(btn.textContent);
  keyboard.appendChild(btn);
}

function guessLetter(letter) {
  if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === letter) guessedWord[i] = letter;
      }
  } else {
      wrongGuesses++;
      document.getElementById("hangman-img").src = `hangman-${wrongGuesses}.svg`;
  }
  document.getElementById("word-display").textContent = guessedWord.join(" ");

  if (!guessedWord.includes("_")) {
      document.getElementById("message").textContent = "🎉 You Win!";
      document.getElementById("hangman-img").src = "victory.gif"; 
      disableKeyboard();
  } else if (wrongGuesses >= 6) {
      document.getElementById("message").textContent = "😢 Game Over!";
      document.getElementById("hangman-img").src = "lost.gif";
      disableKeyboard();
  }
}

function disableKeyboard() {
  document.querySelectorAll(".keyboard button").forEach(button => button.disabled = true);
}
