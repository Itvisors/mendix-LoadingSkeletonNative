import { createElement, useRef } from "react";

import {  View, Animated, Easing } from "react-native";


export function BlinkingView({ duration, children }) {
    const blinkAnimation = useRef(new Animated.Value(0.35)).current;

    Animated.loop(
        Animated.sequence([
            Animated.timing(blinkAnimation, {
                toValue: 0.35,
                duration: duration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(blinkAnimation, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            })
        ])
    ).start();
    return (
        <Animated.View style={{opacity: blinkAnimation}}>
            {children}
        </Animated.View>
        
    );
}
