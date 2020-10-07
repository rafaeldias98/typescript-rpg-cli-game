import { cli } from "cli-ux";
import CharacterInterface from "../interfaces/Character";

export default class Battle {
  player: CharacterInterface;
  monsters: CharacterInterface[];

  constructor(player: CharacterInterface, monsters: CharacterInterface[]) {
    this.player = player;
    this.monsters = monsters;
  }

  async run() {
    cli.warn(`### You will battle with ${this.monsters.length} monsters ###`);

    this.player.on('characterDied', () => {
      cli.warn('YOU DIED!');
      process.exit(0);
    });

    this.monsters.forEach(monster => { 
      monster.on('characterDied', (deadMonster: CharacterInterface) => {
        cli.warn(`${deadMonster.name.toUpperCase()} DIED!`);
        const monsterId = this.monsters.findIndex(monster => {
          return monster.life === deadMonster.life
        });

        this.monsters.splice(monsterId, 1);
      });
    });

    let battleFinished = false;
    let battleRound = 1;
    while (battleFinished == false) {
      cli.info(`\n=== Round ${battleRound} started ===`);
      this.showMonstersTable();

      cli.info('>>> Your turn started <<<');
      const monsterId = await this.getMonsterIdToAttack();
      const opponent = this.monsters[monsterId];
      this.executeAttack(this.player, opponent);
      cli.info('\n>>> Your turn finished <<<');

      if (this.monsters.length == 0) {
        battleFinished = true;
        break;
      }

      cli.info('\n>>> Monsters turn started <<<');
      this.monsters.forEach(monster => { 
        this.executeAttack(monster, this.player);
      });
      cli.info('\n>>> Monsters turn finished <<<');

      cli.info(`\n=== Round ${battleRound} finished ===`);
      battleRound++;
    }

    cli.info('### Battle finished ###');
  }

  showMonstersTable(): void {
    let tableIndex = 1;
    cli.table(
      this.monsters,
      {
        id: {
          header: 'ID',
          get: () => tableIndex++,
        },
        name: {
          get: (monster: CharacterInterface) => monster.name,
        },
        life: {
          get: (monster: CharacterInterface) => monster.life,
        },
      }
    );
  }

  async getMonsterIdToAttack(): Promise<number> {
    let monsterId = 0;

    let idCollected = false;
    while (idCollected == false) {
      monsterId = await cli.prompt('\n--> Choose the monster ID to attack');

      if (this.monsters[monsterId - 1] != undefined) {
        idCollected = true;
      } else {
        cli.info('You must select a valid monster ID to attack');
      }
    }

    return monsterId - 1;
  }

  executeAttack(
    attackerCharacter: CharacterInterface,
    attackedCharacter: CharacterInterface
  ): void {
    cli.info(`\n=== ${attackerCharacter.name} attacking ${attackedCharacter.name} ===`);
    attackerCharacter.attack(attackedCharacter);

    if (attackedCharacter.life > 0) {
      cli.info(`The ${attackedCharacter.name}'s life is now ${attackedCharacter.life}`);
    }
  }
}
