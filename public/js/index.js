// Get references to page elements
var $questionSubject = $("#question-subject");
var $questionCategory = $("#question-category");
var $questionBody = $("#question-body");
var $submitBtn = $("#submit");
var $questionsList = $("#questions-list");
let localUserId = localStorage.getItem("userId");
let CurrentEmployeeName = $("#currentUser").text();

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
  // getUserInfo: function(){
  //   return $.ajax({
  //     url: "/api/user_data/",
  //     type: "GET"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshQuestions = function() {
//   API.getQuestions().then(function(questionData) {

//       var $question = questionData.map(function(question) {

//         // get user data for each question
//         let userId = question.userId;
//         console.log(userId);


//         var $a = $("<a>").attr({
//           href: "/questions/" + question.id,
//           style: "text-decoration: none; color:black",
//           class: "card mb-2",
//           "data-id": question.id
//         });
  
//         var $div = $("<div>")
//           .attr({
//             style: "background-color: #CF5E01",
//             class: "card-header d-flex w-100 justify-content-between"
//           })
//           .html(`<h5 class='mb-1'></h4><small>Asked at: ${question.createdAt}</small>`);
  
//         var $p = $("<p>")
//           .addClass("mb-1 card-body")
//           .html(question.body);
  
//         var $small = $("<small>")
//           .addClass("pl-3")
//           .html("<em>" + question.category + "</em>");
//         $p.append($small);
//         $a.append($div);
//         $a.append($p);
  
//         return $a;
//       });


//       console.log(questionData);


//       $questionsList.empty();
//       $questionsList.prepend($question);

//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list

var handleFormSubmit = function(event) {
  event.preventDefault();
  var newQuestion = {
    employeeName: CurrentEmployeeName,
    subject: $questionSubject.val().trim(),
    body: $questionBody.val().trim(),
    status: "unsolved",
    category: $questionCategory.val(),
    userId: localUserId
  };

  if (!(newQuestion.subject && newQuestion.body && newQuestion.category)) {
    alert("You must complete the entire form!");
    return;
  }

  API.saveQuestion(newQuestion).then(function() {
    // refreshQuestions();
  });
  $questionSubject.val("");
  $questionBody.val("");
  $questionCategory.val("");

location.reload();
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

