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
  function makeQuestions(questionSet) {
    new Q(
      "Where do babies come from?",
      "The Ground",
      "The Stork",
      "Yo Mama",
      "Hopefully not me",
      3
    ).addToSet(questionSet);

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

  }
  let questionSet = {
    questions: [],
    dispQuestion() {
      if (this.questions.length != 0) {
        let qChoice = Math.floor(Math.random() * this.questions.length);
        this.currentQ = this.questions[qChoice];

        $("#dispQ").html(this.questions[qChoice].quest);
        $("#aOne").html(this.questions[qChoice].answer1);
        $("#aTwo").html(this.questions[qChoice].answer2);
        $("#aThree").html(this.questions[qChoice].answer3);
        $("#aFour").html(this.questions[qChoice].answer4);
      }
    },
    currentQ: null
  };
  

  function startGame(){
    makeQuestions(questionSet);

  }
  startGame();



  questionSet.dispQuestion();

  $(".a_list").on("click", function(event) {
    console.log(event);
    var picked = "";
    switch (event.target.id) {
      case "aOne":
        picked = $("#aOne").html();
        console.log(picked);
        break;
      case "aTwo":
        picked = $("#aTwo").html();
        console.log(picked);
        break;
      case "aThree":
        picked = $("#aThree").html();
        console.log(picked);
        break;
      case "aFour":
        picked = $("#aFour").html();
        console.log(picked);
        break;
    }
    if (picked === questionSet.currentQ.right) {
      console.log("CORRECT");
      questionSet.dispQuestion();
    }
    else{

    }
  });
});
