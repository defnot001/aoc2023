import { Day, Util } from '../util';

export default class Day2 implements Day {
  private readonly MAX_VALUES = {
    red: 12,
    green: 13,
    blue: 14,
  } as const;

  public async part1(): Promise<void> {
    let possibleScore = 0;

    for (const line of await Util.readInputLines()) {
      const game = this.parseGame(line);
      let isPossible = true;

      for (const set of game.sets) {
        if (
          set.red > this.MAX_VALUES.red ||
          set.green > this.MAX_VALUES.green ||
          set.blue > this.MAX_VALUES.blue
        ) {
          isPossible = false;
          break;
        }
      }

      if (isPossible) {
        possibleScore += game.id;
      }
    }

    console.log(possibleScore);
  }
  public part2(): void {
    throw new Error('Method not implemented.');
  }

  private parseGame(str: string) {
    const idRegex: RegExp = /Game\s+(\d+):/;
    const colorRegex: RegExp = /(\d+)\s+(blue|red|green)/g;

    const idMatch = str.match(idRegex);

    if (!idMatch) {
      throw new Error(`Failed to find out the game ID for string: ${str}`);
    }

    const gameID = parseInt(idMatch[1], 10);

    const setStrings = str.split(': ')[1].split(';');

    const sets: Set[] = setStrings.map((setStr) => {
      let match;

      const set: Set = {
        red: 0,
        green: 0,
        blue: 0,
      };

      while ((match = colorRegex.exec(setStr.trim()))) {
        const count = parseInt(match[1], 10);
        const color = match[2];

        set[color as keyof Set] = count;
      }

      return set;
    });

    return {
      id: gameID,
      sets: sets,
    };
  }
}

type Game = {
  id: number;
  sets: Set[];
};

type Set = {
  red: number;
  green: number;
  blue: number;
};
