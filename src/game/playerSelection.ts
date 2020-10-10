import { cli } from "cli-ux";
import Archer from "../entities/characters/players/Archer";
import Warrior from "../entities/characters/players/Warrior";
import CharacterInterface from "../interfaces/Character";

export default class PlayerSelection {
  availablePlayers: CharacterInterface[];

  constructor() {
    this.availablePlayers = [new Warrior(), new Archer()];
  }

  async selectPlayer() {
    this.showPlayersTable();

    const playerId = await this.getPlayerIdToUseInGame();

    return this.availablePlayers[playerId];
  }

  private showPlayersTable() {
    let tableIndex = 1;
    cli.table(
      this.availablePlayers,
      {
        id: {
          header: 'ID',
          get: () => tableIndex++,
        },
        name: {
          get: (player: CharacterInterface) => player.name,
        },
        damage: {
          get: (player: CharacterInterface) => player.damage,
        },
        coins: {
          get: (player: CharacterInterface) => player.coins,
        },
      }
    );
  };

  async getPlayerIdToUseInGame(): Promise<number> {
    let playerId = 0;

    let idCollected = false;
    while (idCollected == false) {
      playerId = await cli.prompt('\n--> Choose the player ID to use in game');

      if (this.availablePlayers[playerId - 1] != undefined) {
        idCollected = true;
      } else {
        cli.info('You must select a valid player ID to use in game');
      }
    }

    return playerId - 1;
  }
}
