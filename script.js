let min = 0;
let max = 100; 
let answerNumber = Math.floor((min + max) / 2);
let attempts = 0;

function guessNumber() {
    attempts++;
    console.log(`Я думаю, что это ${answerNumber}.`);

   
    const userFeedback = prompt("Введите 'больше', 'меньше' или 'верно':");

    if (userFeedback === 'верно') {
        console.log(`Ура! Я угадал Ваше число за ${attempts} попыток.`);
        restartGame();
    } else if (userFeedback === 'больше') {
        min = answerNumber + 1;
    } else if (userFeedback === 'меньше') {
        max = answerNumber - 1;
    } else {
        console.log("Пожалуйста, введите только 'больше', 'меньше' или 'верно'.");
        attempts--; 
    }

    answerNumber = Math.floor((min + max) / 2);
    guessNumber(); 
}

function restartGame() {
    min = parseInt(prompt("Введите минимальное значение:"));
    max = parseInt(prompt("Введите максимальное значение:"));
    attempts = 0; 
    answerNumber = Math.floor((min + max) / 2);
    console.log("Начинаем заново!");
    guessNumber(); 
}


guessNumber();
if (userFeedback === 'меньше') {
    max = answerNumber - 1;
}
let newMin = parseInt(prompt("Введите новое минимальное значение:"));
let newMax = parseInt(prompt("Введите новое максимальное значение:"));
min = newMin;
max = newMax;
attempts = 0;
answerNumber = Math.floor((min + max) / 2);
