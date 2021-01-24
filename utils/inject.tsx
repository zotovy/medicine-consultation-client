import React, { ComponentType } from "react";
import { Controllers, getContainer, TYPES } from "../container";


function withController<T = {}>(Component: ComponentType<any>, ...controllers: (keyof Controllers)[]): ComponentType<T> {
    const ctrls: Partial<Controllers> = {};
    const container = getContainer();

    controllers.forEach((e: keyof Controllers) => {
        // @ts-ignore
        ctrls[e] = container.get<Controllers[typeof e]>(TYPES[e]);
    })

    return (props) => {
        return <Component {...ctrls} {...props} />
    };
}

export default withController;