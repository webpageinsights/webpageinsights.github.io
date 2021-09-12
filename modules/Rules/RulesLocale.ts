import {AttributeRule} from '~/modules/Rules/Rules'

declare type RulesLocale = {
  "head": {
    "any:danger": string;
    "none:danger": string;
    "one:danger": string;
    "some:danger": string;
    "any:warning": string;
    "none:warning": string;
    "one:warning": string;
    "some:warning": string;
    "any:info": string;
    "none:info": string;
    "one:info": string;
    "some:info": string;
  }
  "attribute": string;
  "method": {
    [key in AttributeRule['method']]: string;
  }
}

export default RulesLocale;
