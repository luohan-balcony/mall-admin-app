<template>
    <div class="product-list">
        <searchBox @submit="searchSubmit" :data="categoryList"/>
        <a-button class="product-add-btn"><router-link :to="{name:'ProductAdd'}">
          添加商品</router-link></a-button>
        <productTable :data="tableData" :page="page"
         @change="changePage" :categoryList="categoryList"
         @edit="editProduct"
         @remove="removeProduct"/>
    </div>
</template>
<script>
import searchBox from '@/components/search.vue';
import productTable from '@/components/productTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
        total: 60,
      },
      categoryObj: [],
    };
  },
  components: {
    searchBox,
    productTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      this.categoryList.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        this.page.total = res.total;
        this.tableData = res.data.map((item) => {
          console.log(this.categoryObj[item.category].name);
          return {
            ...item,
            categoryName: this.categoryObj[item.category].name,
          };
        });
      });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      console.log(record.id);
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: `确认删除产品标题为"${record.title}"的商品吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style scoped lang="less">
.product-list{
  position: relative;
  .product-add-btn{
  position: absolute;
  right: 10px;
  top: 14px;

}

}

</style>
