// Element Creator
const createNewListing = function (data) {
  let $userListing = `
  <section class="product-container">
  <div class ="product-image"><img src="${
    data.image_url
  }" class="result-image"></div>
  <div class ="product-bar">
    <div class ="product-name">${data.name}</div>
    <div class="price-logo-box">
      <div class="prod-price">$${parseFloat(data.price_in_cents / 1000).toFixed(
        2
      )}</div>
      <div class="product-icons">
        <i class="fa-solid fa-circle-check" title="Mark as Sold"></i>
        <i class="fa-solid fa-trash-can" title="delete"></i>
      </div>
    </div>
  </div>
  <div class ="product-description">${data.description}</div>
</section>
`;
  return $userListing;
};

$(document).ready(function () {
  $(".post-listing-box").hide();

  $("form").on("submit", function (event) {
    event.preventDefault();
    console.log("111");
    console.log($(this).serialize());
    $.ajax({
      method: "POST",
      url: "/listings/create",
      data: $(this).serialize(),
    })
      .then((data) => {
        console.log("DATA", data);
        $(".feature-container").prepend(createNewListing(data[0]));
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("222");
  });

  $(".fa-trash-can").click(function (event) {
    event.preventDefault();
    const dataId =$(this).attr("data-id")
    $.ajax({
      method: "POST",
      url: `/listings/delete`,
      data: { dataId }
    }).then(() => {
      $(`#product-${dataId}`).remove();
    })
    .catch((e) => {
      console.log(e);
    });
  });

  //
  $(".fa-circle-check").click(function(event) {
    event.preventDefault();
    const dataId2 =$(this).attr("data-id2")
    $.ajax({
      method: "POST",
      url: "/listings/sold",
      data: { dataId2 }
    }).then(() => {
      const val = $(`#product-${ dataId2 } .prod-price`).text("Sold!").addClass("prod-price-sold")
      console.log(val);
    })
  })

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
      //could use this if we add price filter $.param({"name": "foo"})
      window.location.replace(baseUrl + "/search?name=" + cleanSearchData);
      // res.redirect("/user");
    });
  });
});
