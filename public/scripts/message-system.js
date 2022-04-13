/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

// const getAllMessagesForConvo = module.imports;

$(document).ready(function () {
  //to protect against cross site scripting attaks, used in the createTweetElement below
  // const escapeFunc = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };

  // Used as a template to create a new message via AJAX
  const createMessageElement = function (data) {
    // console.log("DATAsdfsadfs", data);
    // const safeText = escapeFunc(data.content.text);
    const $messageHTML = $(`
      <article class="message from-me">
        <div class="message-content">${data.body}</div>
      </article>
    `);
    return $messageHTML;
  };

  const renderMessages = function (data) {
    // console.log("DATA", data.results);
    for (const message of data.results) {
      $("div.messages").append(createMessageElement(message));
    }
  };
  // const messagesData = getAllMessagesForConvo(object, db); //used to return JSON data in tweeter... Make sure this is a JSON object passed through to load messages.

  // const messageData = $.ajax();

  const loadMessages = function () {
    $.ajax("/messages/list", { method: "GET" }).then((messagesData) => {
      // console.log("Success: ", morePostsHtml);
      console.log("messageData", messagesData);
      $(".messages").append(renderMessages(messagesData));
    });
  };

  // Prevent page refresh on submit of tweet form
  // Check if new tweet form is empty or over character limit
  // Display errors if true, hide when valid input is submitted
  $("#message-form").on("submit", function (event) {
    // console.log("HELLO THERE");
    event.preventDefault();
    const messageData = $("#message-text").val();
    // console.log("MESSAGE DATA", messageData);
    // if (messageData === "" || messageData === null) {
    //   $("#message-errors")
    //     .html("Your message is empty, please add some text!")
    //     .slideDown("slow")
    //     .css("display", "block");
    // } else if (messageData.length > 140) {
    //   return $("#message-errors")
    //     .html("Message is too long, please use a maximum of 140 characters.")
    //     .slideDown("slow")
    //     .css("display", "block");
    // } else {
    //   $("#message-errors").slideUp("slow");
    // }

    // On form submission serialize the data and send it to /tweets
    // Then empty the tweet list and reload the tweets in reverse chronological order
    // Reset the form and focus the curser back in there
    const data = $("#message-form").serialize();
    // console.log("HELLO THERE", $("#message-form").serialize());
    // console.log("data", data);
    $.post("/messages/", data).then(() => {
      $("#message-list").empty();
      loadMessages();
      $("#message-form").trigger("reset");
      $("#message-text").focus();
    });
  });
  // Load all the tweets after the document has loaded
  loadMessages();
});
