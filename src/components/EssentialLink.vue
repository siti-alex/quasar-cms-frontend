<template>
  <div class="q-pa-md q-gutter-sm" v-if="tree">
<!--    <q-btn @click="hello">{{tree.name}}</q-btn>-->
    <div>
      <div class="q-gutter-sm">
      </div>
    </div>
    <q-tree
      :nodes="tree"
      v-model:selected="select"
      v-model:expanded="expanded"
      selected-color="primary"
      no-connectors
      no-selection-unset
      @click="pushHtml"
      children-key="treeSection"
      node-key="id"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center" >
          <div>{{ prop.node.name }}</div>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import { ref } from 'vue'
import Api from 'boot/axios'

export default {
  setup () {
    const selected = ref(null);

    return {
      selected,

      selectGoodService () {
        if (selected.value !== 'Good service') {
          selected.value = 'Good service'
        }
      },

      unselectNode () {
        selected.value = null
      },
      expanded: ref([1]),

    }
  },
  props: {
    // tree: null,
  },
  data() {
    return {
      tree: [],
      select: null,
    }
  },
  methods: {
    getSections() {
     Api.getSections().then((response) => {
       this.tree = response.data.treeSection;
       console.log(this.tree);
     })
    },
    test(id){
      console.log(id);
    },
    pushHtml(){
      this.tree[0].treeSection.forEach((item) => {
        if(item.id == this.select) {
          this.$emit('pushHtml', item);
        }
      })
    },
    getSectionById(id){
      Api.getSectionById(id).then((response) => {
        console.log(response);
      })
    },
  },
  watch: {
    // select: function (){
    //   if(this.select == null) this.select = localStorage.getItem('selected');
    //   else localStorage.setItem('selected',this.select);
    // }
  },
  created () {
    this.getSections();
  }
}
</script>
