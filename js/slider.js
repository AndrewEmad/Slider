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
        btn.onclick = (function(b, j) {
            return function() { showSlide(b, j) }
        })(btn, i);
        btn.dataset.slide = i;
        dots.appendChild(btn);
    }
    document.getElementById("slides-container").appendChild(dots);
})();

function nextSlide() {
    var curSlide = document.querySelector("[data-index='" + index + "']");
    var curDot = document.querySelector("[data-slide='" + index + "']");
    index = (index + 1) % numSlides;
    var nSlide = document.querySelector("[data-index='" + index + "']");
    var nDot = document.querySelector("[data-slide='" + index + "']");
    curSlide.style.opacity = "0";
    curDot.className = "";
    nSlide.style.opacity = "1";
    nDot.className = "selected";
}


function prevSlide() {
    var curSlide = document.querySelector("[data-index='" + index + "']");
    var curDot = document.querySelector("[data-slide='" + index + "']");
    index = ((index - 1) % numSlides + numSlides) % numSlides;
    var nSlide = document.querySelector("[data-index='" + index + "']");
    var nDot = document.querySelector("[data-slide='" + index + "']");
    curSlide.style.opacity = "0";
    curDot.className = "";
    nSlide.style.opacity = "1";
    nDot.className = "selected";
}

function showSlide(btn, idx) {
    var dots = document.getElementById("dots").childNodes;
    for (var i = 0; i < dots.length; ++i) {
        dots[i].className = "";
    }
    for (var i = 0; i < numSlides; ++i) {
        if (i == idx) {
            var element = document.querySelector("[data-index='" + i + "']");
            element.style.opacity = "1"
        } else {
            var element = document.querySelector("[data-index='" + i + "']");
            element.style.opacity = "0";
        }
    }
    index = idx;
    btn.className = "selected"
}