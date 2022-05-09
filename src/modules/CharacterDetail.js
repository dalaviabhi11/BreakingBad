import React, { useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity, Keyboard, BackHandler } from "react-native";
import { makeRequest } from "../api/helper";
import { AuthContext } from "../navigation/AuthProvider";
import AppHeader from "../shared/components/Header";
import { URLS } from "../shared/constants/appConstants";
import { appColors, appFontFamily, appFontSize, screenDimensions, statusBarHeight } from "../shared/constants/appEnums";
import { isSuccessResponse } from "../utilities/CommonFunctions";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CharacterCard from "./CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterListItems } from "../redux/actions/mainActions";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";

const CharacterDetail = (props) => {
    const [stateUpdater, setStateUpdater] = useState(false);
    const [charactersList, setCharacterList] = useState([]);
    const [otherCharacterList, setOtherCharacterList] = useState([]);

    const { selectedItem, selectedIndex} = props.route.params;
    const dispatch = useDispatch();
    const charactersListItems = useSelector(state => state.mainReducer.charactersItemList);

        /*---------------------------------------------------Render useEffect Start------------------------------------------------------------------*/

    useEffect(()=>{
        charactersListItems ? setCharacterList(charactersListItems) : setCharacterList([]);
        const lastIndex= charactersListItems.length-1;
        if(selectedIndex != lastIndex){
            (selectedIndex + 1 != lastIndex) ? otherCharacterList.push(charactersListItems[selectedIndex + 1]) : null;
            (selectedIndex + 2 != lastIndex) ? otherCharacterList.push(charactersListItems[selectedIndex + 2]) : null;
            (selectedIndex + 3 != lastIndex) ? otherCharacterList.push(charactersListItems[selectedIndex + 3]) : null;
        }
    },[])


    const onBack = () =>{
        dispatch(setCharacterListItems(charactersList));
        props.navigation.goBack();
    }
        /*---------------------------------------------------Render useEffect End------------------------------------------------------------------*/

        /*---------------------------------------------------On Favourite Function Start------------------------------------------------------------------*/

    const onFavoriteClick =(isFav = false)=>{
        const getIndex = charactersList.findIndex((character, idx)=> character.char_id == selectedItem.char_id);
        if(getIndex != -1){
            selectedItem.isFavorite = isFav;
            charactersList.splice(getIndex, 1, selectedItem);
            setStateUpdater(!stateUpdater);
        }
        

    }   
        /*---------------------------------------------------On Favourite Function End------------------------------------------------------------------*/

        /*---------------------------------------------------Render ImageView Start------------------------------------------------------------------*/

    const renderImageView = () => {
        return (<View>
            <ImageBackground
                resizeMode={'stretch'}
                style={styles.charImgStyle}
                source={{ uri: selectedItem.img }} >
                <Image style={styles.charSubImg}
                    source={{ uri: selectedItem.img }} />
                <Text style={styles.cardTitle}>{selectedItem.name ? selectedItem.name : '--'}</Text>
                <Text style={styles.cardSubTitle}>{selectedItem.nickname ? selectedItem.nickname : '--'}</Text>
                <Text style={styles.cardStatus}>{selectedItem.status ? selectedItem.status : '--'}</Text>

            </ImageBackground>
                <View style={styles.headerRowContainer}>
                    <TouchableOpacity onPress={()=> onBack()}>
                        <AntDesign name="arrowleft" size={20} color={appColors.white}/>
                    </TouchableOpacity>
                {(selectedItem.isFavorite) ? <TouchableOpacity  onPress={() => onFavoriteClick(false)}>
                        <AntDesign name='heart' size={20} color={appColors.green} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  onPress={() => onFavoriteClick(true)}>
                        <AntDesign name='hearto' size={20} color={appColors.darkWhite} />
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }
        /*---------------------------------------------------Render ImageView End------------------------------------------------------------------*/

        /*---------------------------------------------------Render Description Start------------------------------------------------------------------*/

    const renderDescription = () => {
        return (
            <View style={{marginHorizontal: 10}}>
                <View style={{marginVertical: 23}}>
                    <Text style={styles.descTitle}>Potrayed</Text>
                    <View style={styles.potrayedContainer}>
                        <Text style={styles.cardSubTitle}>{selectedItem.portrayed ? selectedItem.portrayed : '--'}</Text>
                        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.cardSubTitle, {marginRight: 5}]}>{selectedItem.birthday ? selectedItem.birthday : '--'}</Text>
                            <AntDesign name="gift" size={15} color={appColors.white}/>
                        </View>
                    </View>
                </View>

                <View style={{marginVertical: 23}}>
                    <Text style={styles.descTitle}>Occupation</Text>
                    {selectedItem.occupation && selectedItem.occupation.length > 0 ? selectedItem.occupation.map((occupationItem, idx) => {
                        return <Text key={`${occupationItem}_${idx}`} style={[styles.cardSubTitle, {marginBottom: 5}]}>{occupationItem}</Text>
                    }) : null}
                </View>

                <View style={{marginVertical: 23}}>
                    <Text style={styles.descTitle}>Appeared in</Text>
                    <FlatList
                        data={selectedItem.appearance}
                        keyExtractor={(item, idx) => `${item}_${idx}`}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return <View style={styles.appearanceStyle}>
                                <Text style={styles.cardSubTitle}>Season {item}</Text>
                            </View>
                        }}
                        
                    />

                </View>
            </View>
        )
    }
        /*---------------------------------------------------Render Description End------------------------------------------------------------------*/

        /*---------------------------------------------------Render OtherCharacter Start------------------------------------------------------------------*/

        const renderOtherCharacter = () =>{
        return (
            <View>
                <Text style={[styles.cardTitle, {marginVertical: 20}]}>{'Other characters'}</Text>
                <FlatList
                    data={otherCharacterList}
                    keyExtractor={(item, idx) => `${item}_${idx}`}
                    horizontal={true}
                    renderItem={({ item, index}) => {
                        return <CharacterCard
                        item={item}
                        index={index}
                        fromOtherCharacter={true}
                        />
                    }}

                />
            </View>
        )
    }
        /*---------------------------------------------------Render OtherCharacter End------------------------------------------------------------------*/

    return (
        <ScrollView
            style={{ backgroundColor: appColors.secondaryBlack, }}>
            {selectedItem ? renderImageView() : null}
            {selectedItem ? renderDescription() : null}
            {(otherCharacterList.length > 0) ? renderOtherCharacter() : null}
        </ScrollView>
    );
}

export default CharacterDetail;

const styles = StyleSheet.create({
    headerRowContainer: {
        position: 'absolute', 
        top: 10, 
        width: screenDimensions.width - 20, 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginHorizontal: 10
    },
    charImgStyle: {
        height: (screenDimensions.height / 2) + 70,
        width: screenDimensions.width,
        alignItems: 'center',
        justifyContent: 'center',
        // opacity: 0.7
    },
    appearanceStyle: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
        backgroundColor: appColors.primaryBlack
    },
    potrayedContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    charSubImg: {
        height: (screenDimensions.height / 4) + 40,
        width: screenDimensions.width / 2,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    descTitle: {
        fontSize: appFontSize.fontSize14,
        color: appColors.green,
        fontFamily: appFontFamily.robotoRegular,
        marginBottom: 10
    },
    cardTitle: {
        fontSize: appFontSize.fontSize28,
        color: appColors.white,
        fontFamily: appFontFamily.robotoBold,
        maxWidth: screenDimensions.width - 40
    },
    cardSubTitle: {
        fontSize: appFontSize.fontSize14,
        color: appColors.white,
        fontFamily: appFontFamily.robotoSemibold
    },
    cardStatus: {
        fontSize: appFontSize.fontSize14,
        color: appColors.defaultRed,
        fontFamily: appFontFamily.robotoRegular
    }
});