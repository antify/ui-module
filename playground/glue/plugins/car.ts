import {
  Types,
  isTypeOfRule,
  notBlankRule,
  useValidator
} from "@antify/validate"

export type Car = {
  id: string | null
  model: string | null
  manufacturer: string | null
  type: string | null
  color: string | null
  engine: {
    type: string | null
    volumeInLiter: number | null
    powerPs: number | null
  }
};

// TODO:: Fix type
export const validator = useValidator<Car>({
  model: {
    readableName: 'Model',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule],
    group: 'mainData'
  },
  color: {
    readableName: 'Color',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule],
    group: 'mainData'
  },
  manufacturer: {
    readableName: 'Manufacturer',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule],
    group: 'mainData'
  },
  type: {
    readableName: 'Type',
    rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule],
    group: 'mainData'
  },
  engine: {
    type: {
      readableName: 'Type',
      rules: [(val: any) => isTypeOfRule(val, Types.STRING), notBlankRule],
      group: 'engine'
    },
    volumeInLiter: {
      readableName: 'Volume',
      rules: [(val: any) => isTypeOfRule(val, Types.NUMBER)],
      group: 'engine'
    },
    powerPs: {
      readableName: 'Power',
      rules: [(val: any) => isTypeOfRule(val, Types.NUMBER)],
      group: 'engine'
    }
  }
});
