import AntListGroupItem from '../AntListGroupItem.vue';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {faUser, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {ListGroupItemColorType} from '../../types/AntListGroupItem.type';

const meta: Meta<typeof AntListGroupItem> = {
    title: 'Components/List Group Item',
    component: AntListGroupItem,
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        colorType: {
            control: {type: 'select'},
            options: Object.values(ListGroupItemColorType),
        },
        iconLeft: {
            control: {type: 'none'},
            description:
                'Will be displayed right to the default slot.<br>Use Font-awesome Icons.',
        },
        iconRight: {
            control: {type: 'none'},
            description:
                'Will be displayed right to the default slot.<br>Use Font-awesome Icons.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof AntListGroupItem>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntListGroupItem},
        setup() {
            return {args};
        },
        template: '<div class="p-4 bg-neutral-100"><AntListGroupItem v-bind="args">Item</AntListGroupItem></div>',
    }),
    args: {},
};

export const Link: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        to: '/example',
    },
};
export const IconLeft: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        iconLeft: faUser,
    },
};
export const IconRight: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        iconRight: faChevronRight,
    },
};
export const IconLeftAndRight: Story = {
    render: Docs.render,
    args: {
        ...Docs.args,
        iconLeft: faUser,
        iconRight: faChevronRight,
    },
};
