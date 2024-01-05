0//setting Gam Name 
let gameName = "Guess the Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game created By MUNEER CHADID`;
//setting Game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
//manage words انشاء مصفوفة بلكلمات وضرب بعدد عناصر لمصفوفه ولحروف كلها صغيرة 
let wordToGuess = "";
const words = ["Toyota", "Subaru", "Nissan", "Lexuss", "Hyundai", "Suzuki", "Datsun", "Holden"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);
let messageArea = document.querySelector(".message");
// manage hints
document.querySelector(".hint span").innerHTML = numberOfHints
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);


function generateInput() {
    const inputContainer = document.querySelector(".input");
    //create maintry Div
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try  ${i}   </span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");
        //create input 
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputContainer.appendChild(tryDiv);
    }
    inputContainer.children[0].children[1].focus();
    //Dsiable All Input Except First One
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    //convert Input TO Uppercase 
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = input.value.toUpperCase();
            // console.log(index); 
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus()

        });
        //تعريف الزر يمين ويسار 
        input.addEventListener("keydown", function (event) {
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(event.target); //or this
            //console.log(currentIndex);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();

            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();

            }

        });



    });


};
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
    let successGuess = true;
    // console.log(wordToGuess)
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actuallLetter = wordToGuess[i - 1];//الحرف الحقيقي 
        //game logic
        if (letter === actuallLetter) {
            //letter is Correct in place
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            //letter is Correct AND NOT in place
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;

        }
    }
    //check if user win or lose
    if (successGuess) {
        // console.log("you win");
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span`;
        if (numberOfHints === 2) {
            messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;

        }
        //ADD Disabid class On All Try Div
        let allTries = document.querySelectorAll(".input > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        //disable guess button
        guessButton.disabled = true;



    } else {
        // console.log("you lose");
        // console.log("you lose");
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry}  input`)
        nextTryInputs.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            //disable guess button
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Woed Is <span>${wordToGuess}</span>`

        }


    }

}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints == 0) {
        getHintButton.disabled = true;

    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }




    }
}


function handleBackspace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}

document.addEventListener("keydown", handleBackspace); // تم تصحيح هنا إلى "keydown"




window.onload = function () {
    generateInput();
}

