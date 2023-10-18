<script setup>
import { ref } from "vue";
import { BeautifulTree } from "./index.js";

const sampleData = {
  data: 1,
  children: [
    {
      node: {
        data: 2,
        children: [
          {
            node: {
              data: 4,
              children: [{ node: { data: 8 } }, { node: { data: 9 } }],
            },
          },
          {
            node: {
              data: 5,
              children: [{ node: { data: 10 } }, { node: { data: 11 } }],
            },
          },
        ],
      },
    },
    {
      node: {
        data: 3,
        children: [
          {
            node: {
              data: 6,
              children: [{ node: { data: 12 } }, { node: { data: 13 } }],
            },
          },
          { node: { data: 14 } },
        ],
      },
    },
  ],
};
</script>

<template>
  <BeautifulTree :data="sampleData" width="600" height="400" />
</template>
