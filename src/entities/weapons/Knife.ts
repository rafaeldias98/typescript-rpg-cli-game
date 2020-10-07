import WeaponInterface from "../../interfaces/Weapon";

export default class Knife implements WeaponInterface {
  name:   string;
  damage: number;
  price:  number;

  constructor() {
    this.name   = 'Metal Knife';
    this.damage = 5;
    this.price  = 100;
  }
}
