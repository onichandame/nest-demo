import { Types } from "mongoose";

import { Org } from "./org";

type Document = { id: string };

const createUid = () => new Types.ObjectId().toHexString();

class Collection<Doc extends object> {
  private docs: (Doc & Document)[] = [];
  private getFilter(filter: Partial<Doc>) {
    return (doc: Doc) => {
      for (const key in filter) if (filter[key] !== doc[key]) return false;
      return true;
    };
  }
  create(args: Doc) {
    const id = createUid();
    const doc = { ...args, id };
    this.docs.push(doc);
    return doc;
  }
  find(filter: Partial<Doc>) {
    return this.docs.filter(this.getFilter(filter));
  }
  findOne(filter: Partial<Doc>) {
    return this.docs.find(this.getFilter(filter));
  }
  findById(id: string) {
    return this.docs.find((doc) => doc.id === id);
  }
}

class Database {
  private collections: { [key: string]: Collection<any> } = {};
  initCollection<Doc extends object>(name: string) {
    if (this.collections[name])
      throw new Error(`collection ${name} already exists`);
    this.collections[name] = new Collection<Doc>();
    return this.collections[name] as Collection<Doc>;
  }
  getCollection<Doc extends object>(name: string) {
    return this.collections[name] as Collection<Doc>;
  }
}

const db = new Database();
db.initCollection<Org>(`org`);

export { db, Org, Document };
