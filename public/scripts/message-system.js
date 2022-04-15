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
    /*** TO DO Make Messages Switch Sides */
    let className = "from-me";
    // let formReceiverId = $('input[name="receiver_id"]').val();
    // // let senderId = $(".conversation.selected").attr("data-sender-id");
    // let senderId = data.reciver_id;
    // if (formReceiverId === senderId) {
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
  };

  //submit a message when button is clicked
  $("#message-form").on("submit", function (event) {
    event.preventDefault();
    const messageData = $("#message-text").val();
    const data = $("#message-form").serialize();
    $.post("/messages/", data).then(() => {
      $("#message-list").empty();
      newFunction($(".conversation.selected"));
      $("#message-form").trigger("reset");
      $("#message-text").focus();
    });
  });
  // submit a message when enter is clicked
  $("#message-text").keypress(function (e) {
    if (e.which == 13) {
      $("#message-form").submit();
      return false; //<---- prevent default
    }
    $.post("/messages/", data).then(() => {
      $("#message-list").empty();
      newFunction($(".conversation.selected"));
      $("#message-form").trigger("reset");
      $("#message-text").focus();
    });
  });

  const newFunction = (element) => {
    const thisId = $(element).attr("id");
    $(".conversation").removeClass("selected");
    $(element).addClass("selected");
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
    $('input[name="conversation_id"]').val($(this).attr("id"));
    $('input[name="receiver_id"]').val($(this).attr("data-receiver-id"));
  });

  loadMessages();
});
