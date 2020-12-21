import { action } from "mobx";

class AnimController {
    @action startAnim = () => {
        const   animItems: any = document.querySelectorAll("._anim-items"),
                msg1: Element | any = document.querySelector(".message_container.message_container__left"),
                msgLoader1: Element | any = document.querySelector(".message__block-sending.message__block-sending"),
                msgCheckIcon1: Element | any = document.querySelector(".read-indicator-1"),
                msg2: Element | any = document.querySelector(".message_container.message_container__right"),
                msgLoader2: Element | any = document.querySelector(".message__block-sending.message__block-sending-right"),
                msgCheckIcon2: Element | any = document.querySelector(".read-indicator-2");
        if (animItems.length > 0) {
            function onScroll() {
                for (let i = 0; i < animItems.length; i++) {
                    const   animItem = animItems[i],
                            animItemHeight = animItem.offsetHeight,
                            animItemOffset = offset(animItem).top,
                            animStart = 4;

                    let animItemPoint = window.innerHeight - animItemHeight / 4;
                    if (animItemHeight > window.innerHeight) {
                        animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    }

                    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                        animItem.classList.add("_show-elem")
                        chatAnimation(animItem)
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

            function chatAnimation(animItem: Element) {
                if(animItem.classList.contains("messenger")&&animItem.classList.contains("_show-elem")&&!animItem.classList.contains("_stopChat")){
                    animItem.classList.add("_stopChat");
                    setTimeout(() => {
                        msg1.classList.remove("message-hidden");
                        msg1.classList.add("slide-in-left");
                        msgLoader1.classList.add("message-hidden");
                        setTimeout(() => {
                            msgCheckIcon1.classList.remove("read-indicator-hidden");
                            msgCheckIcon1.classList.add("draw-line");
                            setTimeout(() => {
                                msgLoader2.classList.add("message-hidden");
                                msgLoader2.classList.remove("message-hidden");
                                msgLoader2.classList.add("slide-in-right");
                                setTimeout(() => {
                                    msg2.classList.remove("message-hidden");
                                    msg2.classList.add("slide-in-right")
                                    msgLoader2.classList.add("message-hidden");
                                    setTimeout(() => {
                                        msgCheckIcon2.classList.remove("read-indicator-hidden"); 
                                        msgCheckIcon2.classList.add("draw-line");
                                    },1000)
                                },2000)     
                            },250)
                        },1000)
                    },3000)
                }
            }
        }
    }
}

export default new AnimController();