var quizData = [
  
    {
      question: "What is the name of the machine that fails and essentially dooms mankind in the beginning of the first Half-Life game?",
     
      incorrect_answers: {
        a: "Oscillation generator",
        b: "Dark fusion reactor",
        c: "Anti-mass spectrometer"
      },
       correct_answer: "c"
      
    },
    {
      question: "Which souls game was not directed by Hidetaka Miyazaki?",
      incorrect_answers: {
        a: "Demon Souls",
        b: "Dark Souls",
        c: "Dark Souls 3",
        d: "Dark Souls 2"
      },
      correct_answer: "d"

    },
    {
      question: "In vanilla Minecraft, which of the following cannot be made into a block?",
      
      incorrect_answers: {
        a: "Coal",
        b: "Wheat",
        c: "String",
        d: "Charcoal"
      },
      correct_answer: "d"
    }
];

var quizContainer = document.getElementById('quiz-wrap');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var currentSlide = 0;
// function loadQuestions(){
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'https://api.myjson.com/bins/x5vfs', true);
// 	xhr.onload = function(){
// 		if(this.status == 200){
// 			var quiz = this.responseText;
// 			var quizData = JSON.parse(quiz);
// 			buildQuiz(quizData);
// 			showSlide(0);		
			

// 		}
// 	}
// 	xhr.send();
// }
// 
buildQuiz();
showSlide(0);
function buildQuiz(){
	var output = [];
	// loop through quiz
	quizData.forEach(function(question, index){
		var ans_array = [];
		//var currentIndex = question.incorrect_answers.length, temporaryValue, randomIndex;
		  // While there remain elements to shuffle...
		//   while (0 !== currentIndex) {
		//     // Pick a remaining element...
		//     randomIndex = Math.floor(Math.random() * currentIndex);
		//     currentIndex -= 1;
		//     // And swap it with the current element.
		//     temporaryValue = question.incorrect_answers[currentIndex];
		//     question.incorrect_answers[currentIndex] = question.incorrect_answers[randomIndex];
		//     question.incorrect_answers[randomIndex] = temporaryValue;
		// }
			      // and for each available answer
			      for (var value in question.incorrect_answers) { 
			        // add an HTML radio button
			        ans_array.push(
			        	`<label>
			        	<input type="radio" name="question${index}" value="${value}">
			        	${question.incorrect_answers[value]}
			        	</label>`
			        	)
			    }
			    	// add this question and its answers to the output
			    	output.push(
			    		`<div class="slide mt-5">
			    		<div class="question"> ${question.question} </div>
			    		<div class="answers"> ${ans_array.join("")} </div>
			    		</div>`
			    		);
			    });
	quizContainer.innerHTML = output.join("");
}
function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    quizData.forEach((question, index) => {
      // find selected answer
      const answerContainer = answerContainers[index];
      const selector = `input[name=question${index}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
 
      // if answer is correct
      if (userAnswer === question.correct_answer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[index].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[index].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${quizData.length}`;
  }

function showSlide(current) {
	const slides = document.querySelectorAll(".slide");
	slides[currentSlide].classList.remove("active-slide");
	slides[current].classList.add("active-slide");
	currentSlide = current;
	if (currentSlide === 0) {
		previousButton.style.display = "none";
	} else {
		previousButton.style.display = "inline-block";
	}
	if (currentSlide === slides.length - 1) {
		nextButton.style.display = "none";
		submitButton.style.display = "inline-block";
	} else {
		nextButton.style.display = "inline-block";
		submitButton.style.display = "none";
	}
}
function showPrevious(){
	showSlide(currentSlide - 1);
}
function showNext(){
	showSlide(currentSlide + 1);
}
submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPrevious);
nextButton.addEventListener('click', showNext);


