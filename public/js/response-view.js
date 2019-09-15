let url = $("#questionId").text().trim();

console.log(url);
$("#backButton").attr("href", `/questions/${url}`);