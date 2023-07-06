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

//clock
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(
    0,
    0,
    radius * 0.95,
    0,
    0,
    radius * 1.05
  );
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num < 13; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
