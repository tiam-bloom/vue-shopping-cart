
<template>
    <div class="cart">
        <el-table :data="goodslist" style="width: 100%" show-summary highlight-current-row stripe>
            <el-table-column type="selection" width="100">
            </el-table-column>
            <el-table-column label="商品" width="180">
                <template slot-scope="scope">
                    <el-avatar shape="square" :size="100" fit="cover" :src="scope.row.image" alt="商品图片"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="商品名" width="300">
            </el-table-column>
            <el-table-column prop="price" label="单价" width="180">
            </el-table-column>
            <el-table-column prop="price" label="数量">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="10000"
                        label="描述文字"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="小计">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-popconfirm confirm-button-text='确定' cancel-button-text='点错了' icon="el-icon-info" icon-color="red"
                        title="确定从购物车中删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                        <el-button size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Cart',
    mounted() {
        axios.get('/api/goods').then(res => {
            this.goodslist = res.data.data;
        })
    },

    data() {
        return {
            goodslist: [],
        }
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.goodslist.splice(index, 1);
        },
        handleEdit(index, row) {
            console.log(index, row);
        }
    }
}
</script>
<style scoped></style>
  