let minValue = 0;
let maxValue = 100;
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Функция для получения текстового представления числа
function getNumberText(number) {
    if (number === 0) return 'ноль';
    
    let result = '';
    if (number < 0) {
        result = 'минус ';
        number = Math.abs(number);
    }

    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    if (number >= 100) {
        result += hundreds[Math.floor(number / 100)] + ' ';
        number %= 100;
    }

    if (number >= 20) {
        result += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
    } else if (number >= 10) {
        result += teens[number - 10] + ' ';
        number = 0;
    }

    if (number > 0) {
        result += units[number] + ' ';
    }

    return result.trim();
}

// Функция для получения случайной фразы
function getRandomPhrase() {
    const phrases = [
        'Вы загадали число',
        'Может быть это число',
        'Я думаю это число',
        'Возможно это число'
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// Функция для обновления интерфейса
function updateInterface() {
    orderNumberField.innerText = orderNumber;
    const randomPhrase = getRandomPhrase();
    answerField.innerText = `${randomPhrase} ${getNumberText(answerNumber)}?`;
}

// Инициализация игры
function initGame() {
    minValue = parseInt(prompt('Введите минимальное число диапазона (например: 1)', '1'));
    maxValue = parseInt(prompt('Введите максимальное число диапазона (например: 100)', '100'));
    
    if (isNaN(minValue) || isNaN(maxValue)) {
        alert('Пожалуйста, введите числа!');
        initGame();
        return;
    }
    
    if (minValue >= maxValue) {
        alert('Максимальное число должно быть больше минимального!');
        initGame();
        return;
    }
    
    alert(`Отлично! Загадайте любое целое число от ${minValue} до ${maxValue}, а я попробую его угадать.`);
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    updateInterface();
}

// Обработчик кнопки "Меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                (phraseRandom === 1) ? `Я сдаюсь..\n\u{1F92F}` :
                `Похоже, вы запутались в своих ответах\n\u{1F928}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            if (maxValue < minValue) {
                answerField.innerText = `Вы загадали неправильное число!\n\u{1F914}`;
                gameRun = false;
                return;
            }
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            updateInterface();
        }
    }
});

// Обработчик кнопки "Больше"
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                (phraseRandom === 1) ? `Я сдаюсь..\n\u{1F92F}` :
                `Похоже, вы запутались в своих ответах\n\u{1F928}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            if (minValue > maxValue) {
                answerField.innerText = `Вы загадали неправильное число!\n\u{1F914}`;
                gameRun = false;
                return;
            }
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            updateInterface();
        }
    }
});

// Обработчик кнопки "Верно"
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random() * 2);
        const answerPhrase = (phraseRandom === 0) ?
            `Я всегда угадываю\n\u{1F60E}` :
            (phraseRandom === 1) ? `Ура! Я победил!\n\u{1F973}` :
            `Это было легко!\n\u{1F60C}`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
});

// Обработчик кнопки "Заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    initGame();
});

// Начальная инициализация
initGame();

