setInterval(function () {
  //Los_angeles
  let los_angeles = document.querySelector(".los_angeles");
  let los_angeles_date = los_angeles.querySelector(".date");
  let los_angeles_time = los_angeles.querySelector(".time");
  los_angeles_date.innerHTML = moment()
    .tz("America/Los_Angeles")
    .format("MMMM D, YYYY ");

  los_angeles_time.innerHTML = moment()
    .tz("America/Los_Angeles")
    .format("h:m:ss [<small>]A[</small>]");

  //los_angeles_time.innerHTML = "1:48:15 <small>AM</small>";

  //paris
  let paris = document.querySelector(".paris");
  let paris_date = paris.querySelector(".date");
  let paris_time = paris.querySelector(".time");
  paris_date.innerHTML = moment().tz("Europe/Paris").format("MMMM D, YYYY ");

  paris_time.innerHTML = moment()
    .tz("Europe/Paris")
    .format("h:m:ss [<small>]A[</small>]");
}, 1000);

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "Current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityTime = moment().tz(cityTimeZone);
  let all_element = document.querySelector(".all");
  all_element.innerHTML = `<div id="places"><div> <h2>${
    cityTimeZone.split("/")[1]
  }</h2><span class="date">${cityTime.format(
    "MMMM D, YYYY "
  )}</span></div><div class="time">${cityTime.format(
    "h:m:ss [<small>]A[</small>]"
  )}</div></div>`;
}

let all_select = document.querySelector("#drop");
all_select.addEventListener("change", updateCity);
