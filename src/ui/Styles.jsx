import { Style } from "@mendix/pluggable-widgets-tools";
import { StyleSheet } from "react-native";

export const skeletonStyles = StyleSheet.create({
    skeletonShape: {
        display: "flex",
        marginBottom: 16,
        backgroundColor: "#DDD",
    },
    skeletonContentNotVisible: {
        display: "none",
    },
    skeletonRectangle: {
        borderRadius: 4,
    },
    skeletonCircle: {
        borderRadius: 50, /*width*0,5*/
    },
});