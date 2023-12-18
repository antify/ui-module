import AntPagination from '../AntPagination.vue';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { type Meta, type StoryObj} from "@storybook/vue3";
import AntButton from "../form/AntButton.vue";

const meta: Meta<typeof AntPagination> = {
    title: 'Components/Pagination',
    component: AntPagination,
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        pageQuery: {
            description: 'Which query parameter should be used, for writing the current page into it.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AntPagination>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntPagination},
        setup() {
            console.log(args);
            return {args, faAngleRight};
        },
        template: `
          <div class="p-4">
            <AntPagination v-bind="args"/>
          </div>
        `
    }),
    args: {
        pages: 20
    }
};

export const Skeleton: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        skeleton: true
    },
};


