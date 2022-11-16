<template>
    <div class="signup">
        <form class="needs-validation" novalidate>
            <span style="color: red;">{{ errors }}</span>
            <span style="color: green;">{{ success }}</span>
            <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="password" class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="password" v-model="password">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="signIn">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: 'a@gmail.com',
            password: 'a23456789aA!',
            errors: '',
            success: ''
        }
    },

    methods: {
        signIn() {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/login',
                data: {
                    email: this.email,
                    password: this.password,
                }
            }).then(response => {
                this.errors = ''
                this.success = 'success'
                localStorage.access_token = response.data.data.access_token;
                this.$router.push('/');
                this.$router.go()
            }).catch(error => {
                this.success = '';
                if (response.status === 422) {
                    this.errors = error.response.data.data;
                } else {
                    this.errors = error.response.data.message
                }
                this.$router.go()
            })
        }
    }
}
</script>