(function() {
    var sliders = document.getElementsByClassName("slider");
    for(var i=0;i<sliders.length;++i){
        sliders[i].classList.add("slider-fade");
        var slidesContainer = sliders[i].getElementsByClassName("slides-container")[0];
        var slides = slidesContainer.getElementsByClassName("slide");
        sliders[i].slidesCount = slides.length;

        for(var j=0;j<slides.length;++j){
            if(j==0)
                slides[j].style.opacity = "1";
            else
                slides[j].style.opacity = "0";


            slides[j].dataset.index = j;
        }


        sliders[i].index=0;

        var buttons = document.createElement("DIV");
        buttons.className="buttons";
        var prevBtn = document.createElement("BUTTON");
        prevBtn.className="prev";
        prevBtn.innerHTML="&lArr;"
        prevBtn.onclick = (function(slider){
            return function(){slider.prevSlide();}
        })(sliders[i]);

        var nextBtn = document.createElement("BUTTON");
        nextBtn.className="next";
        nextBtn.innerHTML="&rArr;"
        nextBtn.onclick = (function(slider){
            return function(){slider.nextSlide();}
        })(sliders[i]);
        

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
        buttons.appendChild(prevBtn);
        buttons.appendChild(nextBtn);
        buttons.appendChild(dots);

        sliders[i].appendChild(buttons);

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
