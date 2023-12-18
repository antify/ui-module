import AntRadio from '../AntRadio.vue';
import { ref } from 'vue';
import { InputColorType, Size } from "../../../../enums";
import { type AntRadioType } from "../__types/AntRadio.type";
import { type Meta, type StoryObj } from "@storybook/vue3";

const meta: Meta<typeof AntRadio> = {
  title: 'Components/Forms/Radio/Radio',
  component: AntRadio,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    modelValue: {
      table: {
        type: {
          summary: 'string | null'
        }
      }
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(InputColorType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntRadio>;

export const Docs: Story = {
  render: (args) => ({
    components: { AntRadio },
    setup() {
      const groupValue = ref<string>('t3');

      const radioValues = ref<AntRadioType[]>([
        {
          value: 't1',
          label: 'Test 1'
        }, {
          value: 't2',
          label: 'Test 2'
        }, {
          value: 't3',
          label: 'Test 3'
        }, {
          value: 't4',
          label: 'Test 4'
        }, {
          value: 't5',
          label: 'Test 5'
        }
      ]);

      return { args, groupValue, radioValues };
    },
    template: `
    <div class="m-2 flex gap-2">
      <AntRadio v-for="value in radioValues" v-bind="args" :value="value" v-model="groupValue"/>
    </div>
  `,
  }),
  args: {
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. '
  }
}

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  }
};

export const Loading: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true
  }
}
