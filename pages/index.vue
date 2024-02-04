<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

type ComponentNameType = "options" | "composition";
type ButtonTextType = "CompositionAPIを見る" | "OptionsAPIを見る";

// コンポーネントの表示
const componentName: Ref<ComponentNameType> = ref("options");
const isOptionsApiShown = computed<boolean>(() => {
  return componentName.value === "options";
});
const buttonText = computed<ButtonTextType>(() => {
  return isOptionsApiShown.value ? "CompositionAPIを見る" : "OptionsAPIを見る";
});
const toggleComponent = (): void => {
  componentName.value = isOptionsApiShown.value ? "composition" : "options";
};
</script>

<template>
  <div>
    <button @click="toggleComponent()">{{ buttonText }}</button>
    <OptionsApi v-show="isOptionsApiShown" />
    <CompositionApi v-show="!isOptionsApiShown" />
  </div>
</template>
