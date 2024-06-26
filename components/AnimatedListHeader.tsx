import React, { useState } from "react";
import {
    Animated,
    LayoutChangeEvent,
    View,
    TouchableOpacity,
    Platform,
    FlatList,
    StyleSheet,
} from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HEADERHEIGHT, LISTMARGIN } from "../constants";
import { theme } from "../theme";

import { HeaderInput } from "./HeaderInput";
import { HeaderFilterButtons } from "./HeaderFilterButtons";
import { HeaderLogistics } from "./HeaderLogistics";

export const AnimatedListHeader = ({
    scrollAnimation,
    mapShown,
    setMapShown,
    location,
    availableProperties,
}: {
    scrollAnimation: Animated.Value,
    mapShown: boolean,
    setMapShown: (bool: boolean) => void,
    location: string,
    availableProperties?: number
}) => {
    const [offsetAnimation] = useState(new Animated.Value(0))
    const [clampedScroll, setClampedScroll] = useState(
        Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                }),
                offsetAnimation
            ),
            0,
            1
        )
    );

    const navbarTranslate = clampedScroll.interpolate({
        inputRange: availableProperties && !mapShown ? [0, HEADERHEIGHT] : [0, 0],
        outputRange: availableProperties && !mapShown ? [0, -HEADERHEIGHT] : [0, 0],
        extrapolate: "clamp",
    });

    const onLayout = (event: LayoutChangeEvent) => {
        let { height } = event.nativeEvent.layout
        setClampedScroll(
            Animated.diffClamp(
                Animated.add(
                    scrollAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnimation
                ),
                0,
                height
            )
        )
    }

    return (
        <Animated.View
            style={[styles.container, { transform: [{ translateY: navbarTranslate }] }]}
            onLayout={onLayout}
        >
            <View style={{ marginHorizontal: LISTMARGIN }}>
                <HeaderInput location={location} />
                <HeaderFilterButtons />
            </View>
            <Divider style={styles.divider} />
            <HeaderLogistics mapShown={mapShown} setMapShown={setMapShown} availableProperties={availableProperties} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        height: HEADERHEIGHT,
        backgroundColor: "white",
    },
    defaultMarginHorizontal: {
        marginHorizontal: LISTMARGIN,
    },
    divider: {
        backgroundColor: theme["color-gray"]
    },
})