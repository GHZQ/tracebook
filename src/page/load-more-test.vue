<template>
  <div>
    <mt-loadmore :top-method="loadTop"
                 :bottom-method="loadBottom"
                 ref="loadmore">
      <ul>
        <li v-for="item in list"
            :key="item">{{ item }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: 'loadMoreTest',
  data () {
    return {
      list: [
        'create_time',
        'update_time',
        'creater_id',
        'updater_id',
        'external_code',
        'external_id',
        'status',
        'name',
        'sub_title',
        'edit_mode',
        'title',
        'enable_status',
        'audit_status',
        'icon',
        'publish_date',
        'online_date',
        'description',
        'viewpoints',
        'keywords',
        'area',
        'code',
        'cp_code',
        'biz_domain',
        'copyright_begin',
        'copyright_end',
        'ver',
        'is_publish',
        'is_refer',
        'reserve1',
        'reserve2',
        'reserve3',
        'reserve4',
        'reserve5',
        'content',
        'program_id'
      ]
    }
  },
  methods: {
    loadTop () {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom () {

    }
  }
}
</script>

<style scoped>
</style>
