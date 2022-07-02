<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        autofocus
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <SearchRes :searchText="searchText" v-if="isResultShow"></SearchRes>
    <SearchSuggest
      @search-event="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></SearchSuggest>
    <SearchHistory v-else @search-event="onSearch"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchRes from './components/SearchRes.vue'
export default {
  name: 'search-container',
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },

  created () {

  },

  methods: {
    onSearch (val) {
      // console.log(val)
      this.searchText = val
      this.$store.commit('HISTORY', val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: { SearchHistory, SearchSuggest, SearchRes }
}
</script>

<style scoped lang='less'>
.search {
  padding-top: 106px;
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
