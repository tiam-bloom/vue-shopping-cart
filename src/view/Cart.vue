
<template>
    <div class="cart">
        <el-table :data="cartlist" style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
            <template slot="empty">
                <p class="emptyText">请先去<router-link to="/products">商城</router-link>中添加商品</p>
            </template>

            <el-table-column type="selection" width="100">
            </el-table-column>
            <el-table-column label="商品" width="180">
                <template slot-scope="scope">
                    <el-avatar shape="square" :size="100" fit="cover" :src="scope.row.image" alt="商品图片"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="商品名" width="300">
            </el-table-column>
            <el-table-column prop="price" :formatter="priceFormater" label="单价（元）" width="180">
            </el-table-column>
            <el-table-column prop="price" label="数量">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="10000"
                        label="描述文字"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="小计（元）" :formater="subtotalFormater">
                <template slot-scope="scope">
                    <span>{{ subtotalFormater(scope.row) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-popconfirm confirm-button-text='确定' cancel-button-text='点错了' icon="el-icon-info" icon-color="red"
                        title="确定从购物车中删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                        <el-button size="mini" type="danger" slot="reference" class="el-icon-delete-solid">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 统计 -->
        <el-row :gutter="18">
            <el-col :span="8">
                <el-statistic prefix="￥" group-separator="," :precision="2" :value="total" title="总价"></el-statistic>
            </el-col>
            <el-col :span="8">
                <el-statistic prefix="￥" group-separator="," :precision="2" :value="totalChecked" title="合计"></el-statistic>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="settlement">结算</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loading } from 'element-ui';
export default {
    name: 'Cart',
    data() {
        return {
            multipleSelection: []
        }
    },
    computed: {
        ...mapState([
            'cartlist',
        ]),
        // 总价
        total() {
            return this.cartlist.reduce((total, item) => total + item.num * item.price, 0);
        },
        // 勾选总价
        totalChecked() {
            return this.multipleSelection.reduce((total, item) => total + item.num * item.price, 0);
        }
    },
    methods: {
        handleChange(value) {
            // console.log(value);
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$store.commit('removeCart', row);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleSelectionChange(goods) {
            this.multipleSelection = goods;
        },
        priceFormater(row) {
            return `￥${row.price.toFixed(2)}`
        },
        subtotalFormater(row) {
            return `￥${(row.num * row.price).toFixed(2)}`
        },
        // 结算
        settlement() {
            // 判断是否有勾选
            if (this.multipleSelection.length === 0) {
                this.$message.warning('请先勾选商品');
                return;
            }
            this.$confirm(`一共${this.multipleSelection.length}件商品, ${this.totalChecked.toFixed(2)}元, 确定结算吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loadingInstance = Loading.service({ fullscreen: true });

                setTimeout(() => {
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                    this.$message.success(`结算成功! 一共是${this.totalChecked.toFixed(2)}元`);
                    this.$store.commit('clearCart', this.multipleSelection);
                }, 1000);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消结算'
                });
            });

        }
    }
}
</script>
<style scoped>
.el-row .el-button {
    display: block;
    margin: 0 auto;
}

.el-row {
    margin-top: 20px;
}
</style>
  