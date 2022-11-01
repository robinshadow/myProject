<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="stratNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
        <button v-if="stratNumAndEndNum.start > 2">···</button>

        <template v-for="(page, index) in stratNumAndEndNum.end">
            <button v-if="page >= stratNumAndEndNum.start" :key="index" @click="$emit('getPageNo', page)">
                {{ page }}
            </button>
        </template>


        <button v-if="stratNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="stratNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条结果</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        //计算一共有多少页
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        //计算连续页码的起始数字和结束数字
        stratNumAndEndNum() {
            let start, end
            if (this.continues > this.totalPage) {
                //连续页码大于总页数
                start = 1
                end = totalPage
            } else {
                //连续页码小于总页数
                start = this.pageNo - parseInt(this.continues / 2)
                end = this.pageNo + parseInt(this.continues / 2)
                //计算出的初始页码出现0或负数
                if (start <= 0) {
                    start = 1
                    end = this.continues
                } else if (end > this.totalPage) {
                    //计算出的结束页码大于总页数
                    start = this.totalPage - this.continues + 1
                    end = this.totalPage
                }
            }
            return { start, end }
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
  