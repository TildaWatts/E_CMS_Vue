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
        <Table border ref="selection" @on-select="onCheckSelect" :columns="columns" :data="list" no-data-text="暂无数据请到新闻模块中选择评论查看"></Table>
        <Page :total="filter.total" show-sizer :page-size="filter.pageSize" @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>

        <Modal v-model="addDataModal" title="数据处理">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="formValidate.username" placeholder="输入用户名"></Input>
                </FormItem>
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="内容" prop="comdetail">
                    <Input v-model="formValidate.comdetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
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
                module: 'comment',
                formValidate: {
                    username: '',
                    password: '',
                    date:'',
                    time: ''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    comdetail: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
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
                        title: '评论时间',
                        key: 'comtime'
                    },
                    {
                        title: '评论内容',
                        key: 'comdetail'
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
            if(this.$route.query.nid){
                this.filter.newsid = this.$route.query.nid;
                this.getListData();
            }
        }
    }
</script>