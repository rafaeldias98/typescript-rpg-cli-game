import CharacterInterface from "./Character";
import WeaponInterface from "./Weapon";

export default interface CharacterWithWeaponInterface extends CharacterInterface {
  equippedWeapon: WeaponInterface | undefined;

  setEquippedWeapon(weapon: WeaponInterface): void;
}
