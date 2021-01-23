import React, { ComponentType } from "react";
import { Controllers } from "../store";
import { inject } from "mobx-react";



function withController<T = {}>(Component: ComponentType<any>, ...controllers: (keyof Controllers)[]): ComponentType<T> {
    // @ts-ignore
    return inject(...controllers)(Component);
}

export default withController;