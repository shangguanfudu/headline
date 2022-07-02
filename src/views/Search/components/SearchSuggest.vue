<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search-event', item)"
      v-for="(item, ind) in suggestList"
      :key="ind"
      :title="item"
      icon="search"
    >
      <template #title>
        <span v-html="highLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (newVal) {
        this.getSearchSuggest(newVal)
      }, 1000)
    }
  },
  created () { },
  mounted () {

  },
  methods: {
    async getSearchSuggest (text) {
      try {
        const { data: res } = await getSearchSuggest(text)
        // console.log(res)
        this.suggestList = res.data.options
      } catch (error) {
        console.log(error)
      }
    },
    highLight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less"></style>
