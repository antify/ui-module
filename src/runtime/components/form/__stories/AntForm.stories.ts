import AntForm from '../AntForm.vue';
import AntInput from '../AntInput.vue';
import AntButton from '../AntButton.vue';
import AntHeader from '../../layout/AntHeader.vue';

export default {
  title: 'Components/Forms/Ant Form',
  component: AntForm,
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    args: {
      description:
        'Additional attributes given to this will be forwarded to the form directly. So you will get all the events here that the form normally gets.',
    },
    default: {
      description: 'Slot for the formular',
      table: { type: { summary: 'HTML' } },
    },
  },
};

export const Simple = (args: any) => ({
  components: { AntForm, AntInput, AntButton, AntHeader },
  setup() {
    const submit = () => {
      console.log('SUBMIT');
    };
    const value = '';

    return { args, submit, value };
  },
  template: `
  <div>
    <AntForm @submit.prevent="submit">
      <template #header>
        <AntHeader>Formular</AntHeader>
      </template>

      <AntInput v-model:value="value" label="Input 1"/>
      
      <div class="w-full flex justify-between space-x-4">
        <div class="w-full">
          <AntInput v-model:value="value" label="Input 2"/>
        </div>
        
        <div class="w-full">
          <AntInput v-model:value="value" label="Input 3"/>
        </div>
      </div>

      <div class="w-full"><AntInput v-model:value="value" label="Input 4"/></div>
      
      <template #footer>
        <AntButton>Cancel</AntButton>
        <AntButton type="submit" :primary="true">Save</AntButton>
      </template>
    </AntForm>
  </div>`,
});
