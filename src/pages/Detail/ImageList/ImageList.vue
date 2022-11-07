<template>
  <el-carousel type="card" height="150px" width="150px" :autoplay="false">
    <el-carousel-item v-for="(img, index) in skuImageList" :key="img.id">
      <img :src="img.imgUrl" height="140px" width="140px" @click="changeCurrentIndex(index)">
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
  name: "ImageList",
  props: ['skuImageList'],
  methods: {
    changeCurrentIndex(index) {
      //通知zoom组件 点击图片的索引值为多少
      this.$bus.$emit('getIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
img {
  border: 1px solid #ccc;

  &.active {
    border: 2px solid #f60;
    padding: 1px;
  }

  &:hover {
    border: 2px solid #f60;
    padding: 1px;
  }
}
</style>