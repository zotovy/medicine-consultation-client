import { TMessage, TMessageBlock } from "@/modules/video-chat/types";
import { EMessageType, TLink } from "@/modules/video-chat/types";
import ValidationServices from "@/services/validation-services";

export default class Selector {

    private static _extractLinks = (message: string): (TLink | string)[] => {
        if (!message) return [];
        const splitted = message.split(" ");
        const messages: (TLink | string)[] = [];

        splitted.forEach((e) => {
            if (ValidationServices.isUrl(e)) {
                let splittedHttp = e.split("http://");

                if (splittedHttp.length === 1)
                    splittedHttp = e.split("https://");

                const last = splittedHttp[splittedHttp.length - 1];
                let content = last,
                        href = e;
                if (last.length > 35) content = last.substring(0, 35) + "...";

                if (!e.includes("https://") && !e.includes("http://")) {
                    href = "http://" + e;
                }

                messages.push({ content, href });
            } else messages.push(e);
        });

        return messages;
    };

    public static getMessageBlocks = (messages: TMessage[]): TMessageBlock[] => {
        const blocks: TMessageBlock[] = [];
        messages.forEach((e, i) => {
            if (e.type === EMessageType.Message) {
                if (
                        i > 0 &&
                        blocks[blocks.length - 1].isUser === e.isUser &&
                        blocks[blocks.length - 1].type === e.type
                ) {
                    blocks[blocks.length - 1].content.push(
                            Selector._extractLinks(e.message)
                    );
                } else {
                    blocks.push({
                        isUser: e.isUser,
                        content: [Selector._extractLinks(e.message)],
                        type: EMessageType.Message,
                    });
                }
            } else {
                blocks.push({ ...e, content: [Selector._extractLinks(e.message)] });
            }
        });
        return blocks;
    }

}
