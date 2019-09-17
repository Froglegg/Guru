// Get references to page elements
let $employeeText = $("#employee-text");
let $subjectText = $("#subject-text");
let $questionText = $("#question-text");
let $submitBtn = $("#submit");
let $questionList = $("#question-list");

// regex validate helper function, no empty strings 
function validate(element) {
    let regex = /^(?!\s*$)[a-zA-Z.+\s'-]+$/;
    if (regex.test(element)) {
        return true;
    } else {
        return false;
    }
}


// The API object contains methods for each kind of request we'll make
let API = {
    postQuestion: function(question) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/questions",
            data: JSON.stringify(question)
        });
    },
    getQuestions: function() {
        return $.ajax({
            url: "api/questions",
            type: "GET"
        });
    },
    deleteQuestion: function(id) {
        return $.ajax({
            url: "api/questions/" + id,
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

    return $li;
});

$questionList.empty();
$questionList.append($questions);
});
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
let handleFormSubmit = function(event) {
    event.preventDefault();

    var newQuestion = {
        employeeName: $("#employee-text").val().trim(),
        subject: $("#subject-text").val().trim(),
        body: $("#question-text").val().trim()
    };

    // eventually, validate input here with same rules as validation in the DB. If true, then send ajax post, if false, then throw up an alert
    Object.keys(newQuestion).forEach(element =>
        console.log(validate(newQuestion[element]))
    );

    if (!(newQuestion.subject && newQuestion.body && newQuestion.employeeName)) {
        alert("You must enter subject and body and employee name!");
        return;
    }

    // make the post!
    API.postQuestion(newQuestion).then(function() {
        refreshQuestions();
    });

    // clear the form fields in the view!
    $employeeText.val("");
    $subjectText.val("");
    $questionText.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteQuestion(idToDelete).then(function() {
        refreshQuestions();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$questionList.on("click", ".delete", handleDeleteBtnClick);