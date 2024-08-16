import { Animated, Easing } from "react-native";

import { createElement, useRef } from "react";

export function BlinkingView({ duration, minOpacity = 0, maxOpacity = 1, children }) {
    const blinkAnimation = useRef(new Animated.Value(minOpacity)).current;

    Animated.loop(
        Animated.sequence([
            Animated.timing(blinkAnimation, {
                toValue: minOpacity,
                duration: duration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(blinkAnimation, {
                toValue: maxOpacity,
                duration: duration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            })
        ])
    ).start();
    return <Animated.View style={{ opacity: blinkAnimation }}>{children}</Animated.View>;
}
