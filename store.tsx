import React from "react";

let clientSideStores: Controllers | null;

type Controllers = {}

const createController = (): Controllers => ({

})

export const getControllers = (): Controllers => {
    if (typeof window === "undefined") {
        return createController();
    }

    if (!clientSideStores) {
        clientSideStores = createController();
    }

    return clientSideStores;
}

const ControllerContext = React.createContext(null);

export const StoreProvider = (props: any) =>  {
    return <ControllerContext.Provider value={props.value}>{props.children}</ControllerContext.Provider>;
}

export function useControllers() {
    return React.useContext(ControllerContext);
}