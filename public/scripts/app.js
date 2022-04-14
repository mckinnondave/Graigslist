// const res = require("express/lib/response");

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

const sortProductsPriceAscending = function () {
  const gridItems = $(".product-container");

  gridItems.sort(function (a, b) {
    return (
      $(".prod-price", a).data("price") - $(".prod-price", b).data("price")
    );
  });

  $(".feature-container").append(gridItems);
};

const sortProductsPriceDescending = function () {
  const gridItems = $(".product-container");

  gridItems.sort(function (a, b) {
    return (
      $(".prod-price", b).data("price") - $(".prod-price", a).data("price")
    );
  });

  $(".feature-container").append(gridItems);
};

$(document).ready(function () {
  // $(".post-listing-box").hide();

  $("#post-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/listings/create",
      data: $(this).serialize(),
    })
      .then((data) => {
        $(".feature-container").prepend(createNewListing(data[0]));
      })
      .catch((e) => {
        console.log(e);
      });
  });

  $(".fa-trash-can").click(function (event) {
    event.preventDefault();
    const dataId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: `/listings/delete`,
      data: { dataId },
    })
      .then(() => {
        $(`#product-${dataId}`).remove();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  //
  $(".fa-circle-check").click(function (event) {
    event.preventDefault();
    const dataId2 = $(this).attr("data-id2");
    $.ajax({
      method: "POST",
      url: "/listings/sold",
      data: { dataId2 },
    }).then(() => {
      const val = $(`#product-${dataId2} .prod-price`)
        .text("Sold!")
        .addClass("prod-price-sold");
      console.log(val);
    });
  });

  $(".btn-new-listing").click(function () {
  //   $(".post-listing-box").slideToggle("slow");
    window.location.href = "/user";
  });

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const searchData = $("#search-text").val();
    const cleanSearchData = searchData.replace(/[^A-Z0-9]+/gi, "+");

    //attach query string to search url
    let url = "/search?name=";
    url += cleanSearchData;

    //do the get api call
    $.get(url).then((response) => {
      // once search is returned, do something
      const baseUrl = window.location.origin;
      //could use this if we add price filter $.param({"name": "foo"})
      window.location.replace(baseUrl + "/search?name=" + cleanSearchData);
      // res.redirect("/user");
    });
  });

  //   $(".price-high").on("click", function (event) {
  //     event.preventDefault();
  //     let url = "price_desc=true";
  //     //do the get api call
  //     $.get(url).then((response) => {
  //       // once sort order is returned, do something
  //       const baseUrl = window.location.origin;
  //       //could use this if we add price filter $.param({"name": "foo"})
  //       window.location.replace(baseUrl + "&" + url);
  //       // res.redirect("/user");
  //     });
  //   });
  // });

  $("select.dropdown").on("change", function () {
    const sortingMethod = $(this).val();
    if (sortingMethod === "l2h") {
      sortProductsPriceAscending();
    } else if (sortingMethod === "h2l") {
      sortProductsPriceDescending();
    }
  });
});
