import { spades, hearts, clubs, diamonds, kingBlack, queenBlack, jackBlack, jackRed, queenRed, kingRed, jokerRed, jokerBlack } from "assets";

export type Card = {
  number: string,
  name: string,
  color: 'black' | 'red'
  icon?: string,
  symbol?: string,
  illustration?: string,
  isDrawed: boolean,
  stack: number
}
export const cardsData: Card[] = [
  {
    number: 'A',
    name: 'Ace of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '2',
    name: '2 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '3',
    name: '3 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '4',
    name: '4 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '5',
    name: '5 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '6',
    name: '6 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '7',
    name: '7 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '8',
    name: '8 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '9',
    name: '9 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: '10',
    name: '10 of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'J',
    name: 'Jack of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    illustration: jackBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Q',
    name: 'Queen of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    illustration: queenBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'K',
    name: 'King of Spades',
    color: 'black',
    icon: spades,
    symbol: spades,
    illustration: kingBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'A',
    name: 'Ace of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '2',
    name: '2 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '3',
    name: '3 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '4',
    name: '4 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '5',
    name: '5 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '6',
    name: '6 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '7',
    name: '7 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '8',
    name: '8 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '9',
    name: '9 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '10',
    name: '10 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'J',
    name: 'Jack of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: jackRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Q',
    name: 'Queen of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: queenRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'K',
    name: 'King of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: kingRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'A',
    name: 'Ace of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '2',
    name: '2 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '3',
    name: '3 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '4',
    name: '4 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '5',
    name: '5 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '6',
    name: '6 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '7',
    name: '7 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '8',
    name: '8 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '9',
    name: '9 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: '10',
    name: '10 of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'J',
    name: 'Jack of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    illustration: jackBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Q',
    name: 'Queen of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    illustration: queenBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'K',
    name: 'King of Clubs',
    color: 'black',
    icon: clubs,
    symbol: clubs,
    illustration: kingBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'A',
    name: 'Ace of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '2',
    name: '2 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '3',
    name: '3 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '4',
    name: '4 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '5',
    name: '5 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '6',
    name: '6 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '7',
    name: '7 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '8',
    name: '8 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '9',
    name: '9 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: '10',
    name: '10 of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'J',
    name: 'Jack of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: jackRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Q',
    name: 'Queen of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: queenRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'K',
    name: 'King of Hearts',
    color: 'red',
    icon: hearts,
    symbol: hearts,
    illustration: kingRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'A',
    name: 'Ace of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '2',
    name: '2 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '3',
    name: '3 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '4',
    name: '4 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '5',
    name: '5 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '6',
    name: '6 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '7',
    name: '7 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '8',
    name: '8 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '9',
    name: '9 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: '10',
    name: '10 of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'J',
    name: 'Jack of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    illustration: jackRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Q',
    name: 'Queen of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    illustration: queenRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'K',
    name: 'King of Diamonds',
    color: 'red',
    icon: diamonds,
    symbol: diamonds,
    illustration: kingRed,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Joker',
    name: 'Joker',
    color: 'black',
    illustration: jokerBlack,
    isDrawed: false,
    stack: 0
  },
  {
    number: 'Joker',
    name: 'Joker',
    color: 'red',
    illustration: jokerRed,
    isDrawed: false,
    stack: 0
  },
]