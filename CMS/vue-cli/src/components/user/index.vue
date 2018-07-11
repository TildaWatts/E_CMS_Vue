<style>
    .layout {
        margin-bottom: 5px;
    }
    .layoutSearch {
        width: 50%;
        margin-bottom: 5px;
    }
</style>

<template>
    <div>
        <Input v-model="filter.username" class="layoutSearch" >
            <Button slot="append" icon="ios-search" @click="onSearchClick"></Button>
        </Input>
        <div class="layout">
            <Button type="success" @click="addData">添加</Button>
            <Button type="error" @click="removes">批量删除</Button>
        </div>
        <Table border ref="selection" @on-select="onCheckSelect" :columns="columns" :data="list"></Table>
        <Page :total="filter.total" show-sizer :page-size="filter.pageSize" @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>

        <Modal v-model="addDataModal" title="数据处理">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="formValidate.username" placeholder="输入用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="输入密码"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
            <div slot="footer">
            数据操作！
        </div>
        </Modal>
    </div>
</template>
<script>

import {Base} from '../../common/Base.js'

    export default {
        mixins: [Base],
        data () {
            return {
                module: 'users',
                formValidate: {
                    username: '',
                    password: '',
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ]
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
        },
        mounted(){
            this.getListData();
        }
    }
</script>