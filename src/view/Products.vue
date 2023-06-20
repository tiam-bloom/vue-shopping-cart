<template>
    <div class="products">
        <div class="search-input">
            <el-input placeholder="请输入商品名" v-model="keywords" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-tabs v-model="activeCategory" type="card" @tab-click="handleClick">
            <el-tab-pane label="首页" name="首页"></el-tab-pane>
            <el-tab-pane v-for="category of categories" :label="category" :name="category"></el-tab-pane>
        </el-tabs>
        <div class="goods-container">
            <el-card v-for="goods of filterGoods" class="block">

                <el-image :src="goods.image">
                    <div slot="error" class="image-slot image">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <div class="goods-bottom">
                    <div class="good-price-cat">
                        <span>{{ goods.price }}</span>
                        <el-tag type="warning" size="mini">{{ goods.category }}</el-tag>
                    </div>
                    <span>{{ goods.title }}</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="add-btn" round @click="addCart(goods)">加入购物车</el-button>
                    </div>
                </div>
            </el-card>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'Products',
    data() {
        return {
            goodslist: [],
            activeCategory: '首页',
            keywords: '',
            categories: []
        };
    },
    created() {
        axios.get('/api/goods').then(res => {
            console.log(res.data)
            this.categories = new Set(res.data.data.map(item => item.category));
            this.$store.commit('setGoodsList', res.data.data);
            this.goodslist = res.data.data;
        })
    },
    computed: {
        filterGoods() {
            return this.goodslist.filter(item => item.title.includes(this.keywords) && (this.activeCategory == "首页" || item.category === this.activeCategory));
        }
    },
    methods: {
        addCart(goods) {
            console.log(goods);
            this.$message.success("加入购物车成功");
            this.$store.commit('addCart', goods);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
}
</script>
  
<style scoped>
.search-input {
    width: 500px;
    margin: 0 auto 10px;
}
.el-card {
    margin: 20px;
    float: left;
}

.el-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    transform: scale(1.1);
}

.goods-bottom {
    text-align: center;
}

.goods-bottom span {
    display: block;
    /* margin: 10px 0; */
    margin-top: 10px;
}

.goods-bottom span:nth-child(1) {
    color: #f60;
    font-size: 20px;
}

.goods-bottom .bottom {
    margin-top: 10px;
}

.goods-bottom span:nth-child(1)::before {
    content: '￥';
}

.good-price-cat {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.add-btn {
    border: 1px solid #409EFF;
    padding: 10px 20px;
}

.add-btn:hover {
    color: #fff;
    background-color: #409EFF;
}

.el-image {
    width: 200px;
    height: 200px;
}
</style>
  