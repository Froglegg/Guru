// Get references to page elements
var $responseBody = $("#response-body");
var $questionId = $("#question-id").attr("data-id");
var $submitBtn = $("#submit");
var $responsesList = $("#responses-list");
let currentEmployee = $("#currentEmployee").text();

// The API object contains methods for each kind of request we'll make
var API = {
    saveresponse: function(newresponse) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/questions/api/response",
            data: JSON.stringify(newresponse)
        });
    },
    getResponses: function(id) {
        return $.ajax({
            url: "/questions/api/response/" + id,
            type: "GET"
        });
    },
    deleteResponse: function(id) {
        return $.ajax({
            url: "/questions/api/response/" + id,
            type: "DELETE"
        });
    }
  
};


var refreshResponses = function() {
    // API.getResponses($questionId).then(function(data) {
    //     console.log(data);
    //     var $response = data.map(function(response) {
    //         var $div = $("<div>")
    //             .attr({
    //                 style: "background-color: #CF5E01",
    //                 class: "card-header d-flex w-100 justify-content-between"
    //             })
    //             .html("<h5 class='mb-1'>John Smith</h4><small>3 days ago</small>");

    //         var $p = $("<p>")
    //             .addClass("mb-1 card-body")
    //             .html(response.body);

    //         $p.append($div);

    //         return $p;
    //     });

    //     $responsesList.empty();
    //     $responsesList.prepend($response);
    // });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
    event.preventDefault();

    var newresponse = {
        employeeName: currentEmployee,
        body: $responseBody.val().trim(),
        questionId: $questionId
    };

    if (!newresponse.body) {
        alert("You must complete the entire form!");
        return;
    }
    console.log(newresponse);
    API.saveresponse(newresponse).then(function() {
        refreshResponses();
    });
    $responseBody.val("");
    location.reload();
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteResponse(idToDelete).then(function() {
        refreshResponses();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$responsesList.on("click", ".delete", handleDeleteBtnClick);

let localUserId = localStorage.getItem("userId");
$("#goBackButton").attr("href", `/homepage${localUserId}`);
$("#questionIcon").attr("onClick", `javascript:window.location.href='/homepage${localUserId}'`);
