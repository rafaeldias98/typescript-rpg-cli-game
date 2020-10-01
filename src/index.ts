import { cli } from 'cli-ux';
import Player from './entity/Player';

const wait = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

async function run() {
  const playerName = await cli.prompt('What is your name?');
  const player = new Player(playerName);
  cli.log(player.name);
}

run().catch(error => cli.error(error))
