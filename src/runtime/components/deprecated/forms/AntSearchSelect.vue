<script lang="ts" setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {faArrowsUpDown, faCheck} from '@fortawesome/free-solid-svg-icons';
import {generateId} from '../../../utils/helper';
import AntSkeleton from '../../AntSkeleton.vue';
import {type SelectOption} from '../../form/__types';

const emit = defineEmits(['update:value', 'selectOption']);
const props =
  defineProps<{
    value: string;
    options: SelectOption[];
    id?: string;
    label?: string;
    description?: string;
    validator?: Function;
    errors?: string[];
    isError?: boolean;
    loading?: boolean;
  }>();

const _id = ref<string>(props.id || generateId(40));
const showOptions = ref<boolean>(false);
const filterValue = ref<string>('');
const currentActive = ref<number>(-1);
const listItems = ref<Array<any>>([]);

const filteredOptions = computed<SelectOption[]>(() => {
  return props.options.filter((option) => {
    if (_value.value) {
      return true;
    }
    return (
      option.label.toLowerCase().indexOf(filterValue.value.toLowerCase()) !== -1
    );
  });
});

const _value = computed<string>({
  get() {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});

function hideOnClick(event: Event) {
  if (
    (event?.target as Element).closest(`#${_id.value}-search-select`) === null
  ) {
    deFocusAllOptions();
    showOptions.value = false;
  }
}

function selectOption(option: SelectOption) {
  _value.value = option.value as string;
  filterValue.value = option.label;

  emit('selectOption', option);
}

function changeInput() {
  // unselect if there is something selected
  _value.value = '';

  // show options if not shown already
  showOptions.value = true;
}

function deFocusAllOptions() {
  currentActive.value = -1;
}

function setFocus(index: number) {
  if (filteredOptions.value.length > index && index >= 0) {
    currentActive.value = index;

    listItems.value[index].focus();
  }
}

function focusNext() {
  // show if not already shownAntSearchSelect
  showOptions.value = true;

  setTimeout(() => {
    let next = currentActive.value + 1;
    if (next >= filteredOptions.value.length) {
      next = 0;
    }
    // set focus to next element
    setFocus(next);
  }, 1);
}

function focusPrev() {
  // show if not already shown
  showOptions.value = true;

  setTimeout(() => {
    let next = currentActive.value - 1;
    if (next < 0) {
      next = filteredOptions.value.length - 1;
    }

    // set focus to next element
    setFocus(next);
  }, 1);
}

onMounted(() => {
  // if click on document defocus all and hide options
  document.addEventListener('click', hideOnClick);
});

onUnmounted(() => {
  document.removeEventListener('click', hideOnClick);
});
</script>

<template>
  <div v-if="!loading" :id="`${_id}-search-select`">
    <label
      v-if="label || $slots['label']"
      :for="_id"
      class="block text-sm font-medium text-gray-700"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="relative">
      <input
        v-model="filterValue"
        :id="_id"
        :aria-controls="`${_id}-options`"
        type="text"
        class="
          w-full
          rounded-md
          border
          bg-white
          py-2
          pl-3
          pr-12
          shadow-sm
          focus:outline-none
          focus:ring-1
          sm:text-sm
        "
        :class="{
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500':
            (errors && errors.length > 0) || isError,
          'border-gray-300 placeholder-gray-400 focus:border-primary focus:ring-primary':
            (!errors || errors.length === 0) && !isError,
        }"
        role="combobox"
        aria-expanded="false"
        v-bind="$attrs"
        @input="changeInput"
        @keydown.up.prevent="focusPrev"
        @keydown.down.prevent="focusNext"
        @focus="showOptions = true"
      />

      <button
        type="button"
        class="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          rounded-r-md
          px-2
          focus:outline-none
        "
        @click="showOptions = !showOptions"
      >
        <slot name="openIcon">
          <fa-icon :icon="faArrowsUpDown" class="h-5 w-5 text-gray-400"/>
        </slot>
      </button>

      <ul
        v-if="showOptions"
        class="
          absolute
          z-10
          mt-1
          max-h-60
          w-full
          overflow-auto
          rounded-md
          bg-white
          py-1
          text-base
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          sm:text-sm
        "
        :id="`${_id}-options`"
        role="listbox"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :key="`${_id}-${option.value}-${index}-option`"
          :ref="
            (el) => {
              listItems[index] = el;
            }
          "
          class="
            relative
            cursor-pointer
            select-none
            py-2
            pl-3
            pr-9
            text-gray-900
            transition-all
            duration-500
            focus:ring-2 focus:ring-primary
          "
          :class="{ 'bg-primary text-white': currentActive === index }"
          :id="`${_id}-${option.value}`"
          role="option"
          tabindex="-1"
          @click="selectOption(option)"
          @mouseenter="setFocus(index)"
          @mouseleave="deFocusAllOptions()"
          @keydown.up.prevent="focusPrev"
          @keydown.down.prevent="focusNext"
          @keydown.enter.prevent="selectOption(option)"
          @keydown.esc.prevent="showOptions = false"
        >
          <slot name="option" v-bind="{ option }">
            <span
              class="block truncate"
              :class="{ 'font-semibold': option.value === _value }"
            >
              {{ option.label }}
            </span>
          </slot>

          <span
            v-if="option.value === _value"
            class="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <slot name="selectedIcon">
              <fa-icon :icon="faCheck" class="h-5 w-5 text-primary"/>
            </slot>
          </span>
        </li>

        <li
          v-if="filteredOptions.length <= 0"
          class="relative cursor-default select-none py-2 pl-3 pr-9"
        >
          <span class="text-gray-400 text-xs">
            <slot name="emptyState">Try something different</slot>
          </span>
        </li>
      </ul>
    </div>

    <div
      v-if="description || (errors && errors.length > 0)"
      class="mt-1 text-sm text-gray-500"
      :id="`${_id}-description`"
    >
      <template v-if="errors && errors.length > 0">
        <slot name="errorList" v-bind="{ errors }">
          <div v-for="error in errors" class="text-red-600">{{ error }}</div>
        </slot>
      </template>

      <template v-else>
        <slot name="description">{{ description }}</slot>
      </template>
    </div>
  </div>

  <div v-else>
    <AntSkeleton
      :model-value="loading"
      v-if="label || $slots['label']"
      class="w-2/6 h-4 rounded-md mb-1"
    />

    <AntSkeleton
      :model-value="loading"
      class="w-full h-8 rounded-md"
    />

    <AntSkeleton
      :model-value="loading"
      v-if="description || $slots['description']"
      class="w-4/6 h-4 rounded-md mt-1"
    />
  </div>
</template>
