const getRandomHexOption = (options: (string | number)[]) => {
  return Math.floor(Math.random() * options.length);
};

export const getRandomHex = () => {
  let randomHexArr = [];
  const hexOptions: (string | number)[] = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  for (let i = 0; i < 6; i++) {
    randomHexArr.push(hexOptions[getRandomHexOption(hexOptions)]);
  }
  return randomHexArr.join("");
};
