function applyFilter() {
  var selectedLabel = document.getElementById("filterLabel").value;
  var issues = document.querySelectorAll("#issues ul li");

  issues.forEach(function(issue) {
      var labelSpan = issue.querySelector("#label0");
      if (selectedLabel === "" || labelSpan.textContent === selectedLabel) {
          issue.style.display = "block";
      } else {
          issue.style.display = "none";
      }
  });
}

function resetFilter() {
  var issues = document.querySelectorAll("#issues ul li");
  issues.forEach(function(issue) {
      issue.style.display = "block";
  });
}



function searchIssues() {
  var searchInput = document.getElementById("search").value.toLowerCase();
  var selectedLabel = document.getElementById("filterLabel").value;
  var issues = document.querySelectorAll(".issue");

  issues.forEach(function(issue) {
      var issueTitle = issue.querySelector(".title").textContent.toLowerCase();
      var issueLabel = issue.getAttribute("data-label");

      if ((issueTitle.includes(searchInput) || issueLabel.includes(searchInput)) && (selectedLabel === "" || issueLabel === selectedLabel)) {
          issue.style.display[0] = "block";
      } else {
          issue.style.display = "none";
      }
  });
}

var searchInput = document.getElementById("search");
searchInput.addEventListener("input", searchIssues);