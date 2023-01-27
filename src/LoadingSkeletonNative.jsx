import { createElement, useState } from "react";

import {  View, StyleSheet } from "react-native";

import { BlinkingView } from "./components/BlinkingView";


export function LoadingSkeletonNative({ style, dataLoaded, contentToLoad, skeletonShapes, delay }) {
    const styles = StyleSheet.create({
        skeletonShape : {
        display: "flex",
        marginBottom: 16,
        backgroundColor: "#DDD",
        },
        skeletonContentNotVisible : {
            display: "none",
        },
        skeletonRectangle : {
            borderRadius: 4,
        },
        skeletonCircle : {
            /*borderRadius: "50%", width*0,5*/
        },
    });
    const [isInitialized, setisInitialized] = useState(false);
    
    /**
     * Render the shapes and set the correct properties
     *
     * @returns list of skeleton shapes (divs)
     */
    const renderShapes = () => {
        let key = 0;
        return skeletonShapes.map(shape => {
            key++;
            let styleListShape = styles.skeletonShape; /*shape.shapeClass +*/
            /*if (shape.skeletonShape === "rectangle") {
                styleListShape.append(styles.skeletonRectangle);
            } else {
                styleListShape.append(styles.skeletonCircle);
            }*/
            const width = shape.shapeWidth //+ (shape.shapeWidthPixels ? "px" : "%");
            const height = shape.shapeHeight //+ (shape.shapeHeightPixels ? "px" : "%");
            return (<BlinkingView key={key} duration={850}><View style={[styleListShape, { width: width, height: height }]}></View></BlinkingView>);
            });
    }

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
                setisInitialized( true );
            }, delay);
        }
    }
    return (
        <View style={style}>
            {contentToShow}
            {isDataLoaded ? undefined : renderShapes()}
            <View style={[{ width: 50, height: 50, backgroundColor:'red' }]}></View>
        </View>
    );
}
