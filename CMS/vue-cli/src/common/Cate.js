export const Cate = {
        data () {
            return {
                treeList: [],
            }
        },
        
        methods: {
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
