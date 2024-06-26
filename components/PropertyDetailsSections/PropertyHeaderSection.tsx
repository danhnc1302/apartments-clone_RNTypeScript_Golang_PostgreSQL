import React, { useState } from "react";
import {
    Share,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { Property } from "../../types/property";
import { theme } from "../../theme";
import { Row } from "../Row";

import { getStateAbbreviation } from "../../utils/getStateAbbreviation";

export const PropertyHeaderSection = ({
    property
}: {
    property: Property
}) => {

    const [headerIconName, setHeaderIconName] = useState<"heart" | "heart-outline">("heart-outline");

    const handleHeartPress = () => {
        if (headerIconName == "heart") {
            return setHeaderIconName("heart-outline");
        }
        setHeaderIconName("heart");
    }

    const shareItem = async () => {
        try {
            await Share.share({
                message: "Check out this sweet apartment I found on JPApartments.com"
            })
        } catch (error: unknown) {
            alert("Sorry, we're unable to share")
        }
    }

    return (
        <>
            {property.name ? (
                <Text category={"h5"} style={styles.defaultMarginTop}>
                    {property.name}
                </Text>
            ) : null}
            <Row style={[styles.containerRow, styles.defaultMarginTop]}>
                <View>
                    <Text category={"c1"}>{property.street}</Text>
                    <Text category={"c1"}>{`${property.city}, ${getStateAbbreviation(
                        property.state
                    )} ${property.zip}`}</Text>
                </View>
                <Row style={styles.iconRow}>
                    <MaterialIcons
                        onPress={async () => {
                            await shareItem();
                        }}
                        name="ios-share"
                        size={30}
                        color={theme["color-primary-500"]}
                        style={styles.shareIcon}
                    />
                    <MaterialCommunityIcons
                        onPress={handleHeartPress}
                        name={property?.liked ? "heart" : "heart-outline"}
                        size={30}
                        color={theme["color-primary-500"]}
                    />
                </Row>
            </Row>
        </>
    )
}

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: 10 },
    containerRow: {
        justifyContent: "space-between",
    },
    iconRow: { paddingRight: 5 },
    shareIcon: {
        marginRight: 20,
        marginTop: -4,
    },
    defaultMarginTop: { marginTop: 10 },
})