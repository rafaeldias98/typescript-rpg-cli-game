import { cli } from "cli-ux";
import BuyableItem from "../interfaces/BuyableItem";
import WeaponInterface from "../interfaces/Weapon";
import Knife from "../entities/weapons/Knife";
import Sword from "../entities/weapons/Sword";

export default class Shop {
  availableWeapons: WeaponInterface[];

  constructor() {
    this.availableWeapons = [new Knife(), new Sword()];
  }

  async showWeaponsPurchaseMenu(): Promise<WeaponInterface | null> {
    this.showItemsTable(
      this.availableWeapons,
      {
        name: {
          get: (weapon: WeaponInterface) => weapon.name,
        },
        damage: {
          get: (weapon: WeaponInterface) => weapon.damage,
        },
      }
    );

    const input = await cli.confirm('Do you want to buy some weapon? [yes or no]');

    if (input == false) {
      return null;
    }

    const weaponId = await this.getItemIdToBuy(this.availableWeapons);
    return this.availableWeapons[weaponId];
  }

  private showItemsTable(items: BuyableItem[], extraColumns: any = {}): void {
    let tableIndex = 1;
    cli.table(
      items,
      {
        id: {
          header: 'ID',
          get: () => tableIndex++,
        },
        ...extraColumns,
        price: {
          get: (item: BuyableItem) => item.price,
        },
      }
    );
  };

  private async getItemIdToBuy(items: BuyableItem[]): Promise<number> {
    let itemId = 0;

    let idCollected = false;
    while (idCollected == false) {
      itemId = await cli.prompt('\n--> Choose the item ID to buy');

      if (items[itemId - 1] != undefined) {
        idCollected = true;
      } else {
        cli.info('You must select a valid item ID to buy');
      }
    }

    return itemId - 1;
  }
}
