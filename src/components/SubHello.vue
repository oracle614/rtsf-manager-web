<template lang="html">
  <div>
    <slot name="step_0"></slot>

    <slot name="step_1"></slot>

    <slot name="step_2"></slot>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: "SubHello",
    data() {
      return {
        project: {},
        ccase: {},
        case_requests: {},
      }
    },
  }
</script>
