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
            <button type="submit" class="btn btn-primary" @click.prevent="forgotPassword">Submit</button>
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
        forgotPassword() {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/forgot-password',
                data: {
                    email: this.email,
                    password: this.password,
                }
            }).then(response => {
                this.errors = ''
                this.success = 'success'
                this.$router.push('/signin');
            }).catch(error => {
                this.success = '';
                if (error.response.status === 422) {
                    this.errors = error.response.data.data;
                } else {
                    this.errors = error.response.data.message
                }
            })
        }
    }
}
</script>