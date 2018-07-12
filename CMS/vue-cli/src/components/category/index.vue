<template>
    
    <div>
        <ButtonGroup style="marginBottom:5px">
            <Button type="info" @click="editData">修改</Button>
            <Button type="success" @click="addData">添加</Button>
            <Button type="warning"  @click="removeNode">删除</Button>
            <Button type="error">没想好</Button>
        </ButtonGroup>
        <Tabs type="card" :animated="false" @on-click="onTabClick">
            <TabPane label="商城"><Tree :data="treeList" @on-select-change="onSelectChange" name="1"></Tree></TabPane>
            <TabPane label="新闻"><Tree :data="treeList" @on-select-change="onSelectChange" name="2"></Tree></TabPane>
            <TabPane label="地区"><Tree :data="treeList" @on-select-change="onSelectChange" name="3"></Tree></TabPane>
            <TabPane label="地区"><Tree :data="treeList" @on-select-change="onSelectChange" name="4"></Tree></TabPane>
            <TabPane label="地区"><Tree :data="treeList" @on-select-change="onSelectChange" name="5"></Tree></TabPane>
        </Tabs>

        <Modal v-model="addDataModal" title="添加节点">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="节点名" prop="text">
                    <Input v-model="formValidate.text" placeholder="输入节点名"></Input>
                </FormItem>
                <FormItem prop="type" style="display:none">
                    <Input v-model="formValidate.type" ></Input>
                </FormItem>
                <FormItem prop="parentId" style="display:none">
                    <Input v-model="formValidate.parentId"></Input>
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
                module: 'cate',
                treeList: [],
                formValidate: {
                    text: '',
                    type: 0,
                    parentId: '',
                },
                ruleValidate: {
                    text: [
                        { required: true, message: '节点不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true}
                    ],
                    parentId: [
                        { required: true }
                    ],
                },
            }
        },
        
        methods: {
            addData(){
                if(this.isSelectNode){
                    this.formValidate.text='';
                    this.addDataModal = true;
                    Object.defineProperty(this.formValidate,'parentId',{enumerable:true}); 

                }else{
                    this.$Message.error('请选择节点添加');
                  
                }
            },
            editData(params){
                if(this.isSelectNode){
                    
                    this.addDataModal = true;
                    this.stateId = this.formValidate.parentId;
                    Object.defineProperty(this.formValidate,'parentId',{enumerable:false}); 
                }else{
                    this.$Message.error('请选择节点修改');
                }
            },
            removeNode(){
                if(this.isSelectNode){
                    var params = {
                        row: {
                            _id: this.formValidate.parentId
                        }
                    }
                    this.remove(params);
                }else{
                    this.$Message.error('请选择节点删除');
                }
            },
            onTabClick(name){
                this.getListData(name+1);
            },
            onSelectChange(arr){
                if(arr.length){
                    this.isSelectNode = true;
                    this.formValidate.text = arr[0].text;
                    this.formValidate.parentId = arr[0]._id;
                    this.formValidate.type = arr[0].type;
                }
            },
            getListData(tabType){
                tabType = tabType?tabType:this.formValidate.type;
                this.axios({
                    url:`${this.Usuite}/${this.module}/list/${tabType}`,
                    method:'get',
                    }).then(res=>{
                    this.treeList = res.data;
                });
            }
        },
        mounted() {
            this.getListData(1);
        },
    }
</script>