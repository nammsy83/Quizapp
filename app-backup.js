(function() {
var quizContainer = document.getElementById('quiz-wrap');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var currentSlide = 0;
 

function loadQuestions(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.myjson.com/bins/x5vfs', true);
	xhr.onload = function(){
		if(this.status == 200){
			var quiz = this.responseText;
			var quizData = JSON.parse(quiz);
			buildQuiz(quizData);
			showSlide(0);
		}
	}
	xhr.send();
}

window.onload =  function(){
	loadQuestions();
}

function buildQuiz(quizData){
	var output = [];
	var ans_array = [];
	quizData.results.forEach(function(question, index){
			      // and for each available answer...
			      for (var value in question.incorrect_answers) {  
			        // ...add an HTML radio button
			        ans_array.push(
			        	`<label>
			        	<input type="radio" name="question${index}" value="${value}">
			        	
			        	${question.incorrect_answers[value]}
			        	</label>`
			        	);
			        console.log(ans_array);

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

previousButton.addEventListener('click', showPrevious);
nextButton.addEventListener('click', showNext);

})();









