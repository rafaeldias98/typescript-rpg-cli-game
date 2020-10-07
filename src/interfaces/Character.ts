import { EventEmitter } from 'events';

export default interface CharacterInterface extends EventEmitter {
  name:   string;
  life:   number;
  coins:  number;
  damage: number;

  attack(opponent: CharacterInterface): void;
  updateLife(value: number): void;
}
