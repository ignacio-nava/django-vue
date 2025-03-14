<script setup lang="ts">
import { logout } from '@/api/authApi';
import { routes } from '@/routes';

const handleLogout = async () => {
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    if (userConfirmed) {
        try {
            const response = await logout();
        } catch (error) {
            console.error(error)
        } finally {
            window.location.href = routes.home.path as string;
        }
        
    }
}
</script>

<template>
    <button @click="handleLogout" class="button-normal fs-090">Logout</button>
</template>