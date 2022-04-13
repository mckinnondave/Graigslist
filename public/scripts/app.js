// Element Creator
const createNewListing = function(data) {
  let $userListing = `
<section class="product-container">
  <div class ="product-image"><img src="${data.image_url}"></div>
  <div class ="product-bar">
    <div class ="product-name">${data.name}</div>
    <div class="price-logo-box">
      <div class="prod-price">${data.price_in_cents}</div>
      <div class="product-icons">
        <i class="fa-solid fa-pen-to-square" title="Mark as Sold"></i>
        <i class="fa-solid fa-trash-can" title="delete"></i>
      </div>
    </div>
  </div>
  <div class ="product-description">${data.description}</div>
</section>
`
  return $userListing;
}

$(document).ready(function () {
  $(".post-listing-box").hide();

  $("form").on("submit", function (event) {
    event.preventDefault();
    console.log("111")
    console.log($(this).serialize())
    $.ajax( {
      method: 'POST',
      url: "/listings/create",
      data: $(this).serialize(),
    })
    .then((data) => {
      console.log("data", data.rows[0])
      $(".feature-container").prepend(createNewListing(data.rows[0]));
    })
    .catch((e) => {
      console.log(e);
    });
    console.log("222")
  });

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
});

