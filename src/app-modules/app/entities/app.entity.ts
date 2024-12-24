import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({
  tableName: 'app',
})
export class App {
  @PrimaryKey()
  id!: number;
}
