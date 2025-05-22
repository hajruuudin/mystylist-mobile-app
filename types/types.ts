export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Item: undefined;
  ItemOverview: {itemId: string}
  ItemAdd: undefined;
  Outfit: undefined;
  OutfitOverview: {outfitId: string};
  OutfitAdd: undefined;
  Profile: undefined;
  Login: undefined;
}

export interface ItemShorthand {
  id: string;
  name: string;
  category: string;
  image?: string; 
}

export interface Item {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  color?: string;
  size?: string;
  brand?: string;
  material?: string;
  purchaseDate?: string;
  price?: number;
}

export interface OutfitShorthand {
  id: string;
  name: string;
  category: string;
  image?: string; 
}

export interface Outfit {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  season?: string;
  occasion?: string;
  style?: string;
  items?: string[];
  createdAt?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

