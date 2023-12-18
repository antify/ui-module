import AntTableNav from '../AntTableNav.vue';
import { type Meta, type StoryObj} from "@storybook/vue3";

const meta: Meta<typeof AntTableNav> = {
    title: 'Components/Table Nav',
    component: AntTableNav,
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        pageQuery: {
            description: 'Which query parameter should be used, for writing the current page into it.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AntTableNav>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntTableNav},
        setup() {
            return {args};
        },
        template: `
          <div class="p-4">
            <AntTableNav v-bind="args"/>
          </div>
        `
    }),
    args: {
        pages: 10,
        page: 1,
        count: 100
    }
};

export const fullWidth: Story = {
    render: (args) => ({
        components: {AntTableNav},
        setup() {
            return {args};
        },
        template: `
          <div class="p-4 flex gap-4">
            <AntTableNav v-bind="args"/>

            <div v-if="!args.fullWidth" class="w-full">
              Another content
            </div>
          </div>
        `
    }),
    args: {
        ...Docs.args,
        fullWidth: false
    },
};

export const skeleton: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        skeleton: true
    },
};


