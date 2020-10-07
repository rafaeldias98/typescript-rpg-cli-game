import CharacterWithWeapon from "../CharacterWithWeapon";
import Knife from "../../weapons/Knife";

export default class Orc extends CharacterWithWeapon {
  constructor() {
    super('Orc', 50, 20, 4);
    this.setEquippedWeapon(new Knife());
  }
}
