import { LAMBDA_CHARS_MATCHER } from "../model/model";
import { flatten } from "../helpers/arrayHelpers";

const fullLambdaExpression = (lexeme: string) => 
  lexeme.match(LAMBDA_CHARS_MATCHER) ||
  lexeme.includes(' ');

export default (str: string): string[] => {
  // split on . and space but keep in matching group: positive lookbehind
  const intermediate = str.split(/(?<=[ .])/);
  return flatten(intermediate.map(lexeme => {
    // handle vars in omega combinator e.g. 'xx' in λx.xx
    if (!fullLambdaExpression(lexeme) && lexeme.length > 1) {
      return lexeme.split('');
    }
    return lexeme;
  }));
}
