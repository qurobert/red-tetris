<script setup lang="ts">

import {ModeRoom} from "~/types/modeRoom";
import * as yup from "yup";
import {useForm} from "vee-validate";
import {FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {useUserStore} from "~/stores/user";

const userStore = useUserStore();
const props = defineProps<{
  modeRoom: ModeRoom,
  idRoom?: number
}>()

// FORM
const formSchema = yup.object({
  name: yup.string().required("Your name are required"),
})
console.log(userStore.player_name);
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: userStore.player_name,
  }
})

// SUBMIT
const onSubmit = form.handleSubmit(({name}) => {
  const router = useRouter();
  let id = 0;

  // set ID FROM MODE ROOM
  userStore.updatePlayerName(name);
  if (props.modeRoom === ModeRoom.create) {
    console.log("Create room");
    id = Math.floor(Math.random() * 1000000000); // TODO: USE ID RETURN BY BACKEND
  } else {
    console.log("Join room : " + props.idRoom);
    if (!props.idRoom)
      return ;
    id = props.idRoom;
  }


  router.push({ path: String(id) });  // TODO: USE ID RETURN BY BACKEND
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