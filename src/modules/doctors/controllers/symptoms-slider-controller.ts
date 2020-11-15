import { observable, action } from "mobx";

class SliderController {
    @observable currentSlide = 1;
    @observable slideShift: number = 0;
    @observable highlightSlideId: string = '';

    @action prevNextButsController = (act: string, amoutSlides?: number): void => {
        const sliderWrap:any = document.querySelector(".slider-wrapper");

        if(act === "next" && this.currentSlide !== amoutSlides){
            this.currentSlide++
            this.slideShift = this.slideShift + sliderWrap.offsetWidth + 40;
            this.highlightSlideId = "";
        }else if(act === "prev" && this.currentSlide !== 1){
            this.currentSlide--
            this.slideShift = this.slideShift - sliderWrap.offsetWidth - 40;
            this.highlightSlideId = "";
        }
    }
    @action slideHandlerClick = (id:string): void => {
        this.highlightSlideId = id;
    }
}

export default new SliderController();
