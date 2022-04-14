/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

// const { load } = require("sass");

// const getAllMessagesForConvo = module.imports;

$(document).ready(function () {
  // to protect against cross site scripting attaks, used in the createTweetElement below
  const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Used as a template to create a new message via AJAX
  const createMessageElement = function (data) {
    const safeText = escapeFunc(data.body);
    // could maybe use a ternary to set whether class is from-me or from-them
    let className = "from-them";
    // if ((senderid = userid)) {
    //   className = "from-me";
    // }

    const $messageHTML = $(`
      <article class="message ${className}">
        <div class="message-content">${safeText}</div>
      </article>
    `);
    return $messageHTML;
  };

  const renderMessages = function (data) {
    for (const message of data.results) {
      $("div.messages").append(createMessageElement(message));
    }
  };

  // const loadMessages = function () {
  // };
  const loadMessages = function () {
    $(".conversation:first-child").trigger("click");
    // $.ajax("/messages/list", { method: "GET" }).then((messagesData) => {
    //   $(".messages").prepend(renderMessages(messagesData));
    // });
  };

  // Prevent page refresh on submit of tweet form
  // Check if new tweet form is empty or over character limit
  // Display errors if true, hide when valid input is submitted
  $("#message-form").on("submit", function (event) {
    event.preventDefault();
    const messageData = $("#message-text").val();
    if (messageData === "" || messageData === null) {
      $("#message-errors")
        .html("Your message is empty, please add some text!")
        .slideDown("slow")
        .css("display", "block");
    } else {
      $("#message-errors").slideUp("slow");
    }

    // On form submission serialize the data and send it to /messages
    // Then empty the message list and reload the messages in reverse chronological order
    // Reset the form and focus the curser back in there
    const data = $("#message-form").serialize();
    $.post("/messages/", data).then(() => {
      $("#message-list").empty();
      newFunction($(".conversation.selected"));
      $("#message-form").trigger("reset");
      $("#message-text").focus();
    });
  });
  // $("#message-form").on("click", function (event) {});

  const newFunction = (element) => {
    const thisId = $(element).attr("id");
    $(".conversation").removeClass("selected");
    $(element).addClass("selected");
    // alert($(this).attr("id"));
    $.ajax(`/messages/convo/${thisId}`, { method: "GET" }).then(
      (messagesData) => {
        $("#message-list");
        $("div.messages .message").remove();
        renderMessages(messagesData);
      }
    );
  };

  $(".conversation").click(function () {
    newFunction(this);
    //set the value of convo id and reciever id
    $('input[name="conversation_id"]').val($(this).attr("id"));
    $('input[name="receiver_id"]').val($(this).attr("data-receiver-id"));
  });

  loadMessages();
});
