// Get references to page elements
var $questionSubject = $("#question-subject");
var $questionCategory = $("#question-category");
var $questionBody = $("#question-body");
var $submitBtn = $("#submit");
var $questionsList = $("#questions-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveQuestion: function(newQuestion) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/questions",
      data: JSON.stringify(newQuestion)
    });
  },
  getQuestions: function() {
    return $.ajax({
      url: "api/questions",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshQuestions = function() {
  API.getQuestions().then(function(data) {
    console.log(data);
    var $question = data.map(function(question) {
      var $a = $("<a>").attr({
        href: "/questions/" + question.id,
        style: "text-decoration: none; color:black",
        class: "card mb-2",
        "data-id": question.id
      });

      var $div = $("<div>")
        .attr({
          style: "background-color: #CF5E01",
          class: "card-header d-flex w-100 justify-content-between"
        })
        .html("<h5 class='mb-1'>John Smith</h4><small>3 days ago</small>");

      var $p = $("<p>")
        .addClass("mb-1 card-body")
        .html(question.body);

      var $small = $("<small>")
        .addClass("pl-3")
        .html("<em>" + question.category + "</em>");
      $p.append($small);
      $a.append($div);
      $a.append($p);

      return $a;
    });

    $questionsList.empty();
    $questionsList.prepend($question);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newQuestion = {
    subject: $questionSubject.val().trim(),
    body: $questionBody.val().trim(),
    status: "unsolved",
    category: $questionCategory.val()
  };

  if (!(newQuestion.subject && newQuestion.body && newQuestion.category)) {
    alert("You must complete the entire form!");
    return;
  }

  API.saveQuestion(newQuestion).then(function() {
    refreshQuestions();
  });
  $questionSubject.val("");
  $questionBody.val("");
  $questionCategory.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$questionsList.on("click", ".delete", handleDeleteBtnClick);