import AntLoginWidget from '../AntLoginWidget.vue';
import AntInput from '../../AntInput.vue';
import AntPasswordField from '../../AntPasswordWidget/AntPasswordField.vue';
import AntButton from '../../AntButton.vue';
import { ref } from 'vue';

export default {
  title: 'Components/Forms/Ant Login Widget',
  component: AntLoginWidget,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    args: {
      description:
        'Additional attributes will be forwarded to the form. This way you can access the default form events. This is also how you set the @submit handler.',
    },
    errors: {
      description: 'List of errors',
      table: { type: { summary: 'string[]' }, defaultValue: { summary: '[]' } },
    },
    emailField: {
      description: 'Slot for Login/Name Input',
      table: { type: { summary: 'HTML' } },
    },
    beforeSubmit: {
      description:
        'Slot between form and button (can be used for "Forgot password" link)',
      table: { type: { summary: 'HTML' } },
    },
    passwordField: {
      description: 'Slot for password input',
      table: { type: { summary: 'HTML' } },
    },
    submitButton: {
      description: 'Slot for button.',
      table: {
        type: { summary: 'HTML' },
        defaultValue: {
          summary: 'Button',
          detail: 'Default "Sign in" button with submit logic.',
        },
      },
    },
    error: {
      description:
        'Slot for overwriting the error style. Gets the error to display.',
      table: { type: { summary: 'HTML|string' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntLoginWidget, AntInput, AntPasswordField, AntButton },
  setup() {
    const formData = ref({
      email: '',
      password: '',
    });
    return { args, formData };
  },
  template: `
  <div class="m-2">
    <AntLoginWidget v-bind="args">
      <template #emailField>
        <div data-cy="email">
          <AntInput
            v-model:value="formData.email"
            id="adminadntloginid"
            class="rounded-none relative rounded-t-md focus:z-10"
            placeholder="Email"
          />
        </div>
      </template>

      <template #passwordField>
        <div data-cy="password">
          <AntPasswordField
            v-model:password="formData.password"
            class="rounded-none rounded-b-md focus:z-10"
            id="password-input-login-page"
            placeholder="password"
            :show-password="true"
          />
        </div>
      </template>
    </AntLoginWidget>
  </div>`,
});

export const WithErrors = (args: any) => ({
  components: { AntLoginWidget, AntInput, AntPasswordField, AntButton },
  setup() {
    const formData = ref({
      email: 'test@gmailde',
      password: '',
    });

    const errors = ['E-Mail is not valid', 'Password can not be empty'];

    return { args, formData, errors };
  },
  template: `
  <div class="m-2">
    <AntLoginWidget v-bind="args" :errors="errors">
      <template #emailField>
        <div data-cy="email">
          <AntInput
            v-model:value="formData.email"
            id="adminadntloginid"
            class="rounded-none relative rounded-t-md focus:z-10"
            placeholder="Email"
            :is-error="true"
          />
        </div>
      </template>

      <template #passwordField>
        <div data-cy="password">
          <AntPasswordField
            v-model:password="formData.password"
            class="rounded-none rounded-b-md focus:z-10"
            id="password-input-login-page"
            placeholder="password"
            :show-password="true"
            :is-error="true"
          />
        </div>
      </template>
    </AntLoginWidget>
  </div>`,
});
