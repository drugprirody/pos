import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const isSidebarOpen = atomWithStorage("IS_SIDEBAR", true);
const selectedLanguage = atomWithStorage("LANGUAGE", "ru");

const atoms = {
  isSidebarOpen,
  selectedLanguage,
};

export default atoms;
