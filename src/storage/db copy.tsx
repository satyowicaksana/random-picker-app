import 'react'
import Dexie from 'dexie'
import { ListType } from 'interfaces/list';

class IndexedDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  lists: Dexie.Table<ListType, number>; // number = type of the primkey
  //...other tables goes here...

  constructor () {
    super("db");
    this.version(1).stores({
      lists: '++id,name,items'
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.lists = this.table("lists");
  }
}

export default new IndexedDatabase()