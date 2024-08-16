import { BlinkingView } from "./components/BlinkingView";

import { createElement, useState } from "react";

import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { skeletonStyles } from "./ui/styles";

export function LoadingSkeletonNative({
    style,
    dataLoaded,
    contentToLoad,
    contentDuringLoad,
    useSkeletonShapes,
    skeletonShapes,
    delay
}) {
    const [isInitialized, setisInitialized] = useState(false);

    const styles = mergeNativeStyles(skeletonStyles, style);

    /**
     * Render the shapes and set the correct properties
     *
     * @returns list of skeleton shapes (divs)
     */
    const renderShapes = () => {
        let key = 0;
        const skeletonContent = skeletonShapes.map(shape => {
            const width = Number(shape.shapeWidth.value);
            const height = Number(shape.shapeHeight.value);
            key++;
            const styleArray = [styles.skeletonShape];
            if (shape.skeletonShape === "rectangle") {
                styleArray.unshift(styles.skeletonRectangle);
            } else {
                styleArray.unshift({ borderRadius: width * 0.5 });
                styleArray.unshift(styles.skeletonCircle);
            }
            return (
                <BlinkingView key={key} duration={850} minOpacity={0.35}>
                    <View style={[styleArray, { width: width, height: height }]}></View>
                </BlinkingView>
            );
        });
        return <View style={[styles.skeletonContainer]}>{skeletonContent}</View>;
    };

    /**
     * Render the content to shown when loading data
     */
    const renderLoadingContent = () => {
        if (useSkeletonShapes) {
            return renderShapes();
        } else {
            return <View>{contentDuringLoad}</View>;
        }
    };

    const isDataLoaded = dataLoaded && dataLoaded.value;
    // Once the widget is mounted, show the content, such that flows are triggered
    let contentToShow;
    if (isInitialized) {
        // If date is not yet loaded, set class such that it is not shown
        const styleListView = isDataLoaded ? undefined : styles.skeletonContentNotVisible;
        contentToShow = <View style={styleListView}>{contentToLoad}</View>;
    } else {
        if (dataLoaded.status === "available") {
            // Set timeOut to make sure date the skeleton is rendered before showing the content.
            setTimeout(() => {
                setisInitialized(true);
            }, delay);
        }
    }

    return (
        <View style={[styles.container]}>
            {contentToShow}
            {isDataLoaded ? undefined : renderLoadingContent()}
        </View>
    );
}
