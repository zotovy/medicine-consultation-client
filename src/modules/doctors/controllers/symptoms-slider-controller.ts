import { observable, action } from "mobx";

class SliderController {
    @observable currentSlide = 1;
    @observable slideShift: number = 0;

    @action prevNextButsController = (act: string): void => {
        const sliderWrap:any = document.querySelector(".slider-wrapper");

        if(act === "next" && this.currentSlide !== 3){
            this.currentSlide++
            this.slideShift = this.slideShift + sliderWrap.offsetWidth + 40;
        }else if(act === "prev" && this.currentSlide !== 1){
            this.currentSlide--
            this.slideShift = this.slideShift - sliderWrap.offsetWidth - 40;
        }
    }
    @action slideHandlerClick = (id:string): void => {
        // todo: highlight body part
        const list = document.querySelectorAll('.slider-slide');
        console.log(1)
        list.forEach(item =>{
            item.classList.remove('active');      
        })
        list.forEach(item =>{
            if(id === item.id){
                item.classList.add('active');
            }
        })
    }
}

export default new SliderController();
