import AntInput from '../AntInput.vue';
import AntButton from '../AntButton.vue';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Ant Input',
  component: AntInput,
  parameters: { controls: { sort: 'requiredFirst' } },
  decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
  argTypes: {
    args: {
      description:
        'Additional attributes given to this will be forwarded to the input-field directly. For example if you want to react on the change-Event from the input you can just do so. See the "CustomEventHandlers" Example for details.',
    },
    id: {
      description: 'The ID for the input and label combination',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    value: {
      description: 'The reactive value of the input',
    },
    description: {
      description: 'The description for the input',
    },
    loading: {
      description: 'Will show a skeleten instead of the input field, if true.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    label: {
      description:
        'The main label for the input<br>can also be set via the named "label" slot',
      table: {
        type: {
          summary: 'HTML|String',
        },
      },
    },
    overlappingLabel: {
      description:
        'Changes the display style for the label to overlap the input field',
      table: { defaultValue: { summary: false } },
    },
    placeholder: {
      description:
        'Placeholder for the input field, "label" will be used if not provieded',
    },
    validator: {
      description:
        'A function that provides a validator. This validator is called on blur',
    },
    isError: {
      description:
        'Sets the error state of the input field without giving a list of errors.',
    },
    errors: {
      description: 'A list of error messages for the input field to display',
      table: { type: { summary: 'string[]' } },
    },
    type: {
      description: 'The input type',
      table: { defaultValue: { summary: '"text"' } },
    },
    default: {
      description:
        'Is used to add elements after the input field, see "Combine Elements"-example for mor info',
      table: {
        type: {
          summary: 'HTML',
        },
      },
    },
    errorIcon: {
      description:
        'Will be displayed if the rules give back false or a string.<br><a href="https://fontawesome.com/icons/circle-exclamation?s=solid" target="_blank">Link to default</a>',
      table: {
        defaultValue: {
          summary: 'faCircleExclamation',
        },
        type: {
          summary: 'HTML',
        },
      },
    },
    errorList: {
      description:
        'Overwrite for the default error list. Will only be displayed if there are errors. Will get the errors as param.',
      table: {
        defaultValue: {
          summary: 'HTML',
          detail: 'All errors small and red',
        },
        type: {
          summary: 'HTML',
        },
      },
    },
    leadingIcon: {
      description: 'Will be displayed inside of the input at the start.',
      table: {
        type: {
          summary: 'HTML',
        },
      },
    },
    focus: {
      description: 'Sets the input focus',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
};

const Template = (args: any) => ({
  components: { AntInput },
  setup() {
    const value = ref<string>('');

    return { args, value };
  },
  template: `
    <AntInput v-bind="args" v-model:value="value"/>
    <span class="text-xs text-gray-500">Reactive value: {{value}}</span>
`,
});

/**
 * Primary use of input field.
 */
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  id: 'input-id-123456789',
  value: '',
  label: 'Input',
  focus: true,
};

/**
 * use with description.
 */
export const WithDescription = Template.bind({});
// @ts-ignore
WithDescription.args = {
  id: 'input-id-123456789',
  value: '',
  description: 'This is an input field.',
  label: 'Input',
};

/**
 * use without label.
 */
export const NoLabel = Template.bind({});
// @ts-ignore
NoLabel.args = {
  id: 'input-id-123456789',
  value: '',
  placeholder: 'Placeholder',
};

/**
 * use with leading icon.
 */
export const LeadingIcon = Template.bind({});
// @ts-ignore
LeadingIcon.args = {
  id: 'email-123456789',
  value: '',
  label: 'E-Mail',
  placeholder: 'you@example.com',
  leadingIcon: faEnvelope,
};

/**
 * use with overlapping label.
 */
export const OverlappingLabel = Template.bind({});
// @ts-ignore
OverlappingLabel.args = {
  id: 'email-123456789',
  value: '',
  label: 'E-Mail',
  placeholder: 'you@example.com',
  overlappingLabel: true,
};

/**
 * use with leading Icon and overlapping label.
 */
export const LeadingIconAndOverlappingLabel = Template.bind({});
// @ts-ignore
LeadingIconAndOverlappingLabel.args = {
  id: 'email-123456789',
  value: '',
  label: 'E-Mail',
  placeholder: 'you@example.com',
  overlappingLabel: true,
  leadingIcon: faEnvelope,
};

/**
 * use with leading Icon and overlapping label.
 */
export const Disabled = Template.bind({});
// @ts-ignore
Disabled.args = {
  value: 'test@email.de',
  label: 'E-Mail',
  disabled: true,
};

/**
 * Validation Icon.
 */
export const Validated = (args: any) => ({
  components: { AntInput },
  setup() {
    const value = ref<string>('');

    args.id = 'input-id-987654321';
    args.value = 'test@test.de';
    args.label = 'Validated';
    args.validator = (value: any) => {
      if (!value) return ['value can not be empty'];
      if (value.length < 3) return ['value is to short'];
    };
    args.errors = ['value can not be empty'];

    return { args, value };
  },
  template: `
    <AntInput v-bind="args" v-model:value="value"/>
   
    <span class="text-xs text-gray-500">Reactive value: {{value}}</span>
  `,
});
// @ts-ignore
Validated.args = {
  id: 'input-id-987654321',
  value: 'test@test.de',
  label: 'Validated',
  validator: (value: any) => {
    console.log('value', value);
    if (!value) return ['value can not be empty'];
    if (value.length < 3) return ['value is to short'];
  },
  errors: ['value can not be empty'],
};

/**
 * Validation Icon.
 */
export const Loading = (args: any) => ({
  components: { AntInput },
  setup() {
    const value = ref<string>('');

    args.id = 'input-id-98765432146848';
    args.value = '';
    args.label = 'Loading';
    args.loading = true;

    return { args, value };
  },
  template: `
    <AntInput v-bind="args" v-model:value="value"/>
  `,
});

export const CustomEventHandlers = (args: any) => ({
  components: { AntInput },
  setup() {
    const value = ref('');
    args.label = 'Custom blur-event handler';
    args.placeholder = 'Edit me';
    args.description =
      'Adds to the default blur-event handler. Be carful with preventDefault because this could destroy the default behaviour of the component.';

    const input = (event: FocusEvent) => {
      window.alert('Hello World: ' + value.value);
    };

    return { args, input, value };
  },
  template: `<AntInput v-bind="args" v-model:value="value" @blur="input"/>`,
});

export const CombineElements = (args: any) => ({
  components: { AntInput, AntButton },
  setup() {
    const value = ref('');
    args.label = 'Combined';
    args.placeholder = 'Edit me';
    args.description = 'Adds a button on the end of the Input.';
    args.leadingIcon = faEnvelope;

    return { args, value };
  },
  template: `
    <AntInput v-bind="args" v-model:value="value" class="rounded-none rounded-bl-md rounded-tl-md">
      <AntButton label="Save" class="rounded-none rounded-br-md rounded-tr-md -ml-px w-20">
        <span class="w-full h-full flex justify-center items-center">Save</span>
      </AntButton>
    </AntInput>`,
});
