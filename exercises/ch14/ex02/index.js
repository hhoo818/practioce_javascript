export class MyArrayLike {
  constructor(length) {
    this.length = length;
    for (let i = 0; i < length; i++) {
      this[i] = undefined;
    }
  }

  static from(array) {
    const myArrayLike = new MyArrayLike(array.length);
    for (let i = 0; i < array.length; i++) {
      myArrayLike[i] = array[i];
    }
    return myArrayLike;
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  static get [Symbol.species]() {
    return MyArrayLike;
  }

  map(callback) {
    const mappedArray = super.map(callback);
    return MyArrayLike.from(mappedArray);
  }

  slice(...args) {
    const slicedArray = super.slice(...args);
    return MyArrayLike.from(slicedArray);
  }
}
