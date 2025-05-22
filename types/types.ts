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
  Profile: undefined;
  Login: undefined;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  image?: string; 
}
