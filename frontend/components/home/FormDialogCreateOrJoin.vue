<script setup lang="ts">

import {ModeRoom} from "~/types/modeRoom";
import * as yup from "yup";
import {useForm} from "vee-validate";
import {FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";

const props = defineProps<{
  modeRoom: ModeRoom,
  idRoom?: number
}>()

// FORM
const formSchema = yup.object({
  name: yup.string().required("Your name are required"),
})
const form = useForm({
  validationSchema: formSchema,
})

// SUBMIT
const onSubmit = form.handleSubmit(({name}) => {
  const router = useRouter();
  if (props.modeRoom === ModeRoom.create) {
    console.log("Create room");
    router.push({ path: '123456789' });  // TODO: USE ID RETURN BY BACKEND
  } else {
    console.log("Join room : " + props.idRoom);
    if (!props.idRoom)
      return ;
    router.push({ path: String(props.idRoom) });
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Your name" class="w-full mb-4" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" size="sm" class="w-full mt-4" :variant="form.meta.value.valid ? 'default' : 'secondary'" :disabled="!form.meta.value.valid">
        <span v-if="modeRoom === ModeRoom.create">
          Create
        </span>
      <span v-else>
          Join
        </span>
    </Button>
  </form>
</template>