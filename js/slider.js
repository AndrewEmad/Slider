(function() {
    var sliders = document.getElementsByClassName("slider");
    for(var i=0;i<sliders.length;++i){
        var slidesContainer = sliders[i].getElementsByClassName("slides-container")[0];
        sliders[i].slidesCount = slidesContainer.childElementCount;
        sliders[i].index=0;


        var prevBtn = document.createElement("BUTTON");
        prevBtn.className="prev";
        prevBtn.innerHTML="&lArr;"
        prevBtn.onclick = (function(slider){
            return function(){slider.prevSlide();}
        })(sliders[i]);
        slidesContainer.insertBefore(prevBtn,slidesContainer.firstChild);

        var nextBtn = document.createElement("BUTTON");
        nextBtn.className="next";
        nextBtn.innerHTML="&rArr;"
        nextBtn.onclick = (function(slider){
            return function(){slider.nextSlide();}
        })(sliders[i]);
        slidesContainer.appendChild(nextBtn);


        var dots = document.createElement("DIV");
        dots.className = "dots";
        for (var j = 0; j < sliders[i].slidesCount; ++j) {
            var btn = document.createElement("BUTTON");
            if (j == 0) {
                btn.className = "selected"
            }
            btn.onclick = (function(k,slider) {
                return function() { slider.showSlide(k) }
            })(j,sliders[i]);
            btn.dataset.slide = j;
            dots.appendChild(btn);
        }
        sliders[i].getElementsByClassName("slides-container")[0].appendChild(dots);

        sliders[i].nextSlide = function() {
            this.showSlide((this.index + 1) % this.slidesCount);
        }
        
        sliders[i].prevSlide = function(){
            this.showSlide (((this.index - 1) % this.slidesCount + this.slidesCount) % this.slidesCount);
        }
        
        sliders[i].showSlide = function (idx) {
            var curSlide = this.querySelector("[data-index='" + this.index + "']");
            var curDot = this.querySelector("[data-slide='" + this.index + "']");
            this.index = idx;
            var nSlide = this.querySelector("[data-index='" + this.index + "']");
            var nDot = this.querySelector("[data-slide='" + this.index + "']");
            curSlide.style.opacity = "0";
            curDot.className = "";
            nSlide.style.opacity = "1";
            nDot.className = "selected";
        }
    }
})();
