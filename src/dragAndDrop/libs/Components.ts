// components/index.tsx
import Button from '../UIComps/Button'
import Card from "../UIComps/Card";
import Image from "../UIComps/Image";
import Text from "../UIComps/Text";

// Return an array of component metadata
export const componentList = [
  { id: "btn_1", type: "button", name: "Button", component: Button },
  { id: "crd_1", type: "card", name: "Card", component: Card },
  { id: "image_1", type: "image", name: "Image", component: Image },
  { id: "chk_1", type: "text", name: "Text", component: Text },
];

// Optionally export a helper function
export function getAllComponents() {
  return componentList;
}

export const componentRegistry = Object.fromEntries(
  componentList.map((c) => [c.type, c.component])
);