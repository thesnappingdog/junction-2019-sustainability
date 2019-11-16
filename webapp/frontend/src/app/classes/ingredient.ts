export class Ingredient {
  public name: string;
  public unit: string;
  public quantity: number;

  constructor( name: string, unit: string, quantity: any ) {
    this.name = name;
    this.unit = unit;
    this.quantity = quantity;
  }

  static fromJSON(obj) {
    // TODO
    return new Ingredient('potato', 'kg', 1);
  }
}