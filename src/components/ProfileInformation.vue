<template>
<b-container id="CProfileInformation" fluid class="d-flex flex-column
  align-items-center pt-5">
  <b-container fluid class="d-flex align-items-center flex-column"
               v-if="!load_error && user_id.length > 0">
    <div v-if="user_avatar" class="mb-2">
      <b-avatar :src="user_avatar" size="15rem"></b-avatar>
    </div>
    <div v-else>
      <b-avatar size="15rem" class="mb-3" variant="dark"></b-avatar>
    </div>
    <p>{{user_first_name + " " + user_last_name}}</p>
    <p v-if="user_status">{{ user_status }}</p>
    <p v-else><i>У пользователя нет статуса</i></p>
    <p v-if="user_online"><i>Пользователь сейчас онлайн!</i></p>
  </b-container>
  <div v-else>
    <b-alert show variant="danger" v-if="load_error">Пользователя не существует.</b-alert>
  </div>
  <b-row class="w-100" align-h="center">
    <b-col sm="12" md="8" lg="6">
      <b-form-input fluid v-model="user_id"
                    placeholder="Введите ID или короткое имя пользователя"/>
    </b-col>
  </b-row>

</b-container>
</template>

<script>
const fetchJsonp = require('fetch-jsonp');

export default {
  name: 'ProfileInformation',
  data() {
    return {
      user_id: '',
      load_error: false,
      user_status: null,
      user_avatar: null,
      user_online: false,
      user_first_name: '',
      user_last_name: '',
    };
  },
  computed: {
  },
  watch: {
    user_id(userID) {
      fetchJsonp(`https://api.vk.com/method/users.get?lang=0&user_ids=${userID}&fields=has_photo,photo_max_orig,online,status&access_token=${process.env.VUE_APP_VK_KEY}&v=5.103`)
        .then((response) => response.json()).then((json) => {
          if (json.error) {
            this.user_avatar = null;
            this.user_status = null;
            this.load_error = true;
          } else {
            this.load_error = false;

            const user = json.response[0];
            if (user.has_photo === 1) {
              this.user_avatar = user.photo_max_orig;
            } else {
              this.user_avatar = null;
            }
            this.user_status = user.status;
            this.user_online = user.online === 1;
            this.user_first_name = user.first_name;
            this.user_last_name = user.last_name;
          }
        }).catch(() => {
          this.user_avatar = null;
          this.user_status = null;
        });
    },
  },
};
</script>


<style scoped>

</style>
