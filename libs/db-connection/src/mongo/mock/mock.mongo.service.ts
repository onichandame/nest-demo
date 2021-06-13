import {Injectable,OnApplicationBootstrap  } from "@nestjs/common";
import {MongoMemoryReplSet  } from "mongodb-memory-server";

@Injectable()
export class MockMongoService implements OnApplicationBootstrap{
  let db:MongoMemoryReplSet

  startReplSet(){
  }
  onApplicationBootstrap(){
  }
}
