 export const Base = {
    data () {
        return {
            addDataModal: false,
            isSelectNode: false,
            newsid:'',
            list: [],
            filter: {
                page: 1,
                rows: 10,
                total: 0,
                username: '',
                pageSize: 10,
                ids: [],
                newsid:''
            },
            stateId: '',
            module:'users',
            Usuite: 'http://localhost:3000'
        }
    },
    methods: {
        addData(){
            this.stateId = 0;

            //方法1 重新初始化
            // this.$data.formValidate = {
            //     username: '',
            //     password: '',
            // };
            //方法2
            this.$refs['formValidate'].resetFields();
            delete this.$data.formValidate._id;
            if(this.module=='comment'&&!this.$route.query.nid){
                this.$Message.error('请到新闻模块选择评论查看');
                return;
            }
            // Object.assign(this.$data, this.$options.data());
            this.addDataModal = true;
        },
        editData(params){
            console.log(params.row._id)
            this.axios({
                url: `${this.Usuite}/${this.module}/data/${params.row._id}`,
                method: 'get'
            }).then(res=>{
                this.formValidate = res.data;
                this.addDataModal = true;
                this.stateId = params.row._id;
            })
        },
        remove (params) {
            console.log(`${this.Usuite}/${this.module}/data/${params.row._id}`);
            this.$Modal.confirm({
                title: '删除',
                content: '<p>是否要删除这条数据</p>',
                onOk: () => {
                    this.axios({
                        //删除有两个参数，一个params,一个index
                        url: `${this.Usuite}/${this.module}/data/${params.row._id}`,
                        method: 'delete'
                    }).then(res => {
                        this.$Message.info('删除数据成功');
                        this.getListData();
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        removes(){
            this.$Modal.confirm({
                title: '批量删除',
                content: '<p>是否要批量删除数据</p>',
                onOk: () => {
                    this.axios({
                        url: `${this.Usuite}/${this.module}/removes`,
                        method: 'post',
                        data: {
                            ids: this.ids.toString(),
                        }
                    }).then(res => {
                        this.$Message.info('批量删除数据成功');
                        this.getListData();
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        onCheckSelect(selection){
            var ids = [];
            console.log(selection);
            for (let i = 0;i<selection.length;i++){
                ids.push(selection[i]._id);
            }
            this.ids = ids;
        },
        onChange(page){
            this.filter.page = page;
            this.getListData();
        },
        onPageSizeChange(pageSize){
            this.filter.pageSize = pageSize;
            this.getListData();
        },
        onSearchClick(){
            if(this.isSelectNode){
                console.log('yes');
                this.getListData();
            }else{
                console.log('no');
                this.formValidate.nid='';
                this.getListData();
            }
        },
        getListData(){
            console.log(this.filter.newsid,'ffffffffff');
            this.axios({
            method:'post',
            url:`${this.Usuite}/${this.module}/list`,
            data: {
                page: this.filter.page,
                rows: this.filter.pageSize,
                username: this.filter.username,
                nid: this.filter.nid,
                n_title: this.filter.n_title,
                newsid: this.filter.newsid,
            }
            }).then(res=>{

                this.list = res.data.docs?res.data.docs:res.data.rows;
                console.log(res);
                this.filter.total = res.data.total;
            });
        },
        handleSubmit (name) {
            console.log('asdfasdfasdf',this.formValidate);

            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.stateId){
                        this.axios({
                            url: `${this.Usuite}/${this.module}/data/${this.stateId}`,
                            method: 'put',
                            data: this.formValidate
                        }).then(res=>{
                            this.$Message.success('数据修改成功');
                            this.addDataModal = false;
                            this.getListData();
                            this.stateId = 0;
                        })
                    }else{
                        console.log('adaadasdadadsasdadasd',this.formValidate);
                        this.axios({
                            url: `${this.Usuite}/${this.module}/data`,
                            method: 'post',
                            data: this.formValidate
                        }).then(res=>{
                            this.$Message.success('数据添加成功');
                            this.addDataModal = false;
                            this.getListData();
                        })
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            console.log(name);
            this.$refs[name].resetFields();
        }
    },

 }