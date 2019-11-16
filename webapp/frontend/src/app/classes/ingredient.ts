export class Ingredient {
  public name: string;
  public id?: string;
  public type?: string;
  public amount?: number;
  public unit?: string;

  constructor (
    name: string,
    id: any,
    type: any,
    amount: any,
    unit: string,
  ) {
    this.name = name.trim();
    this.id = id ? id.toString() : null;
    this.type = type ? type.toString() : null;
    this.amount = amount ? Number(amount) : null;
    this.unit = unit;
  }

  static fromName(name: string) {
    return new Ingredient(name, null, null, null, null);
  }

  static fromJSON(obj: any) {
    return new Ingredient(
      obj['name'],
      obj['id'] || null,
      obj['type'] || null,
      obj['amount'] || null,
      obj['unit'] || null,
    );
  }
}