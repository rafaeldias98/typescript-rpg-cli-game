import CharacterInterface from "../../interfaces/Character";
import CharacterWithWeaponInterface from '../../interfaces/CharacterWithWeapon';
import WeaponInterface from "../../interfaces/Weapon";
import Character from './Character';

export default class CharacterWithWeapon extends Character implements CharacterWithWeaponInterface {
  equippedWeapon: WeaponInterface | undefined;

  setEquippedWeapon(weapon: WeaponInterface): void {
    this.equippedWeapon = weapon;
  }

  attack(opponent: CharacterInterface): void {
    let attackDamage  = this.damage;
    if (this.equippedWeapon) {
      attackDamage = this.equippedWeapon.damage;
    }

    opponent.updateLife(attackDamage * -1);
  }
}
