<script setup lang="ts">

import {ModeRoom} from "~/types/modeRoom";
import * as yup from "yup";
import {useForm} from "vee-validate";
import {FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {useUserStore} from "~/stores/user";
import {useRouter} from "#app";
import {useSocket} from "~/stores/useSocket";

const userStore = useUserStore();
const props = defineProps<{
  modeRoom: ModeRoom,
  idRoom?: string
}>()

// FORM
const formSchema = yup.object({
  name: yup.string().required("Your name are required"),
})

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: userStore.player_name,
  }
})

// SUBMIT
const onSubmit = form.handleSubmit(async ({name}) => {
  const router = useRouter();
  const userStore = useUserStore();
  if (!name)
    return ;
  userStore.updatePlayerName(name);
  if (props.modeRoom === ModeRoom.create) {
    const newGame : any = await $fetch(`http://localhost:3000/create-game?playerName=${name}&playerId=${userStore.id}`, {
      method: "GET",
    });
    if (newGame && newGame.id) {
      userStore.setIsAdmin(true);
      router.push(newGame.id);
    }
  } else {
    const id = props.idRoom;
    if (!id)
      return ;
    userStore.setIsAdmin(false);
    router.push(String(id));
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