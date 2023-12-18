import AntPasswordWidget from '../AntPasswordWidget.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Password/Ant Password Widget',
  component: AntPasswordWidget,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    args: {
      description:
        'Additional attributes will be forwarded to all password fields. This way you can access the default input-field events.',
    },
    password: {
      description: 'Reactive value for password field',
    },
    showPassword: {
      description:
        'Defines if the eye to show or hide the password should be displayed.',
      table: { defaultValue: { summary: 'false' } },
    },
    description: {
      description: 'Description text',
    },
    id: {
      description: 'The ID for the input and label combination',
      table: {
        defaultValue: { summary: 'UUID', detail: 'A randomly generated UUID' },
      },
    },
    label: {
      description: 'The main label of the password field',
    },
    repeatLabel: {
      description: 'The main label of the repeat password field',
    },
    leadingIcon: {
      description: 'Can be used to display an Icon inside the password field.',
      table: {
        type: {
          summary: 'IconDefinition',
          detail: 'A fontAwesome icon definition',
        },
      },
    },
    overlappingLabel: {
      description: 'Changes the style of the label',
      table: {
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      description:
        'Placeholder for the password field, "label" will be used if not provieded',
    },
    repeatPlaceholder: {
      description:
        'Placeholder for the repeat password field, "repeatLabel" will be used if not provieded',
    },
    passwordValidator: {
      description:
        'A function that provides a validator. This validator is called on blur',
      table: {
        defaultValue: {
          summary: 'Function',
          detail:
            'Default rules contain a "must not be empty"-Rule and a "Min password length is 8 symbols"-Rule',
        },
      },
    },
    isErrorPassword: {
      description:
        'Sets the error state of the input field without giving a list of errors.',
    },
    isErrorPasswordRepeat: {
      description:
        'Sets the error state of the input field without giving a list of errors.',
    },
    errorsPassword: {
      description: 'A list of error messages for the input field to display',
      table: { type: { summary: 'string[]' } },
    },
    errorsPasswordRepeat: {
      description: 'A list of error messages for the input field to display',
      table: { type: { summary: 'string[]' } },
    },
    passwordRepeatValidator: {
      description:
        'A function that provides a validator. This validator is called on blur',
      table: {
        defaultValue: {
          summary: 'Function',
          detail:
            'Default rules contain a "must not be empty"-Rule and a "Passwords need to be equal"-Rule',
        },
      },
    },
  },
};

const Template = (args: any) => ({
  components: { AntPasswordWidget },
  setup() {
    const password = ref<string>('');
    const errorsPassword = ref<string[]>([]);
    const errorsPasswordRepeat = ref<string[]>([]);

    return { args, password, errorsPassword, errorsPasswordRepeat };
  },
  template: `
    <div class="m-2">
      <AntPasswordWidget
        v-bind="args" 
        v-model:password="password"
        v-model:errorsPassword="errorsPassword"
        v-model:errorsPasswordRepeat="errorsPasswordRepeat"
      />
    </div>`,
});

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  id: 'input-id-123456789',
  label: 'Password',
  repeatLabel: 'Repeat password',
  placeholder: 'Password placeholder',
  repeatPlaceholder: 'Repeat password placeholder',
  showPassword: true,
};
