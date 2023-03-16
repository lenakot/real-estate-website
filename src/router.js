import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Views/Index.vue'
import About from '@/Views/About.vue'
import HouseDetails from '@/Views/HouseDetails.vue'
import Delete from '@/Views/Delete.vue'
import Form from '@/Views/Form.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/house-details',
            name: 'Detail',
            component: HouseDetails
        },
        {
            path: '/house-details/delete',
            name: 'Delete',
            component: Delete
        },
        {
            path: '/listing-form',
            name: 'Form',
            component: Form
        }

        // {
        //     path: '/products/:id',
        //     name: 'Product',
        //     component: Product,
        // }
    ]
})

export default router;