import { observable, action } from "mobx";
import axios from "axios";
import { toJS } from "mobx";

class AnimController {
    @action startAnim = () => {
        const animItems: any = document.querySelectorAll("._anim-items");
        console.log(animItems)
        if (animItems.length > 0) {
            console.log(1)

            function onScroll() {
                for (let i = 0; i < animItems.length; i++) {
                    const animItem = animItems[i];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 4;

                    let animItemPoint = window.innerHeight - animItemHeight / 4;
                    if (animItemHeight > window.innerHeight) {
                        animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    }

                    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                        animItem.classList.add("_show-elem")
                    } else {
                        if (!animItem.classList.contains('_anim-not-hide')) {
                            animItem.classList.remove("_show-elem")
                        }
                    }
                }
            }

            function offset(elem: Element) {
                const rect = elem.getBoundingClientRect(),
                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                }
            }
            setTimeout(() => {
                onScroll()
            }, 300)

            function chatAnimation() {

            }
        }
    }
}

export default new AnimController();