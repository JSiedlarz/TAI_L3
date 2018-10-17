const isStorage = 'undefined' !== typeof localStorage;
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};



function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Pytanie " + currentQuestionNumber + " z " + quiz.questions.length;

};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Twój wynik to: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Który z nich nie jest językiem programowania obiektowego?", ["Java", "C#","C++", "C"], "C"),
    new Question("Jaki język jest używany do stylizowania stron internetowych?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Istnieją ____ główne elementy programowania obiektowego.", ["1", "6","2", "4"], "4"),
    new Question("Który język jest używany w aplikacjach internetowych?", ["PHP", "Python", "Javascript", "Każdy"], "Każdy"),
    new Question("MVC to ____.", ["Language", "Library", "Framework", "Każdy"], "Framework")
  /*  new Question("Język C to język:", ["Stukturalny", "Obiektowy", "Funkcyjny", "Logiczny"], "Strukturalny")
    new Question("Char to typ danych:", ["Znakowy", "Całkowity", "Logiczny", "Zmiennoprzecinkowy"], "Znakowy")
    new Question("Typ danych całkowity to:", ["float", "int", "double", "char"], "int")
    new Question("Zmienna typu bool może przyjąć wartości:", ["2-1000", "985U 30000U", "3 67 -567", "false true"], "false true")
    new Question("Identyfikator to inaczej:", ["wskaźnik", "zmienna", "nazwa", "operator"], "nazwa")*/
];

// create quiz
var quiz = new Quiz(questions);
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


// display quiz
populate();