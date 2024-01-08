import {
  type Fields,
  Types,
  isTypeOfRule,
  notBlankRule
} from "@antify/validate"

export type Input = {
  type: string,
  volumeInLiter: number,
  powerPs: number,
};
export const fields: Fields = {
  type: {
    readableName: 'Type',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule]
  },
  volumeInLiter: {
    readableName: 'Volume',
    rules: [(val: any) => isTypeOfRule(val, Types.NUMBER)]
  },
  powerPs: {
    readableName: 'Power',
    rules: [(val: any) => isTypeOfRule(val, Types.NUMBER)]
  }
}
