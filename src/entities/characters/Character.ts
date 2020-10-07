import { EventEmitter } from 'events';
import CharacterInterface from "../../interfaces/Character";

const MAX_LIFE = 100;
const MIN_LIFE = 1;

export default class Character extends EventEmitter implements CharacterInterface {
  name:   string;
  life:   number;
  coins:  number;
  damage: number;

  constructor(name: string, life: number, coins: number, damage: number) {
    super();

    this.name   = name;
    this.life   = life;
    this.coins  = coins;
    this.damage = damage;
  }

  attack(opponent: CharacterInterface): void {
    opponent.updateLife(this.damage * -1);
  }

  updateLife(value: number): void {
    this.life += value;

    if (this.life > MAX_LIFE) {
      this.life = MAX_LIFE;
    }

    if (this.life < MIN_LIFE) {
      this.emit('characterDied', this);
    }
  }
}
