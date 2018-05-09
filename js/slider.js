HTMLElement.prototype.slider = function(options) {
    var slider = this;

    var defaults = {
        animation: "fade"
    };

    options = options || defaults;
    options.animation = options.animation || defaults.animation

    if (options.animation == "sliding") {
        slider.classList.add("slider-sliding");
    } else {
        slider.classList.add("slider-fade");
    }
    var slidesContainer = slider.getElementsByClassName("slides-container")[0];
    var slides = slidesContainer.getElementsByClassName("slide");
    slider.slidesCount = slides.length;


    if (options.animation == "sliding") {
        slidesContainer.style.width = slides.length * 100 + "%";
    }

    for (var j = 0; j < slides.length; ++j) {
        if (options.animation == "sliding") {
            slides[j].style.width = 100 / slides.length + "%"
        } else {
            if (j == 0)
                slides[j].style.opacity = "1";
            else
                slides[j].style.opacity = "0";
        }

        slides[j].dataset.index = j;

    }


    slider.index = 0;

    var buttons = document.createElement("DIV");
    buttons.className = "buttons";
    var prevBtn = document.createElement("BUTTON");
    prevBtn.className = "prev";
    prevBtn.innerHTML = "&lArr;"
    prevBtn.onclick = (function(slider) {
        return function() { slider.prevSlide(); }
    })(slider);

    var nextBtn = document.createElement("BUTTON");
    nextBtn.className = "next";
    nextBtn.innerHTML = "&rArr;"
    nextBtn.onclick = (function(slider) {
        return function() { slider.nextSlide(); }
    })(slider);


    var dots = document.createElement("DIV");
    dots.className = "dots";
    for (var j = 0; j < slider.slidesCount; ++j) {
        var btn = document.createElement("BUTTON");
        if (j == 0) {
            btn.className = "selected"
        }
        btn.onclick = (function(k, slider) {
            return function() { slider.showSlide(k) }
        })(j, slider);
        btn.dataset.slide = j;
        dots.appendChild(btn);
    }
    buttons.appendChild(prevBtn);
    buttons.appendChild(nextBtn);
    buttons.appendChild(dots);

    slider.appendChild(buttons);

    slider.nextSlide = function() {
        this.showSlide((this.index + 1) % this.slidesCount);
    }

    slider.prevSlide = function() {
        this.showSlide(((this.index - 1) % this.slidesCount + this.slidesCount) % this.slidesCount);
    }

    slider.showSlide = function(idx) {
        if (options.animation == "sliding") {
            this.getElementsByClassName("slides-container")[0].style.left = -100 * idx + "%"
        } else {
            var curSlide = this.querySelector("[data-index='" + this.index + "']");
            var nSlide = this.querySelector("[data-index='" + idx + "']");
            curSlide.style.opacity = "0";
            nSlide.style.opacity = "1";
        }
        var curDot = this.querySelector("[data-slide='" + this.index + "']");
        this.index = idx;
        var nDot = this.querySelector("[data-slide='" + this.index + "']");
        curDot.className = "";
        nDot.className = "selected";
    }

}