<script setup>
import { ref, onMounted, watch } from "vue";
import { BeautifulTree } from "../BeautifulTree";
import { computeSmartLayout } from "../../../algorithms/src/main";

const canvas = ref(null);
const props = defineProps({
  id: {
    type: String,
  },
  data: {
    type: Object,
    required: true,
  },
  theme: {
    type: Object,
    default: {
      canvasBgColor: "#eee",
      strokeStyle: "#000",
    },
  },
  treeScale: {
    type: Number,
    default: 75,
  },
});

onMounted(() => {
  const bt = new BeautifulTree(
    canvas.value,
    computeSmartLayout(props.data).tree,
  );

  bt.theme = props.theme;
  bt.layoutScale = props.treeScale;
  bt.render();

  watch(props, (newState, oldState) => {
    const hasTreeScaleChanged = newState.treeScale === oldState.treeScale;

    if (hasTreeScaleChanged) {
      bt.layoutScale = newState.treeScale;
      bt.render();
    }
  });
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
