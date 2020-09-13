<template>
  <div class="home">
    <heads/>
    <subject/>
  </div>
</template>

<script>
import heads from '@/components/heads/heads.vue'
import subject from '@/components/subject/subject.vue'
export default {
  name: 'Home',
  components: {
    heads,subject
  }
}
</script>
