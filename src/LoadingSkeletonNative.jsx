import { createElement, useState } from "react";

import {  View } from "react-native";

import { BlinkingView } from "./components/BlinkingView";

import { skeletonStyles } from './ui/styles';


export function LoadingSkeletonNative({ style, dataLoaded, contentToLoad, skeletonShapes, delay }) {
    const [isInitialized, setisInitialized] = useState(false);
    
    /**
     * Render the shapes and set the correct properties
     *
     * @returns list of skeleton shapes (divs)
     */
    const renderShapes = () => {
        let key = 0;
        return skeletonShapes.map(shape => {
            const width = shape.shapeWidth //+ (shape.shapeWidthPixels ? "" : "%");
            const height = shape.shapeHeight //+ (shape.shapeHeightPixels ? "" : "%");
            key++;
            const styleArray = [...style];
            styleArray.unshift(skeletonStyles.skeletonShape);
            styleArray.unshift(skeletonStyles.shapeClass);
            //let styleListShape = styles.skeletonShape; /*shape.shapeClass +*/
            if (shape.skeletonShape === "rectangle") {
                styleArray.unshift(skeletonStyles.skeletonRectangle);
            } else {
                styleArray.unshift({borderRadius: width * 0.5});
            }
            return (<BlinkingView key={key} duration={850} minOpacity={0.35}>
                <View style={[styleArray, { width: width, height: height }]}></View>
                </BlinkingView>);
            });
    }

    const isDataLoaded = dataLoaded && dataLoaded.value;
    // Once the widget is mounted, show the content, such that flows are triggered
    let contentToShow;
    if (isInitialized) {
        // If date is not yet loaded, set class such that it is not shown
        const styleListView = isDataLoaded ? undefined : skeletonStyles.skeletonContentNotVisible;
        contentToShow = <View style={styleListView}>{contentToLoad}</View>;
    } else {
        if (dataLoaded.status === "available") {
            // Set timeOut to make sure date the skeleton is rendered before showing the content.
            setTimeout(() => {
                setisInitialized( true );
            }, delay);
        }
    }
    return (
        <View style={[style]}>
            {contentToShow}
            {isDataLoaded ? undefined : renderShapes()}
        </View>
    );
}
