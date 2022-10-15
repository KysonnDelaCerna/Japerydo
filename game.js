const categoryClasses = 'text-white font-bold text-3xl text-center break-word bg-blue-800 h-32 w-52 flex justify-center items-center border-black border-4 border-b-8 shrink-0';
const questionClasses = 'text-amber-400 font-bold text-3xl text-center break-word bg-blue-800 h-32 w-52 flex justify-center items-center border-black border-4 shrink-0';
const rowClasses = 'flex flex-row justify-center'
const imageClasses = 'object-contain h-96 w-96 mt-8';

const containerSection = document.getElementById('container');
const categoriesSection = document.getElementById('categories');
const questionsSection = document.getElementById('questions');
const boardSection = document.getElementById('board');
const promptSection = document.getElementById('prompt');
const hintSection = document.getElementById('hint');
const answerSection = document.getElementById('answer');
const buttonsSection = document.getElementById('buttons');
const choicesButton = document.getElementById('choicesButton');
const answerButton = document.getElementById('answerButton');

let questions;

function init() {
    fetch('./questions.json')
        .then((response) => response.json())
        .then((json) => {
            questions = json;

            let numCategories = json.length;
            let maxQuestions = 0;

            for (let i = 0; i < numCategories; i++) {
                if (json[i].questions.length > maxQuestions) {
                    maxQuestions = json[i].questions.length;
                }
            }

            boardSection.style.width = `${numCategories * 208}px`;
            boardSection.style.height = `${(maxQuestions + 1) * 128}px`;
            containerSection.style.width = `${numCategories * 208 + 2 * 64}px`;
            containerSection.style.height = `${(maxQuestions + 1) * 128 + 2 * 64}px`;

            const categoriesRow = document.createElement('div');
            categoriesRow.className = rowClasses;
            categoriesSection.appendChild(categoriesRow);

            for (let i = 0; i < numCategories; i++) {
                const div = document.createElement('div');

                div.className = categoryClasses;
                div.innerText = json[i].category;

                categoriesRow.appendChild(div);
            }

            for (let i = 0; i < maxQuestions; i++) {
                const questionsRow = document.createElement('div');
                questionsRow.className = rowClasses;
                questionsSection.appendChild(questionsRow);

                for (let j = 0; j < numCategories; j++) {
                    const div = document.createElement('div');

                    div.className = questionClasses;

                    if (json[j].questions.length > i) {
                        div.innerText = json[j].questions[i].points;
                        div.addEventListener('click', (e) => choose(j, i, e));
                    }

                    questionsRow.appendChild(div);
                }
            }
        });
}

function choose(category, question, e) {
    promptSection.innerHTML = "";
    promptSection.innerText = questions[category].questions[question].prompt;

    if (questions[category].questions[question].image) {
        const img = document.createElement('img');
        img.src = questions[category].questions[question].image;
        img.classList = imageClasses;
        promptSection.appendChild(img);
    }

    answerSection.innerText = questions[category].questions[question].answer;

    hintSection.innerHTML = "";
    if (questions[category].questions[question].choices) {
        for (let i = 0; i < questions[category].questions[question].choices.length; i++) {
            const div = document.createElement('div');

            div.innerText = questions[category].questions[question].choices[i];

            hintSection.appendChild(div);
        }

        choicesButton.classList.remove('hidden');
    } else {
        choicesButton.classList.add('hidden');
    }

    boardSection.classList.add('hidden');
    answerSection.classList.add('hidden');
    hintSection.classList.add('hidden');
    promptSection.classList.remove('hidden');
    buttonsSection.classList.remove('hidden');
    
    e.target.innerText = "";

    const oldElement = e.target;
    const newElement = e.target.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
}

function back() {
    boardSection.classList.remove('hidden');
    answerSection.classList.add('hidden');
    hintSection.classList.add('hidden');
    promptSection.classList.add('hidden');
    buttonsSection.classList.add('hidden');

    choicesButton.classList.remove('hidden');
    answerButton.classList.remove('hidden');
}

function choices() {
    boardSection.classList.add('hidden');
    answerSection.classList.add('hidden');
    hintSection.classList.remove('hidden');
    promptSection.classList.add('hidden');
    buttonsSection.classList.remove('hidden');

    choicesButton.classList.add('hidden');
}

function answer() {
    boardSection.classList.add('hidden');
    answerSection.classList.remove('hidden');
    hintSection.classList.add('hidden');
    promptSection.classList.add('hidden');
    buttonsSection.classList.remove('hidden');

    choicesButton.classList.add('hidden');
    answerButton.classList.add('hidden');
}

init();