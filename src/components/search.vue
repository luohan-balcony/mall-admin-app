<template>
    <div class="search-box">
        <a-form
    layout="inline"
    :model="searchForm"
    @submit="handleFinish"
  >
    <a-form-item label="检索关键字">
      <a-input placeholder="请输入关键字">
      </a-input>
    </a-form-item>
    <a-form-item label="商品类目">
      <a-select
      show-search style="width:200px"
      placeholder="请选择商品类目"
      @change="handleChange"
      allowClear>
          <a-select-option v-for="c in data" :key="c.id" :value="c.id">
              {{c.name}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-item>
  </a-form>
    </div>
</template>

<script>
import api from '@/api/category';

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  created() {
    api.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    handleFinish() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>
<style scoped lang="less">
    .search-box {
        padding: 10px 30px;
    }
</style>
