<template>
  <div class="absolute top-0 w-screen h-screen">
    <div class="absolute w-full h-full bg-black opacity-20"></div>
    <div class="bg-gray-800 shadow-lg mx-auto mt-40 w-80 h-40 flex flex-col justify-between text-center p-5 rounded-lg">
      <span class="text-white font-medium z-20">{{ text }}</span>
      <div class="flex justify-between z-20">
        <button
          class="shadow-sm bg-gray-400 px-4 py-2 text-white font-bold rounded  hover:opacity-80 hover:shadow-inner"
          @click="$emit('cancel')"
        >
          Avbryt
        </button>
        <button
          class="shadow-sm bg-red-500 px-4 py-2 text-white font-bold rounded  hover:opacity-80 hover:shadow-inner"
          @click="$emit('ok')"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDialog",
  props: {
    text: String,
  },
};
</script>
