<template>
  <g :transform="transformValue">
      <g :class="resourceTypeClass" class="tile">
          <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
          <text dy="0.4em" transform="rotate(30)">
              <tspan :x="textCenterValue" y="0">{{value}}</tspan>
          </text>
      </g>
  </g>      
</template>

<script>
export default {
  name: 'Tile',
  props: {
    id: Number,
    qValue: Number,
    rValue: Number,
    value: Number,
    resourceType: String,
    blocked: Boolean
  },
  computed: {
    resourceTypeClass() {
      return this.resourceType;
    },
    transformValue() {
      return 'translate(' + this.qValue + ',' + this.rValue + ')';
    },
    textCenterValue() {
      if(this.value > 9) {
        return '-35';
      }

      return '-15';
    }
  }
};
</script>

<style scoped lang="scss">
.tile {
  stroke: white;
  font-size: 60px;

  text {
    fill: white;
  }

  &.brick {
    fill: #ca5826;
  }

  &.wool {
    fill: #94b949;
  }

  &.ore {
    fill: #98a295;
    fill: #808a7d
  }

  &.wheat {
    fill: #e6c03d;
  }

  &.wood {
    fill: #448e44;
  }

  &.sand {
    fill: tan;
    fill: #d4c4ae;
    // fill: black;
    // stroke: transparent;
    // stroke-width: 0.25rem;
    font-size: 0;
  }
}

</style>
