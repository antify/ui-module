<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ROW_TYPES, TableHeader } from '../../types/TableHeader.type';
import AntSkeleton from '../../components/AntSkeleton.vue';

defineProps<{
  headers: TableHeader[];
  data: any[];
  rowHover: boolean;
  loading: boolean;
}>();
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
              class="min-w-full divide-y divide-gray-300 max-h-full"
            >
              <thead class="bg-gray-50 sticky top-0 border-b">
              <tr class="">
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

              <tbody v-if="!loading" class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(elem, index) in data"
                :key="`table-row-${elem.id}-${index}`"
                :id="elem.id"
                class="target:bg-gray-200 transition-all"
                :class="{ 'bg-gray-200': elem.active, 'hover:bg-gray-300 cursor:pointer' : rowHover }"
              >
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

                  <div v-else-if="header.type === ROW_TYPES.SLOT">
                    <slot name="cellContent" v-bind="{ elem, header }"></slot>
                  </div>

                  <slot
                    name="afterRowContent"
                    v-bind="{ elem: elem, header: header }"
                  />
                </td>

                <slot name="rowLastCell" v-bind="{ elem }"/>
              </tr>

              <tr v-if="data.length <= 0">
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

              <tbody v-else class="divide-y divide-gray-200 bg-white">
              <slot name="loadingRow">
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="99">
                    <AntSkeleton
                      :model-value="loading"
                      class="bg-gray-200 animate-pulse m-1 h-6"
                    />
                  </td>
                </tr>
              </slot>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
