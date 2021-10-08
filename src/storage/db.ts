import Dexie from 'dexie'
import { ListType } from 'interfaces/list';
import { WheelFormType } from 'interfaces/wheel';

class IndexedDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  lists: Dexie.Table<ListType, number>; // number = type of the primkey
  wheelForm: Dexie.Table<WheelFormType, number>; // number = type of the primkey
  //...other tables goes here...

  constructor () {
    super("db");
    this.version(1).stores({
      lists: '++id,name,items',
      wheelForm: '++id,names'
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.lists = this.table("lists");
    this.wheelForm = this.table("wheelForm");
  }
}

export default new IndexedDatabase()