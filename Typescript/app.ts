interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

const a1: Animal = {
  type: "bird",
  flyingSpeed: 49389,
};
