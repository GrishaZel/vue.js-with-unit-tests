<template>
  <div>
    <div class="overlay"></div>

    <div class="wrapper">
      <Column
        v-if="isMobile"
        :columnNumber="columns.length"
        :items="columns[columns.length - 1].data"
        :pathParent="columns[columns.length - 1].pathParent"
        :isMobile="isMobile"
        @getNextColumn="getNextColumn"
        @getPrevColumn="getPrevColumn"
      />
      <Column
        v-else
        v-for="(column, index) in columns"
        :key="index"
        :columnNumber="index"
        :items="column.data"
        :pathParent="column.pathParent"
        :isMobile="isMobile"
        @getNextColumn="getNextColumn"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import Column from "./Column.vue";

export default {
  name: "index",
  components: {
    Column
  },
  data() {
    return {
      columns: [],
      isMobile: false
    };
  },
  computed: {
    ...mapState({
      dataMenu: state => state.the_menu.menu
    })
  },
  mounted() {
    this.checkMobile();
  },
  created() {
    this.columns = [
      {
        pathParent: "/catalog/",
        data: this.dataMenu
      }
    ];
  },
  methods: {
    checkMobile(remove) {
      const mql = window.matchMedia("screen and (max-width: 768px)");
      this.isMobile = mql.matches;
      mql.addListener(e => (this.isMobile = e.matches));
    },
    getPrevColumn() {
      this.columns.splice(-1, 1);
    },
    getNextColumn({ column, columnNumber, slug }) {
      const { columns, data } = this;

      const newColumn = {
        pathParent: slug,
        data: column
      };

      if (columns[columnNumber]) {
        return columns.splice(columnNumber + 1, columns.length, newColumn);
      }
      columns.push(newColumn);
    }
  }
};
</script>

<style lang="scss">
@import "~assets/variables.scss";

.wrapper {
  position: absolute;
  top: 142px;
  left: 0;
  display: block;
  width: 100%;
  z-index: 1;

  @media screen and (min-width: $screen-md) {
    top: 84px;
    display: flex;
    align-items: center;
  }
}

.overlay {
  position: absolute;
  top: 142px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;

  @media screen and (min-width: $screen-md) {
    top: 84px;
  }
}
</style>
