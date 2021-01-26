import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";

@injectable()
export default class SliderController {

    constructor() {
        makeObservable(this);
    }

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
