import { Event } from "nostr-tools";
import Realm from "realm";

export class Note extends Realm.Object<Event> {
  id: string;
  kind: number;
  tags: Realm.List<string[]>;
  content: string;
  created_at: number;
  pubkey: string;
  sig: string;

  static schema: Realm.ObjectSchema = {
    name: "Note",
    primaryKey: "id",
    properties: {
      id: "string",
      kind: "int",
      tags: { type: "list", objectType: "string" },
      content: "string",
      created_at: "int",
      pubkey: "string",
      sig: "string"
    }
  }
}