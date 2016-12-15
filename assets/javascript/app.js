
var panel = $('#quiz-area');

// Variable that will hold our setInterval that runs the stopwatch
var countStartNumber = 30;

// Click Events (This code will run as soon as the page loads)
$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

//Question set

var questions = [{
  question: "Which of the following Harry Potter movies was the first instalment in the Harry Potter film series?",
  answers: ["Chamber of Secrets", "Goblet of Fire", "The Sorcerer's Stone", "Prisoner of Azkaban"],
  correctAnswer: "The Sorcerer's Stone",
  image: "https://i.jeded.com/i/harry-potter-and-the-sorcerers-stone.30084.jpg"
}, {
	question: "What well-known Star War's villain was voiced by James Earl Jones?",
  answers: ["Count Dooku", "Darth Sidious", "Darth Maul", "Darth Vader"],
  correctAnswer: "Darth Vader",
  image: "http://download.gamezone.com/uploads/image/data/1204957/star-wars-darth-vader-sixth-scale-feature-1000763.jpg"
}, {
	question: "What 1984 comedy film shot actor Eddie Murphy to international stardom for his role as Axel Foley?",
	answers: ["Trading Places", "Beverly Hills Cop", "Showtime", "48 Hrs."],
	correctAnswer: "Beverly Hills Cop",
  image: "https://fanart.tv/fanart/movies/90/movieposter/beverly-hills-cop-522743100f9a1.jpg"
}, {
  question: "Michael Myers is the antagonist of what popular slasher horror film series?",
  answers: ["Halloween", "Friday the 13th", "Scream", "The Texas Chain Saw Massacre"],
  correctAnswer: "Halloween",
  image: "http://static.rogerebert.com/uploads/movie/movie_poster/halloween-1979/large_vjoOFOTBJcJvA1weJejlZ92LZD4.jpg"
}, {
  question: "Directed by Martin Scorsese, what movie features Leonardo DiCaprio as Edward (Teddy) Daniels?",
  answers: ["Catch Me If You Can", "Shutter Island", "Gangs of New York", " The Aviator"],
  correctAnswer: "Shutter Island",
  image: "http://coolspotters.com/files/photos/226495/shutter-island-profile.jpg"
}, {
  question: "Released in 2005, which film stars Angelina Jolie as Jane, who is a paid assassin hired to kill her husband?",
  answers: ["Hell's Kitchen", "Girl, Interrupted", "Taking Lives", "Mr. and Mrs. Smith"],
  correctAnswer: "Mr. and Mrs. Smith",
  image: "https://tribzap2it.files.wordpress.com/2015/06/mr-mrs-smith-poster-new-regency.jpg"
}, {
	question: " Which of the following superhero films was not released in 2016?",
	answers: ["Deadpool", "Ant-Man", "Batman v Superman", "X-Men - Apocalypse"],
	correctAnswer: "Ant-Man",
  image: "https://lumiere-a.akamaihd.net/v1/images/movie_poster_antman_38ce72fc.jpeg?region=0%2C0%2C300%2C450"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      // console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
    panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

