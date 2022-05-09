import React, { useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { appColors, appFontFamily, appFontSize, screenDimensions } from "../shared/constants/appEnums";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CharacterCard = (props) => {
    const { item, index, onFavoriteClick, navigation } = props;
    const renderCardView = () => {
        return (
            <TouchableOpacity style={[styles.cardContainer, { marginTop: (!props.fromOtherCharacter && (index == 0 || index == 1)) ? 35 : 0 }]}
                onPress={() => props.fromOtherCharacter ? null : navigation.navigate('characterDetail', { selectedItem: item, selectedIndex: index })}>
                <Image source={{ uri: item.img }} style={styles.cardImgStyle} />
                <View style={{ marginVertical: 10 }}>
                    <View style={styles.cardDescContainer}>
                        <Text style={styles.cardTitle}>{item.name ? item.name : '--'}</Text>

                        {(props.fromOtherCharacter) ? null
                            :
                            (item.isFavorite) ? <TouchableOpacity style={{ flex: 0.15 }} onPress={onFavoriteClick ? () => onFavoriteClick(item, index, false) : null}>
                                <AntDesign name='heart' size={20} color={appColors.green} />
                            </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ flex: 0.15 }} onPress={onFavoriteClick ? () => onFavoriteClick(item, index, true) : null}>
                                    <AntDesign name='hearto' size={20} color={appColors.primaryBlack} />
                                </TouchableOpacity>}
                    </View>

                    <Text style={styles.cardSubTitle}>{item.nickname ? item.nickname : '--'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        item ? renderCardView() : null
    );
}
export default CharacterCard;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'transperant',
        marginHorizontal: 10,
        marginBottom: 50,

    },
    cardDescContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardImgStyle: {
        width: (screenDimensions.width / 2) - 20,
        height: 210,
        borderRadius: 5
    },
    cardTitle: {
        flex: 0.85,
        fontSize: appFontSize.fontSize16,
        color: appColors.white,
        fontFamily: appFontFamily.robotoBold,
        maxWidth: (screenDimensions.width / 2) - 20,
    },
    cardSubTitle: {
        fontSize: appFontSize.fontSize14,
        color: appColors.white,
        fontFamily: appFontFamily.robotoSemibold
    }
})