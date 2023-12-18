import AntField from '../AntField.vue';
import AntBaseInput from '../AntBaseInput.vue';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import {computed} from 'vue';
import {InputColorType} from '../../../../enums';

const meta: Meta<typeof AntField> = {
    title: 'Components/Forms/Elements/Field',
    component: AntField,
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        size: {
            control: {type: 'radio'},
            options: Object.values(Size),
        },
        colorType: {
            control: {type: 'select'},
            options: Object.values(InputColorType)
        },
        skeleton: {
            control: 'boolean',
            table: {defaultValue: {summary: false}},
        }
    },
};

export default meta;

type Story = StoryObj<typeof AntField>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntField, AntBaseInput},
        setup: () => {
            const skeleton = computed({
                get() {
                    return args.skeleton;
                },
                set(val) {
                    args.skeleton = val;
                }
            })
            const size = computed({
                get() {
                    return args.size;
                },
                set(val) {
                    args.size = val;
                }
            })
            const colorType = computed({
                get() {
                    return args.colorType;
                },
                set(val) {
                    args.colorType = val;
                }
            })

            return {args, skeleton, size, colorType}
        },
        template: '<div class="p-4"><AntField v-bind="args"><AntBaseInput value="" :skeleton="skeleton" :size="size" :color-type="colorType" placeholder="Placeholder"/></AntField></div>',
    }),
    args: {
        label: 'Label',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
    },
};
