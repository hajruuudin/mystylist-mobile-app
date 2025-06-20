export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Item: undefined;
  ItemOverview: {itemId: string}
  ItemAdd: {wardrobeId: string};
  Outfit: undefined;
  OutfitOverview: {outfitId: string};
  OutfitAdd: undefined;
  Wishlists: undefined;
  WishlistAdd: undefined;
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
  id?: string,
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
  wardrobeId?: string;
  userId?: string;
  createdAt?: Date
}

export interface OutfitShorthand {
  id: string;
  name: string;
  category: string;
  image?: string; 
}

export interface Outfit {
  id?: string;
  name: string;
  image?: string;
  description?: string;
  season?: string;
  occasion?: string;
  style?: string;
  items?: string[];
  createdAt?: Date
  userId?: string;
}

export interface User {
  id: string,
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Wardrobe {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  items: Item[];
  outfits: Outfit[]
}

export interface WishlistItem {
  id?: string;
  userId?: string;
  itemTitle?: string;
  itemCategory?: string;
  itemDescription?: string;
  itemPlacesToBuy?: string;
  createdAt?: Date;
}

export interface ImageFile {
  uri: string,
  name: string,
  type: string,
  base64: string
}