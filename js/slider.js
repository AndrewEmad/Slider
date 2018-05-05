var numSlides = 0,
    index = 0;

(function() {
    numSlides = document.getElementById("slides-container").childElementCount - 2;
    var dots = document.createElement("DIV");
    dots.id = "dots";
    for (var i = 0; i < numSlides; ++i) {
        var btn = document.createElement("BUTTON");
        if (i == 0) {
            btn.className = "selected"
        }
        btn.onclick = (function(j) {
            return function() { showSlide(j) }
        })(i);
        btn.dataset.slide = i;
        dots.appendChild(btn);
    }
    document.getElementById("slides-container").appendChild(dots);
})();

function nextSlide() {
    showSlide((index + 1) % numSlides);
}

function prevSlide() {
    showSlide (((index - 1) % numSlides + numSlides) % numSlides);
}

function showSlide(idx) {
    var curSlide = document.querySelector("[data-index='" + index + "']");
    var curDot = document.querySelector("[data-slide='" + index + "']");
    index = idx;
    var nSlide = document.querySelector("[data-index='" + index + "']");
    var nDot = document.querySelector("[data-slide='" + index + "']");
    curSlide.style.opacity = "0";
    curDot.className = "";
    nSlide.style.opacity = "1";
    nDot.className = "selected";
}