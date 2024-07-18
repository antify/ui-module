import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import {BaseInputType} from '../__types/AntBaseInput.type';
import AntBaseInput from '../AntBaseInput.vue';
import AntButton from '../../../buttons/AntButton.vue';
import AntIcon from '../../../AntIcon.vue';
import {Grouped as _Grouped} from '../../../../enums/Grouped.enum';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';
import {computed, reactive} from 'vue';
import {faSearch, faEye} from '@fortawesome/free-solid-svg-icons';
import {InputState} from '../../../../enums';

const meta: Meta<typeof AntBaseInput> = {
  title: 'Components/Forms/Elements/Base Input',
  component: AntBaseInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    value: {
      control: {type: 'text'},
      table: {type: {summary: 'string|number|null'}},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(BaseInputType),
      table: {defaultValue: {summary: BaseInputType.text}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      control: 'text',
      table: {defaultValue: {summary: 'this.label'}},
    },
    grouped: {
      control: {type: 'select'},
      options: Object.values(_Grouped),
      description: 'Where is this fields position in a group',
      table: {defaultValue: {summary: _Grouped.none}},
    },
    wrapperClass: {
      control: 'text',
      description:
        'Class for the first element because the attribute "class" would affect the input element.',
      table: {type: {summary: 'string|object'}},
    },
    showIcon: {
      control: 'boolean',
      description:
        'Some InputStates can have an icon. Control with this property if it gets shown or not.',
    },
    iconLeft: {
      control: {type: 'none'},
      description:
        'Will be displayed left to the input text.<br>Use Font-awesome Icons.',
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntBaseInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntBaseInput},
    setup: () => {
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, validator};
    },
    template: `
      <AntBaseInput
        v-bind="args"
        v-model:value="args.value"
        :has-errors="typeof args.hasErrors === 'boolean' ? args.hasErrors : validator.hasErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    value: null,
    placeholder: 'Placeholder'
  },
};

export const withValidator: Story = {
  render: (args) => ({
    components: {AntBaseInput},
    setup: () => {
      setTimeout(() => { args.skeleton = false; }, 1000);
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, validator};
    },
    template: `
      <AntBaseInput
        v-bind="args"
        v-model:value="args.value"
        :has-errors="typeof args.hasErrors === 'boolean' ? args.hasErrors : validator.hasErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    ...Docs.args,
    value: null,
    skeleton: true,
  },
};

export const IconLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faSearch,
  },
};

export const IconRight: Story = {
  render: (args) => ({
    components: {AntBaseInput, AntIcon},
    setup: () => {
      const value = computed({
        // @ts-ignore
        get: () => args.value,
        // @ts-ignore
        set: (val) => args.value = val
      });

      return {args, value, faEye};
    },
    template: `
      <AntBaseInput
        v-bind="args"
        v-model:value="args.value"
      >
        <template #icon-right>
          <AntIcon :icon="faEye" />
        </template>
      </AntBaseInput>`,
  }),
  args: {
    ...Docs.args
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: (args) => ({
    components: {AntBaseInput, AntButton},
    setup: () => {
      const value = computed({
        // @ts-ignore
        get: () => args.value,
        // @ts-ignore
        set: (val) => args.value = val
      });

      return {args, value, faSearch};
    },
    template: `
      <div class="p-4 pb-10 flex flex-col gap-2">
        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" state="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" state="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" state="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" state="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" state="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" value="A value" nullable state="base"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="info"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="success"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="warning"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" state="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" state="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" state="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" state="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" state="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" state="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" state="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" state="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" state="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" state="danger"/>
        </div>

        <div class="flex gap-[-2px]">
          <AntBaseInput v-bind="args" v-model:value="value" grouped="left"/>
          <AntBaseInput v-bind="args" v-model:value="value" grouped="center" state="danger"/>
          <AntBaseInput v-bind="args" v-model:value="value" grouped="right" state="info"/>
        </div>
      </div>`,
  }),
  args: {
    value: '',
    placeholder: 'Placeholder'
  },
};
