<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" disabled :value="cart.skuNum">
            <a href="javascript:void(0)" class="plus" @click="handler('plus', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool" v-show="cartInfoList.length > 0">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @click="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  methods: {
    //封装获取购物车信息的派发函数
    getData() {
      this.$store.dispatch('shopcart/getCartList')
    },
    //数量增减回调
    //节流，防止点击过快出现问题
    handler: throttle(async function (type, num, cart) {
      //发请求改数量
      if (type == 'mins') {
        if (cart.skuNum > 1) {
          num = -1
        } else {
          num = 0
          alert('数量不能为0')
        }
      } else {
        num = 1
      }
      //派发action
      try {
        //修改成功
        await this.$store.dispatch('detail/updateShopCart', { skuid: cart.skuId, skuNum: num })
        this.getData()
      } catch (err) {
        alert('添加失败，请检查网络')
        console.log(err.message);
      }
    }, 1500),
    //删除购物车产品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('shopcart/deleteCartById', cart.skuId)
        this.getData()
      } catch (err) {
        alert('删除失败，请检查网络')
        console.log(err.message);
      }
    },
    //修改购物车产品勾选状态
    async updateChecked(cart, event) {
      //带给服务器的勾选状态应该是0或1，不是布尔值
      let checked = event.target.checked ? '1' : '0'
      await this.$store.dispatch('shopcart/updateCheckedById', { skuid: cart.skuId, isChecked: checked })
      this.getData()
    },
    //删除选中的产品
    async deleteAllChecked() {
      await this.$store.dispatch('shopcart/deleteAllChecked')
      this.getData()
    },
    //全选商品
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? '1' : '0'
      await this.$store.dispatch('shopcart/updateAllCartChecked', isChecked)
      this.getData()
    }
  },

  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    //计算购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //计算购物车产品总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    //计算是否全选
    isAllCheck() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;

            &:hover {
              cursor: pointer;
              text-decoration: underline;
              color: blue;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>