import AntButton from '../AntButton.vue';
import AntFormGroupLabel from '../../form/AntFormGroupLabel.vue';
import AntFormGroup from '../../form/AntFormGroup.vue';
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {Grouped as _Grouped} from '../../../enums/Grouped.enum';
import {ColorType} from '../../../enums';

const meta: Meta<typeof AntButton> = {
  component: AntButton,
    title: 'Components/Buttons/Button',
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        colorType: {
            control: {type: 'select'},
            options: Object.values(ColorType),
        },
        grouped: {
            control: {type: 'select'},
            options: Object.values(_Grouped),
            description: 'Where is this fields position in a group',
        },
        size: {
            control: {type: 'radio'},
            options: Object.values(Size),
            description: 'Defines the size of the button',
        },
        iconLeft: {
            control: {type: 'none'},
            description:
                'Will be displayed left to the label or the default slot.<br>Use Font-awesome Icons.',
        },
        iconRight: {
            control: {type: 'none'},
            description:
                'Will be displayed right to the label or the default slot.<br>Use Font-awesome Icons.',
        },
        to: {
            control: {type: 'RouteLocationRaw'},
            description: 'If provided transforms the button into an a-tag with the provided link. Style is still the same as a button.',
            table: {type: {summary: 'string|object'}}
        },
        submit: {
            description: 'Change the button type to type="submit"',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AntButton>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntButton},
        setup() {
            return {args};
        },
        template: '<AntButton v-bind="args">Button</AntButton>',
    }),
    args: {},
};

export const Filled: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        filled: true
    },
};

export const Link: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        to: '/example'
    },
};

// TODO:: merge icon variants together
export const Icons: Story = {
    render: (args) => ({
        components: {
          AntButton,
          AntFormGroup,
          AntFormGroupLabel
        },
        setup() {
            return {
              args,
              faCaretLeft,
              faCaretRight
            };
        },
        template: `
          <AntFormGroup>
            <AntFormGroupLabel>Icons only</AntFormGroupLabel>

            <AntFormGroup direction="row">
              <AntButton v-bind="args" :icon-left="faCaretLeft"></AntButton>
              <AntButton v-bind="args" :icon-right="faCaretRight"></AntButton>
              <AntButton v-bind="args" :icon-left="faCaretLeft" :icon-right="faCaretRight"></AntButton>
            </AntFormGroup>

            <AntFormGroupLabel>Icons with text</AntFormGroupLabel>

            <AntFormGroup direction="row">
              <AntButton v-bind="args" :icon-left="faCaretLeft">Button</AntButton>
              <AntButton v-bind="args" :icon-right="faCaretRight">Button</AntButton>
              <AntButton v-bind="args" :icon-left="faCaretLeft" :icon-right="faCaretRight">Button</AntButton>
            </AntFormGroup>
          </AntFormGroup>
        `,
    }),
};

export const Grouped: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        grouped: _Grouped.left,
    },
};

export const Skeleton: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        skeleton: true
    },
};

export const ReadOnly: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        readonly: true
    },
};

export const Expanded: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        expanded: true
    },
};

export const WithoutBorder: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        filled: true,
        outlined: false
    },
};

export const Summary: Story = {
  render: (args) => ({
    components: {
      AntButton,
      AntFormGroupLabel,
      AntFormGroup
    },
    setup() {
      return {args};
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <AntFormGroup>
          <AntFormGroupLabel class="text-xl">
            Grouped | Filled | Outlined combinations
          </AntFormGroupLabel>
          <div class="flex">
            <AntButton v-bind="args" color-type="base" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="base" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="base" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="base" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="primary" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="primary" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="primary" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="primary" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="secondary" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="secondary" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="secondary" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="secondary" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="success" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="success" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="success" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="success" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="info" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="info" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="info" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="info" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="warning" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="warning" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="warning" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="warning" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
          <div class="flex">
            <AntButton v-bind="args" color-type="danger" grouped="left" :filled="true" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="danger" grouped="center" :filled="false" :outlined="false">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="danger" grouped="center" :filled="true" :outlined="true">
              Button
            </AntButton>
            <AntButton v-bind="args" color-type="danger" grouped="right" :filled="false" :outlined="true">
              Button
            </AntButton>
          </div>
        </AntFormGroup>
        <AntFormGroup>
          <AntFormGroupLabel class="text-xl">
            Size
          </AntFormGroupLabel>
          <AntFormGroup direction="row">
            <AntButton v-bind="args" size="md">Button</AntButton>
            <AntButton v-bind="args" size="sm">Button</AntButton>
          </AntFormGroup>
        </AntFormGroup>
      </div>
    `,
  }),
  args: {
    iconLeft: faCaretLeft,
    iconRight: faCaretRight
  }
};
