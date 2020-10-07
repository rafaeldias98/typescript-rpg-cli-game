import WeaponInterface from "../../interfaces/Weapon";

export default class Sword implements WeaponInterface {
  name:   string;
  damage: number;
  price:  number;

  constructor() {
    this.name   = 'Metal Sword';
    this.damage = 10;
    this.price  = 300;
  }
}
