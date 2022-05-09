import * as type from '../../shared/constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  charactersItemList: [],
};
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.IS_LOADING:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case type.CHARACTER_ITEMS:
      return {
        ...state,
        charactersItemList: action.payload,
      };
    default:
      return state;
  }
};
