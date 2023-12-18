import AntIcon from '../AntIcon.vue';
import { type Meta, type StoryObj } from "@storybook/vue3";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { IconColorType, IconSize } from "../__types/AntIcon.types";

const meta: Meta<typeof AntIcon> = {
  title: 'Components/Icon',
  component: AntIcon,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: Object.values(IconSize),
    },
    colorType: {
      control: { type: 'select' },
      options: Object.values(IconColorType)
    },
    icon: {
      control: { type: 'none' },
      description:
        'Use Font-awesome Icons.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntIcon>;

export const Docs: Story = {
  render: (args) => ({
    components: { AntIcon },
    setup() {
      function logClick() {
        console.log("Clicked close icon")
      }

      return { args, logClick };
    },
    template: '<AntIcon v-bind="args" @close="logClick">Tag</AntIcon>',
  }),
  args: {
    icon: faTag,
  },
};
export const small: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    size: IconSize.sm,
  },
};
export const large: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    size: IconSize.xl3,
  },
};
export const colors: Story = {
  render: (args) => ({
    components: { AntIcon },
    setup() {
      return { args, IconColorType };
    },
    template: `
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.base">Tag</AntIcon>
        <span>base</span>
      </div>
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.primary">Tag</AntIcon>
        <span>primary</span>
      </div>
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.secondary">Tag</AntIcon>
        <span>secondary</span>
      </div>
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.danger">Tag</AntIcon>
        <span>danger</span>
      </div>
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.info">Tag</AntIcon>
        <span>info</span>
      </div>
      <div class="flex items-center gap-1.5">
        <AntIcon v-bind="args" :color-type="IconColorType.success">Tag</AntIcon>
        <span>success</span>
      </div>
    `,
  }),
  args: {
    icon: faTag,
  },
};
