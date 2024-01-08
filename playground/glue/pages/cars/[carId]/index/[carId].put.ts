import {
  Fields,
  Types,
  isTypeOfRule,
  notBlankRule
} from "@antify/validate"

export type Input = {
  brand: string
  color: string
  model: string
  type: string
};
export const fields: Fields = {
  model: {
    readableName: 'Model',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule]
  },
  color: {
    readableName: 'Color',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule]
  },
  manufacturer: {
    readableName: 'Manufacturer',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule]
  },
  type: {
    readableName: 'Type',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule]
  }
}
