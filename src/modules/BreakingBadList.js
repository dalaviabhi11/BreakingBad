import React, { useCallback, useContext, useEffect, useState } from "react";
import {  View, FlatList, StyleSheet, Keyboard } from "react-native";
import { makeRequest } from "../api/helper";
import { AuthContext } from "../navigation/AuthProvider";
import AppHeader from "../shared/components/Header";
import { URLS } from "../shared/constants/appConstants";
import { appColors, appFontSize } from "../shared/constants/appEnums";
import { isSuccessResponse } from "../utilities/CommonFunctions";
import CharacterCard from "./CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterListItems } from "../redux/actions/mainActions";
import { useFocusEffect } from "@react-navigation/native";

const BreakingBadList = (props) => {
    const { setLoader, loading } = useContext(AuthContext);
    const [charactersList, setCharacterList] = useState([]);
    const [stateUpdater, setStateUpdater] = useState(false);
    const dispatch = useDispatch();
    const charactersListItems = useSelector(state => state.mainReducer.charactersItemList);

        /*---------------------------------------------------Render useEffect Start------------------------------------------------------------------*/

    useEffect(() => {
        (charactersListItems && charactersListItems.length > 0) ? null : getCharacterList(false);
    }, [])
   
    useEffect(() => {
        charactersListItems ? setCharacterList(charactersListItems) : setCharacterList([]);
       
    }, [charactersListItems])

    useFocusEffect(useCallback(()=>{
        setLoader(true);
        console.log("called");
        charactersListItems ? setCharacterList(charactersListItems) : setCharacterList([]);
        setLoader(false);
    },[])
    )
    /*---------------------------------------------------Render useEffect End------------------------------------------------------------------*/

    /*---------------------------------------------------Get Character List Start------------------------------------------------------------------*/
    const getCharacterList = () => {
        setLoader(true);
        const getUrl =  URLS.getCharacters;
        makeRequest({
            method: 'GET',
            url: getUrl
        })
            .then((response) => {
                setLoader(false);
                if (isSuccessResponse(response)) {
                    (response.data && response.data.length > 0 ) ? dispatch(setCharacterListItems(response.data)) : dispatch(setCharacterListItems([]));
                }
            })
            .catch((error) => {
                setLoader(false);
                console.log("errror", error)
            })
    }
    /*---------------------------------------------------Get Character List End------------------------------------------------------------------*/


    /*---------------------------------------------------Render Header Start------------------------------------------------------------------*/
    const renderHeader = () => {
        return (
           <AppHeader
                onBackPress={() => props.navigation.goBack()}
                title={'The Breaking bad'}
                hideBackButton
                rightIcon
                searchIcon
                favorite
                onFavoriteClick={() => { 
                    props.navigation.navigate('FavouriteList');
                    setLoader(true) }}
                onSearchclick={() =>  props.navigation.navigate('searchList')}
            />
               
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

    return (<View style={{ flex: 1, backgroundColor: appColors.secondaryBlack }}>
        {renderHeader()}
        {charactersList.length > 0 ? renderCharacterList() : null }
    </View>
    )
}

export default BreakingBadList;
