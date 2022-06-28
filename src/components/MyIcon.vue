<template>
  <div>
    <i slot="left-icon" calss="toutiao" :class="'toutiao-'+iconName"></i>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
