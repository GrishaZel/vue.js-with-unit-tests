<template>
  <ul class="column">
    <li
      v-if="isMobile && columnNumber > 1"
      class="column__item column__item-back"
      @click="handleBackClick"
    >Назад</li>
    <li v-for="item in items" :key="item.id" class="column__item">
      <a
        class="column__link"
        :class="{'column__link-active': selectedItemIdx === item.id}"
        :href="(!isMobile || (isMobile && !item.submenu)) && pathParent + item.slug"
        :title="item.name"
        @click="isMobile && handleClick(item, item.id)"
        @mouseenter="(!isMobile && item.submenu && !(selectedItemIdx === item.id)) && handleMouseEnter(item, item.id)"
        @mouseleave="handleMouseLeave"
      >
        <span>{{ item.name }}</span>
        <img v-if="item.submenu" src="~/assets/icons/next.svg" />
      </a>
    </li>
  </ul>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Column",
  props: ["items", "columnNumber", "pathParent", "isMobile"],
  data() {
    return {
      selectedItemIdx: null,
      timeoutId: null
    };
  },
  methods: {
    ...mapMutations({
      toggleVisibleMenu: "the_menu/TOGGLE_VISIBLE_MENU"
    }),
    handleBackClick() {
      this.$emit("getPrevColumn");
    },
    handleClick(item, index) {
      if (!item.submenu) return this.toggleVisibleMenu();

      this.selectedItemIdx = index;
      this.$emit("getNextColumn", {
        column: item.submenu,
        columnNumber: this.columnNumber,
        slug: this.pathParent + item.slug + "/"
      });
    },
    handleMouseEnter(item, index) {
      this.timeoutId = setTimeout(() => {
        this.selectedItemIdx = index;

        this.$emit("getNextColumn", {
          column: item.submenu,
          columnNumber: this.columnNumber,
          slug: this.pathParent + item.slug + "/"
        });
      }, 400);
    },
    handleMouseLeave() {
      clearTimeout(this.timeoutId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";

.column {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  padding: 0;
  max-width: 100%;
  width: 100%;
  height: calc(100vh - 142px);
  background-color: #fff;
  font-size: 0;
  z-index: 1;
  overflow-y: auto;

  @media screen and (min-width: $screen-md) {
    height: calc(100vh - 84px);
    max-width: 350px;
  }

  &__item {
    border-bottom: 1px solid #bdbdbd;
    &-back {
      font-size: 16px;
      padding: 10px 15px;
      font-weight: 500;
      border-bottom: 1px solid black;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 15px;
    color: #333;
    font-size: 14px;

    @media screen and (min-width: $screen-md) {
      padding: 15px;
    }

    &-active,
    &:hover {
      background-color: #ede5f5;
    }

    span {
      white-space: nowrap;
      max-width: 270px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    img {
      width: 15px;
    }
  }
}
</style>
