import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import {BaseInputType} from '../__types/AntBaseInput.type';
import AntBaseInput from '../AntBaseInput.vue';
import AntButton from '../../../buttons/AntButton.vue';
import {Grouped as _Grouped} from '../../../../enums/Grouped.enum';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';
import {computed, reactive} from 'vue';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {InputColorType} from '../../../../enums';
import AntTextInput from '../../AntTextInput.vue';

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
    colorType: {
      control: {type: 'select'},
      options: Object.values(InputColorType)
    },
    size: {
      control: {type: 'radio'},
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
        'Some InputColorTypes can have an icon. Control with this property if it gets shown or not.',
    },
    iconLeft: {
      control: {type: 'none'},
      description:
        'Will be displayed left to the input text.<br>Use Font-awesome Icons.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntBaseInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntBaseInput},
    setup: () => {
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]))

      return {args, validator}
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
      setTimeout(() => { args.skeleton = false }, 1000);
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]))

      return {args, validator}
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
    description: undefined,
  },
};

export const IconLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faSearch,
  },
};

export const Summary: Story = {
  render: (args) => ({
    components: {AntBaseInput, AntButton},
    setup: () => {
      const value = computed({
        // @ts-ignore
        get: () => args.value,
        // @ts-ignore
        set: (val) => args.value = val
      })

      return {args, value, faSearch}
    },
    template: `
      <div class="p-4 pb-10 flex flex-col gap-2">
        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" color-type="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" color-type="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" color-type="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" color-type="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" color-type="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" value="A value" nullable color-type="base"/>
          <AntBaseInput v-bind="args" value="A value" nullable color-type="info"/>
          <AntBaseInput v-bind="args" value="A value" nullable color-type="success"/>
          <AntBaseInput v-bind="args" value="A value" nullable color-type="warning"/>
          <AntBaseInput v-bind="args" value="A value" nullable color-type="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" color-type="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" color-type="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" color-type="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" color-type="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" :show-icon="false" color-type="danger"/>
        </div>

        <div class="flex gap-2">
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" color-type="base"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" color-type="info"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" color-type="success"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" color-type="warning"/>
          <AntBaseInput v-bind="args" v-model:value="value" :icon-left="faSearch" color-type="danger"/>
        </div>

        <div class="flex gap-[-2px]">
          <AntBaseInput v-bind="args" v-model:value="value" grouped="left"/>
          <AntBaseInput v-bind="args" v-model:value="value" grouped="center" color-type="danger"/>
          <AntBaseInput v-bind="args" v-model:value="value" grouped="right" color-type="info"/>
        </div>
      </div>`,
  }),
  args: {
    value: '',
    placeholder: 'Placeholder'
  },
};
