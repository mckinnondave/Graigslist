$(document).ready(function () {
  $(".fa-heart").on("submit", function (event) {
    event.preventDefault();
    console.log("111")
  })

  // $("form").on("submit", function (event) {
  //   event.preventDefault();
  //   console.log("111")
  //   console.log($(this).serialize())
  //   $.ajax( {
  //     method: 'POST',
  //     url: "/listings/create",
  //     data: $(this).serialize(),
  //   })
  //   .then((data) => {
  //     console.log("DATA", data);
  //     $(".feature-container").prepend(createNewListing(data[0]));
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  //   console.log("222")
  // });

  // $(".btn-new-listing").click(function () {
  //   $(".post-listing-box").slideToggle("slow");
  // });

});
