const $bodyStyle = $('.body-style');
let createdhtml = "";
$bodyStyle.append(`<div class="row">${createdhtml}</div>`)

let nothing1 = "";
for(let i = 0; i < 2; i++){
  nothing1 = nothing1 + `
  <div>
    <i class="fa fa-user-circle" aria-hidden="true"></i>
    <i class="fa fa-book" aria-hidden="true"></i>
    <i class="fa fa-bug" aria-hidden="true"></i>
    <i class="fa fa-code" aria-hidden="true"></i>
    <i class="fa fa-database" aria-hidden="true"></i>
    <i class="fa fa-desktop" aria-hidden="true"></i>
    <i class="fa fa-diamond" aria-hidden="true"></i>
    <i class="fa fa-graduation-cap" aria-hidden="true"></i>
    <i class="fa fa-hashtag" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-font" aria-hidden="true"></i>
    <i class="fa fa-bell" aria-hidden="true"></i>
    <i class="fa fa-bookmark" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-tasks" aria-hidden="true"></i>
    <i class="fa fa-user-circle" aria-hidden="true"></i>
    <i class="fa fa-bug" aria-hidden="true"></i>
    <i class="fa fa-code" aria-hidden="true"></i>
    <i class="fa fa-database" aria-hidden="true"></i>
    <i class="fa fa-desktop" aria-hidden="true"></i>
    <i class="fa fa-diamond" aria-hidden="true"></i>
    <i class="fa fa-graduation-cap" aria-hidden="true"></i>
    <i class="fa fa-hashtag" aria-hidden="true"></i>
    <i class="fa fa-star" aria-hidden="true"></i>
    <i class="fa fa-font" aria-hidden="true"></i>
    <i class="fa fa-bell" aria-hidden="true"></i>
    <i class="fa fa-bookmark" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-tasks" aria-hidden="true"></i>
    <i class="fa fa-book" aria-hidden="true"></i>
  </div>`;
  createdhtml = `<div class="row">` + nothing1 + `</div>`;
}

let nothing2 = "";
for(let i = 0; i < 30; i++){
  nothing2 = nothing2 + createdhtml;
  $bodyStyle.html(nothing2);
}