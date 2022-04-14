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

  const loadMessages = function () {
    $(".conversation:first-child").trigger("click");
    // $.ajax("/messages/list", { method: "GET" }).then((messagesData) => {
    //   $(".messages").prepend(renderMessages(messagesData));
    // });
  };

  // Prevent page refresh on submit of tweet form
  // Check if new tweet form is empty or over character limit
  // Display errors if true, hide when valid input is submitted
  // console.log("USEROBJS", userObj[0].userId);
  $("#message-form").on("submit", function (event) {
    if (window.location.pathname === `/messages`) {
      event.preventDefault();
    }
    const messageData = $("#message-text").val();
    const data = $("#message-form").serialize();

    // SO CLOSE HERE>
    if (window.location.pathname === `/messages`) {
      $.post("/messages/", data).then(() => {
        $("#message-list").empty();
        newFunction($(".conversation.selected"));
        $("#message-form").trigger("reset");
        $("#message-text").focus();
      });
    } else {
      $.post("/listings/:id", data).then(() => {
        // console.log("FANCY STUFF", makeAnOfferPush(data, db));
        // makeAnOfferPush(data, db);
        // window.location.pathname = "/messages/";
      });
    }
  });
  // } else {
  //   // sdfsdf
  // }

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
