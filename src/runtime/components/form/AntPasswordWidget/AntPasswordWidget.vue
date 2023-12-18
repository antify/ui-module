<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AntPasswordField from './AntPasswordField.vue';
// import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { generateId } from '../../../utils/helper';

const emit = defineEmits([
  'update:password',
  'update:errorsPassword',
  'update:errorsPasswordRepeat',
]);

const props =
  defineProps<{
    id?: string;
    password: string;
    label?: string;
    repeatLabel?: string;
    placeholder?: string;
    repeatPlaceholder?: string;
    passwordValidator?: Function;
    passwordRepeatValidator?: Function;
    errorsPassword: string[];
    errorsPasswordRepeat: string[];
    description?: string;
    leadingIcon?: unknown;
    overlappingLabel?: boolean;
    showPassword?: boolean;
    isErrorPassword?: boolean;
    isErrorPasswordRepeat?: boolean;
  }>();

const _id = ref(props.id || generateId(40));

const _errorsPassword = computed<string[]>({
  get: () => {
    return props.errorsPassword;
  },
  set: (val) => {
    emit('update:errorsPassword', val);
  },
});
const _errorsPasswordRepeat = computed<string[]>({
  get: () => {
    return props.errorsPasswordRepeat;
  },
  set: (val) => {
    emit('update:errorsPasswordRepeat', val);
  },
});

const defaultPasswordValidator = (value: any) => {
  if (!value) {
    _errorsPassword.value = ['Password can not be empty.'];
    return;
  }

  if (value?.length < 8) {
    _errorsPassword.value = ['Min password length is 8 symbols'];
    return;
  }

  _errorsPassword.value = [];
};

const _passwordValidator = ref(
  props.passwordValidator || defaultPasswordValidator
);

const defaultPasswordRepeatValidator = (value: any) => {
  if (!value) {
    _errorsPasswordRepeat.value = ['Repeat password is required.'];
    return;
  }

  if (value !== _password.value) {
    _errorsPasswordRepeat.value = ['Passwords need to be equal'];
    return;
  }

  _errorsPasswordRepeat.value = [];
};

const _passwordRepeatValidator = ref(
  props.passwordRepeatValidator || defaultPasswordRepeatValidator
);

const repeatPassword = ref<string>('');

const _password = computed<string>({
  get: () => {
    return props.password;
  },
  set: (val) => {
    emit('update:password', val);
  },
});
</script>

<template>
  <div>
    <div class="mt-1 relative">
      <AntPasswordField
        v-model:password="_password"
        v-bind="$attrs"
        :id="_id"
        :label="label"
        :placeholder="placeholder"
        :leading-icon="leadingIcon"
        :overlapping-label="overlappingLabel"
        :show-password="showPassword"
        :description="description"
        :validator="_passwordValidator"
        :is_error="isErrorPassword"
        :errors="_errorsPassword"
      />

      <AntPasswordField
        v-model:password="repeatPassword"
        v-bind="$attrs"
        :id="`${_id}-password-repeat`"
        :label="repeatLabel"
        :placeholder="repeatPlaceholder"
        :leading-icon="leadingIcon"
        :overlapping-label="overlappingLabel"
        :show-password="showPassword"
        :description="description"
        :validator="_passwordRepeatValidator"
        :is_error="isErrorPasswordRepeat"
        :errors="_errorsPasswordRepeat"
      />
    </div>
  </div>
</template>
