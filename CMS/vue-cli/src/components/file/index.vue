<style>
    .layout {
        margin-bottom: 5px;
    }
    .layoutSearch {
        width: 50%;
        margin-bottom: 5px;
    }
    .sgLayot {
        border-left: 1px solid lightgray;

    }
    .treeMenu {
        border-top: 1px solid lightgray;
        border-right: none;
        border-bottom: 0;
        height: 100%;
    }
</style>

<template>
    <div>
        <Input v-model="filter.n_title" class="layoutSearch" >
        <Button slot="append" icon="ios-search" @click="onSearchClick"></Button>
        </Input>
        <div class="layout">
            <Button type="success" @click="addData">添加</Button>
            <Button type="error" @click="removes">批量删除</Button>
        </div>
        <Row class="sgLayot" >
        <Col span="18" push="6">
        <Table border ref="selection"  @on-select="onCheckSelect" :columns="columns" :data="list"></Table>
        <Page :total="filter.total" show-sizer :page-size="filter.pageSize" @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>

        <Modal v-model="addDataModal" title="数据处理">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="n_title">
                    <Input v-model="formValidate.n_title" placeholder="输入标题"></Input>
                </FormItem>
                <FormItem label="作者" prop="n_author">
                <Input v-model="formValidate.n_author" placeholder="输入作者"></Input>
                </FormItem>
                <FormItem label="内容" prop="n_detail">
                    <Input v-model="formValidate.n_detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
                </FormItem>
                <FormItem style="display:none" prop="nid">
                    <Input v-model="formValidate.nid"></Input>
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
        </Col>
        <Col span="6" pull="18" class="treeMenu"><Tree :data="treeList" @on-select-change="onSelectChange" name="2"></Tree></Col>
    </Row>
    </div>
</template>
<script>

import {Base} from '../../common/Base.js'
    export default {
        mixins: [Base],

        data () {
            return {
                module: 'news',
                treeList: [],
                formValidate: {
                    n_detail: '',
                    n_title: '',
                    n_author: '',
                    nid: '',
                },
                ruleValidate: {
                    n_title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    n_author: [
                        { required: true, message: '作者不能为空', trigger: 'blur' },
                    ],
                    n_detail: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                    ],
                    nid: [
                        { required: true, message: '请选择节点', trigger: 'blur' },
                    ]
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '标题',
                        width:150,
                        key: 'n_title',
                    },
                    {
                        title: '作者',
                        key: 'n_author',
                        width:80
                    },
                    {
                        title: '内容',
                        key: 'n_detail',
                        ellipsis: true,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    },
                                    domProps: {
                                        title: params.row.n_detail
                                    }
                                }, params.row.n_detail)
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                }, '删除'),
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            comment(params){

                this.$data.newsid = params.row._id;
                this.$router.push({path:`/comment?nid=${params.row._id}`});
            },
            addData(){
                if(this.isSelectNode){
                    this.addDataModal = true;
                    this.$refs['formValidate'].resetFields();
                    delete this.formValidate._id;
                    this.formValidate.nid = this.filter.nid;
                }else{
                    this.$Message.error('请选择节点添加');
                }
            },
            onSelectChange(arr){
                if(arr.length){
                this.isSelectNode = true;
                this.filter.nid = arr[0]._id;
                this.formValidate.nid = arr[0]._id;
                this.filter.page = 1;
                Object.defineProperty(this.filter,'username',{enumerable:false}); 
                this.getListData();
                }
            },
            getCateData(tabType){
                this.axios({
                    url:`${this.Usuite}/cate/list/${tabType}`,
                    method:'get',
                    
                    }).then(res=>{
                         res.data[0].expand = true;
                        this.treeList = res.data;
                });
            },
        },
        mounted(){
            this.getCateData(5);
        }
    }
</script>