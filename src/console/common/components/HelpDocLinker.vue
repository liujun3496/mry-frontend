<template>
  <icon :class="$style.wrapper" :icon="['far','question-circle']" />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },

  methods: {
    onClick() {
      window.open(this.url, '_blank');
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  color: $secondaryTextColor;
  font-size: 14px;
}

.wrapper:hover {
  color: $primaryThemeColor;
  cursor: pointer;
}
</style>
