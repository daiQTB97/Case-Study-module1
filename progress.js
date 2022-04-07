const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
//chu vi hình tròn
const cirDiameter = radius * 2 * Math.PI;

circle.style.strokeDasharray = cirDiameter;
circle.style.strokeDashoffset = cirDiameter;

function setProgress(percent) {
  const offset = cirDiameter - (percent / 100) * cirDiameter;
   circle.style.strokeDashoffset = offset; 
}
