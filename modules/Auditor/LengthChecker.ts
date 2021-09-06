export type PossibleLengths = 'one' | 'zero' | 'moreThanOne' | 'moreThanZero'

export default class LengthChecker {
  private static checkers = {
    one: (length: number) : boolean => length === 1,
    zero: (length: number) : boolean => length === 0,
    moreThanOne: (length: number) : boolean => length > 1,
    moreThanZero: (length: number) : boolean => length > 0
  };

  static check(expect: PossibleLengths, length: number) {
    return LengthChecker.checkers[expect](length);
  }
}
