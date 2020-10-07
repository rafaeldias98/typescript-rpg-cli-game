import BuyableItem from "./BuyableItem";

export default interface WeaponInterface extends BuyableItem {
  name:   string;
  damage: number;
}
