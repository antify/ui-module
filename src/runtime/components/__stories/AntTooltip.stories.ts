import AntTooltip from '../AntTooltip.vue';
import AntButton from '../form/AntButton.vue';
import { type Meta, type StoryObj} from '@storybook/vue3';
import {Position} from '../../enums/Position.enum';
import {InputColorType} from '../../enums';

const meta: Meta<typeof AntTooltip> = {
    title: 'Components/Tooltip',
    component: AntTooltip,
    parameters: {controls: {sort: 'requiredFirst'}},
    argTypes: {
        position: {
            control: {type: 'select'},
            options: Object.values(Position),
        },
        colorType: {
            control: {type: 'select'},
            options: Object.values(InputColorType),
        }
    },
};

export default meta;

type Story = StoryObj<typeof AntTooltip>;

export const Docs: Story = {
    render: (args) => ({
        components: {AntTooltip, AntButton},
        setup() {
            return {args};
        },
        template: `
          <div class="p-32 flex justify-center items-center">
            <AntTooltip v-bind="args">
              <template #content>Lorem ipsum dolor sit amet <br/> foo</template>
              <template #default>
                <span class="text-primary bg-danger">
                  Hover me
                </span>
              </template>
            </AntTooltip>
          </div>
        `,
    }),
    args: {
        position: Position.top
    },
};
