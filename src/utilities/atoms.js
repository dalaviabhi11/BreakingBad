import { atom } from 'jotai';

export const isNewUserAtom = atom(false);
export const userInfoAtom = atom({});
export const locationAtom = atom({});
export const phoneNumberAtom = atom('');
export const maskedPhoneNumberAtom = atom('');
export const userProfilePicAtom = atom('');
export const tokenDataAtom = atom('');
export const sellTabIndexAtom = atom(0);
export const showProductCardTooltipAtom = atom(false);
export const selectedsortOptionAtom = atom(null);
export const isLoggedInBeforeAtom = atom(null);