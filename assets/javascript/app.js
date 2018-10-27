$(document).ready(function() {
  class Q {
    constructor(
      question = "A question goes here",
      a1 = "Answer 1 goes here",
      a2 = "Answer 2 goes here",
      a3 = "Answer 3 goes here",
      a4 = "Answer 4 goes here",
      correct = 2
    ) {
      this.quest = question;
      this.answer1 = a1;
      this.answer2 = a2;
      this.answer3 = a3;
      this.answer4 = a4;
      this.right = this["answer" + String(correct)];
    }
    addToSet(qSet) {
      qSet.questions.push(this);
    }
  }
  let questionSet = {
    questions: [],
    dispQuestion() {
      if (this.questions.length != 0) {
        let qChoice = Math.floor(Math.random() * this.questions.length);
        this.currentQ = this.questions[qChoice];
        this.currentQspot = qChoice;

        $("#dispQ").html(this.questions[qChoice].quest);
        $("#aOne").html(this.questions[qChoice].answer1);
        $("#aTwo").html(this.questions[qChoice].answer2);
        $("#aThree").html(this.questions[qChoice].answer3);
        $("#aFour").html(this.questions[qChoice].answer4);
      }
    },
    currentQ: null,
    currentQspot: null
  };
  function makeQuestions1(questionSet) {
    new Q(
      "In what state can you find the Ozark Mountains?",
      "Texas",
      "Montana",
      "New York",
      "Missouri",
      4
    ).addToSet(questionSet);
    new Q(
      "In what year did the New York Giants win their 3rd Super Bowl?",
      "1993",
      "2008",
      "2012",
      "1991",
      2
    ).addToSet(questionSet);
    new Q(
      "What’s the most malleable metal?",
      "Gold",
      "Silver",
      "Mercury",
      "Lead",
      1
    ).addToSet(questionSet);
    new Q(
      "Which planet spins the slowest?",
      "Earth",
      "Mars",
      "Venus",
      "Jupiter",
      3
    ).addToSet(questionSet);
    new Q(
      "What was the first organ successfully transplanted from a cadaver to a live person?",
      "Liver",
      "Kidney",
      "Pancreas",
      "Galbladder",
      2
    ).addToSet(questionSet);
    new Q(
      "What was the first bird domesticated by man?",
      "Goose",
      "Chicken",
      "Turkey",
      "Parakeet",
      1
    ).addToSet(questionSet);
    new Q(
      "What was the first commercially manufactured breakfast cereal?",
      "Corn Flakes",
      "Special K",
      "Wholly Oats",
      "Shredded Wheat",
      4
    ).addToSet(questionSet);
    new Q(
      "Where did the pineapple plant originate?",
      "Hawaii",
      "Caribbean Islands",
      "West Africa",
      "South America",
      4
    ).addToSet(questionSet);
    new Q(
      "How many U.S. states border the Gulf of Mexico?",
      "Three",
      "Four",
      "Five",
      "Six",
      3
    ).addToSet(questionSet);
    new Q(
      "In which country would you would find the Cresta Run?",
      "Switzerland",
      "Germany",
      "Croatia",
      "Czech Republic",
      1
    ).addToSet(questionSet);
    new Q(
      "In what year was the statue of liberty dedicated to the U.S?",
      "1886",
      "1912",
      "1845",
      "1801",
      1
    ).addToSet(questionSet);
    new Q(
        "What is the world's largest lake?",
        "Meditteranean Sea",
        "Lake Superior",
        "Caspian Sea",
        "Black Sea",
        3
      ).addToSet(questionSet);
      new Q(
        "How many member countries are there in the United Nations?",
        "182",
        "193",
        "202",
        "214",
        2
      ).addToSet(questionSet);
      new Q(
        "May Queen, Wisley Crab, Foxwhelps and Lane’s Prince Albert are all types of what?",
        "Apples",
        "Naval vessels",
        "Skateboard tricks",
        "Diets",
        1
      ).addToSet(questionSet);
      new Q(
        "Where can you find the Carpathians?",
        "Sundays at 9pm on E!",
        "Scandinavia",
        "Romania",
        "France",
        3
      ).addToSet(questionSet);
      new Q(
        "In what body of water is the Mariana Trench located?",
        "Bay of Bengal",
        "Siberian Sea",
        "Gulf of Jakarta",
        "Philippene Sea",
        3
      ).addToSet(questionSet);
  }

  /////// Important global variables
  let set_q_time = 20;
  let waitTime = 2;
  let qTime = set_q_time;

  let aCorrect = 0;
  let aWrong = 0;
  let intervalId;
  startGame();
  /////////
  ///////// Game Functions
  function startGame() {
    makeQuestions1(questionSet);
    qTime = set_q_time;
    aCorrect = 0;
    aWrong = 0;
    $(".askQ").attr("style", "display:none");
    $(".startButton").attr("style", "display:flex");
  }
  function decrementQ() {
    qTime--;
    $("#dispTime").html("You have " + qTime + " seconds remaining");
    if (qTime <= 0) {
      qTime = waitTime;
      aWrong++;
      questionSet.questions.splice(questionSet.currentQspot, 1);

      clearInterval(intervalId);
      $("#dispTime").html("You have run out of time :(");
      $(".showA").attr("style", "display:none");
      $(".askQ").attr("style", "display:none");
      intervalId = setInterval(decrementFew, 1000);
    }
  } ///^^^ decrements interval during a question
  function decrementFew() {
    qTime--;
    if (qTime <= 0) {
      if (questionSet.questions.length > 0) {
        clearInterval(intervalId);
        $(".showA").attr("style", "display:flex");
        $(".askQ").attr("style", "display:flex");
        qTime = set_q_time;
        intervalId = setInterval(decrementQ, 1000);
        $("#dispTime").html("You have " + qTime + " seconds remaining");

        questionSet.dispQuestion();
      } else {
        caseGO();
      }
    }
  } ///^^^ decrements interval in between questions
  function caseGO() {
    clearInterval(intervalId);

    $("#dispTime").html("GAME OVER!");
    $(".startButton").html("RETRY");
    $(".showA").attr("style", "display:flex");
    $(".a_list").attr("style", "display:none");

    $(".results").attr("style", "display:flex");
    $(".correct").html("Correct: " + aCorrect);
    $(".incorrect").html("Incorrect: " + aWrong);
    startGame();
  } ///^^^ if no more questions, end game, display results, give option to restart
  function caseWrong() {
    qTime = waitTime;
    clearInterval(intervalId);
    $("#dispTime").html("WRONG");
    $(".showA").attr("style", "display:none");
    $("#dispQ").html("The right answer was: " + questionSet.currentQ.right);

    intervalId = setInterval(decrementFew, 1000);
  } ///^^^executes when guessed answer is not the right answer
  function caseRight() {
    qTime = waitTime;
    clearInterval(intervalId);
    $("#dispTime").html("RIGHT!");
    $(".showA").attr("style", "display:none");
    $(".askQ").attr("style", "display:none");
    intervalId = setInterval(decrementFew, 1000);
  } ///^^^ executes when the guessed answer is the right answer
  ///////////
  $(".startButton").on("click", function(event) {
    $(".results").attr("style", "display:none");
    $(".startButton").attr("style", "display:none");

    $(".a_list").attr("style", "display:block");
    $(".askQ").attr("style", "display:flex");

    questionSet.dispQuestion();
    $("#dispTime").html("You have " + qTime + " seconds remaining");
    intervalId = setInterval(decrementQ, 1000);
    //Start Timer!
  }); ///^^^executes when the start/restart button is clicked

  $(".a_list").on("click", function(event) {
     
      var picked = "";
      switch (event.target.id) {
        case "aOne":
          picked = $("#aOne").html();
          break;
        case "aTwo":
          picked = $("#aTwo").html();
          break;
        case "aThree":
          picked = $("#aThree").html();
          break;
        case "aFour":
          picked = $("#aFour").html();
          break;
        default:
          picked ="again";
          break;
      }

      if (picked === questionSet.currentQ.right) {
        aCorrect++;
        questionSet.questions.splice(questionSet.currentQspot, 1);
        caseRight();
      } else if(picked!="again") {
        aWrong++;
        questionSet.questions.splice(questionSet.currentQspot, 1);

        caseWrong();
      }
    
  }); ///^^^executes when an answer is chosen- checks if it's right
});
