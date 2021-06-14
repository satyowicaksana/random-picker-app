const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomizer = {
  getRandomInteger
}

export default randomizer