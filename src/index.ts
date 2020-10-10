import { cli } from 'cli-ux';
import Goblin from './entities/characters/monsters/Goblin';
import Battle from './game/battle';
import PlayerSelection from './game/playerSelection';

async function runGame() {
  const playerSelectionLayer = new PlayerSelection();
  const player = await playerSelectionLayer.selectPlayer();

  const monsters = [new Goblin(), new Goblin(), new Goblin()];

  const battleLayer = new Battle(player, monsters);
  await battleLayer.run();
};

runGame().catch(error => cli.error(error));
