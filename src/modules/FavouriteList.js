import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, Keyboard, BackHandler} from "react-native";
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

const FavoriteList = (props) =>{
    const {setLoader, loading} = useContext(AuthContext);
    const [charactersList, setCharacterList] = useState([]);
    const [dummycharactersList, setDummyCharacterList] = useState([]);
    const [stateUpdater, setStateUpdater] = useState(false);

    const dispatch = useDispatch();
    const charactersListItems = useSelector(state => state.mainReducer.charactersItemList);
        /*---------------------------------------------------Render useEffect Start------------------------------------------------------------------*/

    useEffect(()=>{
        (charactersListItems && charactersListItems.length > 0) ? setDummyCharacterList(charactersListItems) : setDummyCharacterList([]); 

    },[])

    useEffect(()=>{
        getFavouriteList(); 
    },[charactersListItems])

    useFocusEffect(useCallback(()=>{
        setLoader(true);
        getFavouriteList();
        setLoader(false);
    },[charactersListItems]));

    const getFavouriteList = () =>{
        if(charactersListItems && charactersListItems.length > 0){
            const getFavCharacterList = charactersListItems.filter((item)=> item.isFavorite);
            getFavCharacterList ? setCharacterList(getFavCharacterList) : setCharacterList([]);
        }
        else{
            setCharacterList([]);
        } 
    }
        /*---------------------------------------------------Render useEffect End------------------------------------------------------------------*/

        /*---------------------------------------------------Render Header Start------------------------------------------------------------------*/
      
        const onGoBack = () =>{
            dispatch(setCharacterListItems(dummycharactersList));
            props.navigation.goBack();
        }

        const renderHeader = () =>{
            return(
                    <AppHeader
                        onBackPress={() =>onGoBack() }
                        title={'Favourites'}
                        titleStyle={styles.headerStyle}
                        hideBackButton
                        rightIcon
                        cancel
                        onCancelPress={()=>onGoBack() }
                    />
                  
            )
        }
        /*---------------------------------------------------Render Header End------------------------------------------------------------------*/
    
    const renderCharacterList = () =>{
        return (<View>
            <FlatList
                data={charactersList}
                numColumns={2}
                initialNumToRender={10}
                onScroll={()=>Keyboard.dismiss()}
                extraData={charactersList}
                keyExtractor={(item, index) => (index % 2 != 0) ? `${item.char_id}_${index}` : null}
                renderItem={({ item, index }) => {
                    return (
                        <CharacterCard 
                        item={item} 
                        index={index} 
                        navigation={props.navigation}
                        onFavoriteClick={(selectedItem, selectedIndex, isFav)=>{
                                const obj = {...selectedItem, 'isFavorite': isFav};
                                charactersList.splice(selectedIndex, 1, obj);
                                dispatch(setCharacterListItems(charactersList));
                                setStateUpdater(!stateUpdater);
                                const getIndex = dummycharactersList.findIndex((character, idx)=> selectedItem.char_id == character.char_id);
                                if(getIndex != -1){
                                dummycharactersList.splice(getIndex, 1, obj);
                                }
                        }}/>
                    )
                }}
            />
        </View>
        )
    }

    
    /*---------------------------------------------------Render Empty Component Start------------------------------------------------------------------*/

    const renderEmptyView = () =>{
        return(
            <View style={styles.noResultContainer}>
                <Text style={styles.noResultText}>{'No favourite Character found'}</Text>
                <TouchableOpacity onPress={()=> onGoBack()}>
                <Text style={styles.tryAgainText}>{'Back to Home'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    /*---------------------------------------------------Render Empty Component End------------------------------------------------------------------*/


    return(
        <View style={{flex: 1, backgroundColor: appColors.secondaryBlack}}>
            {renderHeader()}
            {(charactersList.length > 0) ? renderCharacterList() : loading ? null : renderEmptyView()}
        </View>
    );
}

export default FavoriteList;

const styles = StyleSheet.create({
    noResultContainer: {
        marginTop: 35, 
        marginHorizontal: 20 
    },
    headerStyle: {
        fontSize: appFontSize.fontSize22, 
        color: appColors.green, 
        fontWeight: '700'
    },
    tryAgainText: {
        fontSize: appFontSize.fontSize18, 
        color: appColors.darkWhite,
        fontFamily: appFontFamily.robotoLight,
        paddingVertical: 8
    },
    noResultText: {
        fontSize: appFontSize.fontSize22, 
        color: appColors.green,
        fontFamily: appFontFamily.robotoLight
    }
})