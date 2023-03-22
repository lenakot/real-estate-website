import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Views/Index.vue'
import About from '@/Views/About.vue'
import HouseDetails from '@/Views/HouseDetails.vue'
import CreateNewListing from '@/Views/CreateNewListing.vue'
import EditListing from '@/Views/EditListing.vue'


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
            path: '/house/:id',
            name: 'Detail',
            component: HouseDetails
        },
        {
            path: '/create-new-listing',
            name: 'CreateNewListing',
            component: CreateNewListing
        },
        {
            path: '/edit-listing/:id',
            name: 'EditListing',
            component: EditListing
        }
    ]
})

export default router;