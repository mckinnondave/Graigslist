$(document).ready(function () {
  // to protect against cross site scripting attaks, used in the createTweetElement below
  const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Prevent page refresh on submit of tweet form
  // Check if new tweet form is empty or over character limit
  $("#message-form").on("submit", function (event) {
    event.preventDefault();
    const messageData = $("#message-text").val();
    const data = $("#message-form").serialize();
    $.post("/messages/:id", data).then(() => {
      window.location.pathname = "/messages/";
    });
    // }
  });
  // submit a message when enter is clicked
  $("#message-text").keypress(function (e) {
    if (e.which === 13) {
      $("#message-form").submit();
      return false;
    }
    $.post("/messages/:id", data).then(() => {
      window.location.pathname = "/messages/";
    });
  });
});
