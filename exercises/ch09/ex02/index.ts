export class C {
  value: number;
  constructor() {
    this.value = 0;
  }

  get x() {
    return this.value++;
  }
}
