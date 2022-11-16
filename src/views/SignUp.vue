<template>
    <div class="signup">
        <form class="needs-validation" novalidate>
            <span style="color: red;">{{ errors }}</span>
            <span style="color: green;">{{ success }}</span>
            <div class="mb-3 row">
                <label for="name" class="col-sm-3 col-form-label">Name</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="name" v-model="name">
                </div>
            </div>
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
            <div class="mb-3 row">
                <label for="password-confirm" class="col-sm-3 col-form-label">Password Confirm</label>
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="password-confirm" v-model="passwordConfirm">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="signUp">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: 'a',
            email: 'a@gmail.com',
            password: 'a23456789aA!',
            passwordConfirm: 'a23456789aA!',
            errors: '',
            success: '',
        }
    },

    methods: {
        signUp() {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirm,
                }
            }).then(response => {
                this.errors = ''
                this.success = 'success'
                
            }).catch(error => {
                this.success = '';
                this.errors = error.response.data.data;
            })
        }
    }
}
</script>
