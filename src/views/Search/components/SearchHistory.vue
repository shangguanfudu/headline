<template>
  <div class="search-history">
    <van-cell title="搜索历史" class="header">
      <template v-if="isDelete">
        <span @click="EMPTYHISTORY()">全部删除</span>
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isDelete = true" v-else />
    </van-cell>
    <van-cell
      v-for="(item, index) in SearchHistoryList"
      :key="index"
      :title="item"
      @click="$emit('search-event', item)"
    >
      <van-icon @click.stop="DELHISTORY(index)" name="close" v-if="isDelete" />
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: { ...mapState(['SearchHistoryList']) },
  watch: {},
  created () { },
  mounted () { },
  methods: { ...mapMutations(['DELHISTORY', 'EMPTYHISTORY']) }
}
</script>

<style scoped lang="less">
.header {
  span {
    margin-left: 10px;
  }
}
</style>
