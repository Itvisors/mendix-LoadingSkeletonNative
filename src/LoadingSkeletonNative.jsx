import { createElement } from "react";

import { HelloWorld } from "./components/HelloWorld";

export function LoadingSkeletonNative({ yourName, style }) {
    return <HelloWorld name={yourName} style={style} />;
}
