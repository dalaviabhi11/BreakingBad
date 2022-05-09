import * as type from '../../shared/constants/actionTypes';


export const setLoading = payload => {
  return {
    type: type.IS_LOADING,
    payload: payload,
  };
};

export const setCharacterListItems = payload => {
  return {
    type: type.CHARACTER_ITEMS,
    payload: payload,
  };
};

