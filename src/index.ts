import { cli } from 'cli-ux';
import Goblin from './entities/characters/monsters/Goblin';
import Warrior from './entities/characters/players/Warrior';
import Battle from './game/battle';

async function runGame() {
  const player = new Warrior();
  const monsters = [new Goblin(), new Goblin(), new Goblin()];

  const battle = new Battle(player, monsters);
  await battle.run();
};

runGame().catch(error => cli.error(error));
