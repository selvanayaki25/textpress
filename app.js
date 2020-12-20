const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".options-container");
const answersIndicatorContainer=document.querySelector(".answers-indicator");
const homeBox=document.querySelector(".start");
const quizBox=document.querySelector(".quiz-box");
const result=document.querySelector(".result1-box");
var availableQuestions=[];
var currentQuestion;
var questionCounter=0;
var availableOptions=[];
var correctAnswers=0;
var Attempt=0;
//push the availablequestion into array
function setavailableQuestions()
{
const totalQuestion=quiz.length;
for(var i=0;i<totalQuestion;i++)
{
//console.log(quiz[i])
availableQuestions.push(quiz[i])
}

}
//set question number and question and options
function getNewQuestion()
{
questionNumber.innerHTMl="Question"+(questionCounter+1)+"of"+quiz.length;

const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
//console.log(questionIndex)
currentQuestion=questionIndex;
questionText.innerHTML=currentQuestion.q;
//get the position of 'question index' from the availableQuestions Array
const index1=availableQuestions.indexOf(questionIndex);
//to avoid duplicate  questions
availableQuestions.splice(index1,1);

//get the lenth of the options
const optionLen=currentQuestion.options.length
//push the options into availableoptions Array
//console.log(optionLen)
for(var i=0;i<optionLen;i++)
{
availableOptions.push(i)
}
optionContainer.innerHTML='';
var animationDelay=0.2;

//console.log(availableOptions)
for(var i=0;i<optionLen;i++)
{
//random option
const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
//get the position of optionIndex from the AvailableOptions
const Index2=availableOptions.indexOf(optionIndex);
//remove the duplicate indexes
availableOptions.splice(Index2,1);
//console.log(optionIndex)
const option=document.createElement("div");
option.innerHTML=currentQuestion.options[optionIndex];
option.id=optionIndex;
option.style.animationDelay=animationDelay+'s';
animationDelay=animationDelay+0.2;
option.className="option";
optionContainer.appendChild(option)
option.setAttribute("onclick","getResult(this)");
}
questionCounter++;
}

function getResult(element)
{
const id=parseInt(element.id);
console.log(element.innerHTML)
//console.log(typeof id);

if(id===currentQuestion.answer)
{
//set the green color for correct answer
element.classList.add("correct");
console.log("answer is correct");
//add the indicator to correct mark
updateAnswerIndicator("correct");
correctAnswers++;
//console.log("correct"+correctAnswers)
}
else
{
// set red color for wrong answer
element.classList.add("wrong");

updateAnswerIndicator("wrong");
//if  the answer is wrong ,show the correct answer
const optionlen=optionContainer.children.length;
for(var i=0;i<optionlen;i++)
{
if(parseInt(optionContainer.children[i].id)===currentQuestion.answer)
{
optionContainer.children[i].classList.add("correct");
}
}
Attempt++;
}
}

function answersIndicator()
{
answersIndicatorContainer.innerHTML='';
const totalQuestion=quiz.length;
for(var i=0;i<totalQuestion;i++)
{
const indicator=document.createElement("div");
answersIndicatorContainer.appendChild(indicator);
}
}
function updateAnswerIndicator(markType)
{
//console.log(markType);
answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}
 function next()
{
if(questionCounter===quiz.length)
{
console.log("quiz over");
quizOver();
quizResult();
}
else
{
//timer001();
getNewQuestion();
}
function quizResult()
{
result.querySelector(".total-question").innerHTML=quiz.length;
result.querySelector(".total-attempt").innerHTML=Attempt;
result.querySelector(".total-correct").innerHTML=correctAnswers;
result.querySelector(".total-wrong").innerHTML=quiz.length-correctAnswers;
const percentage=(correctAnswers/quiz.length)*100;
result.querySelector(".percentage").innerHTML=percentage.toFixed()+"%";
result.querySelector(".total-score").innerHTML=correctAnswers+"/"+quiz.length;


}
function resetQuiz()
{
 	questionCounter=0;
	correctAnswers=0;
 	Attempt=0;
}

}
function quizOver()
{
console.log("score");
//hide the quizbox
quizBox.classList.add("hide");
//show the result
console.log("result");
result.classList.remove("hide");
}
function tryAgainQuiz()
{
result.classList.add("hide");
quizBox.classList.remove("hide");
resetQuiz();
start();
}
function goToHome()
{
result.classList.add("hide");

homeBox.classList.remove("hide");
resetQuiz();
}
function start()

{
//hide the homebox
homeBox.classList.add("hide");
//show quizBox

quizBox.classList.remove("hide");
//first we will set all questions in availableQuestions Arrray
setavailableQuestions();
getNewQuestion();
// to indicate the answers in the bottom

answersIndicator();
}
