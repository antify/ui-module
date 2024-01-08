<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ROW_TYPES, TableHeader } from '../table/__types/TableHeader.type';
import {
  faEllipsisVertical,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['update:data']);

const props =
  defineProps<{
    headers: TableHeader[];
    data: any[];
    grabberIcon?: IconDefinition;
  }>();

const _grabberIcon = ref(props.grabberIcon || faEllipsisVertical);

const isDragging = ref<boolean>(false);
const ghost = ref({});
const onDraggingData = ref<any>([]);

const dragstartEvent = (event: DragEvent, elem: any, index: number) => {
  if (event && event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('dragIndex', index.toString());
  }

  onDraggingData.value = props.data;
  isDragging.value = true;
  ghost.value = {
    ...elem,
    id: 'ghost',
  };

  addGhost(index);
};

const dragoverEvent = (event: DragEvent, index: number) => {
  event.preventDefault();

  if (isDragging.value) {
    addGhost(index);
  }
};

const dragleaveEvent = (event: DragEvent) => {
  event.preventDefault();

  removeGhost();
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();

  const index = getGhostIndex();

  removeGhost();

  const oldIndex = event?.dataTransfer?.getData('dragIndex') || '0';
  const toMove = onDraggingData.value[oldIndex];

  onDraggingData.value.splice(parseInt(oldIndex, 10), 1);
  onDraggingData.value.splice(index, 0, toMove);

  emit('update:data', onDraggingData.value);

  isDragging.value = false;
  onDraggingData.value = [];
  ghost.value = {};
};

const addGhost = (index: number) => {
  // Remove all ghosts before adding any new ones:
  removeGhost();

  onDraggingData.value.splice(index, 0, ghost.value);
};

const getGhostIndex = (): number => {
  return onDraggingData.value.findIndex((elem: any) => elem.id === 'ghost');
};

const removeGhost = () => {
  const index = getGhostIndex();

  if (index !== -1) {
    onDraggingData.value.splice(index, 1);
  }
};

const _data = computed(() => {
  if (isDragging.value) {
    return onDraggingData.value;
  } else {
    return props.data;
  }
});
</script>

<template>
  <div class="h-full">
    <div class="flex flex-col h-full">
      <div class="h-full">
        <div class="inline-block min-w-full align-middle h-full">
          <div
            class="
              overflow-hidden
              shadow
              ring-1 ring-black ring-opacity-5
              h-full
              overflow-x-auto overflow-y-auto
            "
          >
            <table
              v-bind="$attrs"
              class="min-w-full divide-y divide-gray-300 h-full max-h-full"
            >
              <thead class="bg-gray-50 sticky top-0 border-b">
                <tr>
                  <th class="sr-only w-1" />

                  <th
                    v-for="(header, index) in headers"
                    :key="`table-header-${header.identifier}-${index}`"
                    scope="col"
                    class="
                      py-3
                      pl-4
                      pr-3
                      text-left text-sm text-gray-900
                      uppercase
                      font-medium
                      sm:pl-6
                    "
                    :class="header.headerClassList"
                  >
                    <slot name="headerContent" v-bind="header">
                      {{ header.title }}
                    </slot>
                  </th>

                  <slot name="headerLastCell"></slot>
                </tr>
              </thead>

              <tbody
                dropzone="move"
                class="divide-y divide-gray-200 bg-white"
                @drop="onDrop"
              >
                <tr
                  v-for="(elem, index) in _data"
                  :key="`table-row-${index}`"
                  draggable="true"
                  class="cursor-pointer select-none transition-all"
                  :class="{ 'opacity-30': elem.id === 'ghost' }"
                  @dragstart="dragstartEvent($event, elem, index as number)"
                  @dragover="dragoverEvent($event, index as number)"
                  @dragleave="dragleaveEvent($event)"
                >
                  <td class="cursor-pointer w-0">
                    <fa-icon
                      :icon="_grabberIcon"
                      class="
                        px-4
                        transition-all
                        text-gray-400
                        hover:text-gray-800
                      "
                    />
                  </td>

                  <td
                    v-for="(header, index) in headers"
                    :key="`table-cell-${header.identifier}-${index}`"
                    class="
                      whitespace-nowrap
                      py-2
                      pl-4
                      pr-3
                      text-sm
                      font-medium
                      text-gray-900
                      sm:pl-6
                    "
                  >
                    <slot
                      name="beforeRowContent"
                      v-bind="{ elem: elem, header: header }"
                    />

                    <div
                      v-if="header.type === ROW_TYPES.TEXT"
                      :class="header.rowClassList"
                    >
                      {{ elem[header.identifier] }}
                    </div>

                    <div
                      v-else-if="header.type === ROW_TYPES.IMAGE"
                      :class="header.rowClassList"
                    >
                      <img
                        :src="elem[header.identifier]"
                        :alt="elem[header.identifier]"
                      />
                    </div>

                    <div
                      v-else-if="header.type === ROW_TYPES.HTML"
                      :class="header.rowClassList"
                      v-html="elem[header.identifier]"
                    />

                    <div
                      v-else-if="header.type === ROW_TYPES.TEXT_WITH_LINKS"
                      :class="header.rowClassList"
                    >
                      <div>{{ elem[header.identifier] }}</div>

                      <div
                        v-for="(link, index) in header.links"
                        :key="`links-${header.identifier}-${index}`"
                        class="text-xs inline-block"
                      >
                        <span v-if="index !== 0">&nbsp;|&nbsp;</span>

                        <router-link
                          :to="link.to"
                          class="text-blue-600 hover:text-blue-800"
                        >
                          {{ link.label }}
                        </router-link>
                      </div>
                    </div>

                    <slot
                      name="afterRowContent"
                      v-bind="{ elem: elem, header: header }"
                    />
                  </td>

                  <slot name="rowLastCell" v-bind="elem" />
                </tr>

                <tr v-if="_data.length <= 0">
                  <slot name="emptyState">
                    <td
                      colspan="100"
                      class="
                        w-full
                        py-2
                        text-center text-gray-500 text-2xl
                        italic
                      "
                    >
                      Nothing to see here jet!
                    </td>
                  </slot>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
