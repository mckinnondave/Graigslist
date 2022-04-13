$(document).ready(function () {
  $(".post-listing-box").hide();

  $(".btn-new-listing").click(function () {
    $(".post-listing-box").slideToggle("slow");
  });

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const searchData = $("#search-text").val();
    console.log("searchData", searchData);
    const cleanSearchData = searchData.replace(/[^A-Z0-9]+/gi, "+");
    console.log("cleanSearchData", cleanSearchData);

    //attach query string to search url
    //do the get api call
    let url = "/search?name=";
    url += cleanSearchData;
    // "/search?term=red+bike"
    $.get(url).then((response) => {
      // once search is returned, do something
      const baseUrl = window.location.origin;
      window.location.replace(baseUrl + "/search?name=" + cleanSearchData);
      // res.redirect("/user");
    });
  });

  $(".fa-trash-can").click(function() {
    event.preventDefault();

  })

});
