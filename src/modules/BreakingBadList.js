import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { makeRequest } from "../api/helper";
import { AuthContext } from "../navigation/AuthProvider";
import AppHeader from "../shared/components/Header";
import { URLS } from "../shared/constants/appConstants";
import { appColors, appFontFamily, appFontSize } from "../shared/constants/appEnums";
import { isSuccessResponse } from "../utilities/CommonFunctions";
import Entypo from 'react-native-vector-icons/Entypo';
import CharacterCard from "./CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterListItems } from "../redux/actions/mainActions";
import { useFocusEffect } from "@react-navigation/native";

const BreakingBadList = (props) => {
    const { setLoader, loading } = useContext(AuthContext);
    const [charactersList, setCharacterList] = useState([]);
    const [stateUpdater, setStateUpdater] = useState(false);
    const [searchActive, setIsSearchActive] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const dispatch = useDispatch();
    const charactersListItems = useSelector(state => state.mainReducer.charactersItemList);

    var timoutId = null;
        /*---------------------------------------------------Render useEffect Start------------------------------------------------------------------*/

    useEffect(() => {
        (charactersListItems && charactersListItems.length > 0) ? null : getCharacterList(false);
    }, [])
   
    useEffect(() => {
        charactersListItems ? setCharacterList(charactersListItems) : setCharacterList([]);
       
    }, [charactersListItems])

    useFocusEffect(useCallback(()=>{
        setSearchText(null);
        setIsSearchActive(false);
        setLoader(true);
        charactersListItems ? setCharacterList(charactersListItems) : setCharacterList([]);
        setLoader(false);
    },[])
    )
    /*---------------------------------------------------Render useEffect End------------------------------------------------------------------*/

    /*---------------------------------------------------Get Character List Start------------------------------------------------------------------*/
    const getCharacterList = (isValue = false) => {
        setLoader(true);
        const getUrl = isValue ? `${URLS.getCharacters}?name=${isValue}` : URLS.getCharacters;
        makeRequest({
            method: 'GET',
            url: getUrl
        })
            .then((response) => {
                setLoader(false);
                if (isSuccessResponse(response)) {
                    isValue ? null : (response.data && response.data.length > 0 ) ? dispatch(setCharacterListItems(response.data)) : dispatch(setCharacterListItems([]));
                    isValue ? setCharacterList(response.data) : null;
                }
                timoutId ? clearTimeout(timoutId) : null;
            })
            .catch((error) => {
                setLoader(false);
                timoutId ? clearTimeout(timoutId) : null;
                console.log("errror", error)
            })
    }
    /*---------------------------------------------------Get Character List End------------------------------------------------------------------*/

    /*---------------------------------------------------Search Operation Start------------------------------------------------------------------*/

    const onChangeValue = (value) => {
        if (value != '') {
            setSearchText(value);
            timoutId = setTimeout(() => {
                getCharacterList(value);
            }, 500);

        }
        else {
            clearSearch();
        }
    }
    const clearSearch = () => {
        setSearchText(null);
        timoutId = setTimeout(() => {
            getCharacterList(false);
        }, 500);
    }
    /*---------------------------------------------------Search Operation End------------------------------------------------------------------*/

    /*---------------------------------------------------Render Header Start------------------------------------------------------------------*/
    const renderHeader = () => {
        return (
            !searchActive ? <AppHeader
                onBackPress={() => props.navigation.goBack()}
                title={'The Breaking bad'}
                hideBackButton
                rightIcon
                searchIcon
                favorite
                onFavoriteClick={() => { props.navigation.navigate('FavouriteList') }}
                onSearchclick={() => setIsSearchActive(true)}
            />
                :
                <View style={styles.searchContainer}>
                    <TextInput
                        value={searchText}
                        onChangeText={(value) => onChangeValue(value)}
                        placeholder={'Search'}
                        autoFocus={true}
                        style={styles.textInputContainer} />
                    <TouchableOpacity onPress={() => {
                        clearSearch();
                        setIsSearchActive(false)
                    }} >
                        <Entypo name="cross" size={20} color={appColors.white} />
                    </TouchableOpacity>
                </View>
        )
    }
    /*---------------------------------------------------Render Header End------------------------------------------------------------------*/

    /*---------------------------------------------------Render Characters card Start------------------------------------------------------------------*/
    const renderCharacterList = () => {
        return (<View>
            <FlatList
                data={charactersList}
                numColumns={2}
                initialNumToRender={10}
                onScroll={() => Keyboard.dismiss()}
                extraData={charactersList}
                keyExtractor={(item, index) => (index % 2 != 0) ? `${item.char_id}_${index}` : null}
                renderItem={({ item, index }) => {
                    return (
                        <CharacterCard
                            item={item}
                            index={index}
                            navigation={props.navigation}
                            onFavoriteClick={(selectedItem, selectedIndex, isFav) => {
                                const obj = { ...selectedItem, 'isFavorite': isFav };
                                charactersList.splice(selectedIndex, 1, obj);
                                dispatch(setCharacterListItems(charactersList));
                                setStateUpdater(!stateUpdater);
                            }} />
                    )
                }}
            />
        </View>
        )
    }
    /*---------------------------------------------------Render Characters card End------------------------------------------------------------------*/

    /*---------------------------------------------------Render Empty Component Start------------------------------------------------------------------*/

    const renderEmptyView = () => {
        return (
            <View style={styles.noResultContainer}>
                <Text style={styles.noResultText}>{'No Character found'}</Text>
                <TouchableOpacity onPress={() => (searchActive && searchText) ? getCharacterList(searchText) : getCharacterList(false)}>
                    <Text style={styles.tryAgainText}>{'Try again'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    /*---------------------------------------------------Render Empty Component End------------------------------------------------------------------*/

    return (<View style={{ flex: 1, backgroundColor: appColors.secondaryBlack }}>
        {renderHeader()}
        {charactersList.length > 0 ? renderCharacterList() : loading ? null : renderEmptyView()}
    </View>
    )
}

export default BreakingBadList;

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: appColors.primaryBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
        paddingHorizontal: 15
    },
    textInputContainer: {
        flex: 1,
        fontSize: appFontSize.fontSize20,
        color: appColors.white
    },
    noResultContainer: {
        marginTop: 35,
        marginHorizontal: 20
    },
    tryAgainText: {
        fontSize: appFontSize.fontSize18,
        color: appColors.darkWhite,
        fontFamily: appFontFamily.robotoLight,
        paddingVertical: 8
    },
    noResultText: {
        fontSize: appFontSize.fontSize22,
        fontFamily: appFontFamily.robotoLight,
        color: appColors.green
    }
})