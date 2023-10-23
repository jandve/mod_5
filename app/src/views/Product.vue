<template>
    <div class="container">
        <h5>Productos</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()" >
                    <h5>Nueva Producto</h5>
                    <p>Nombre producto: <input type="text" v-model="payload.name" required/></p>
                    <p>Precio: <input type="text" v-model="payload.price" required/></p>
                    <p v-if="categories.length > 0">
                        <select v-model="payload.categoryId">
                            <option :value="category.id" v-for="category in categories">{{category.name}}</option>
                        </select>
                    </p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
                <div class="card-content">
                    <form @submit.prevent="getList()">
                        <h5>Buscar producto</h5>
                        <p>Nombre Producto: <input type="search" v-model="search" @search="getList()" /></p>
                        <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                    </form>
                </div>
            </div>
    
        <div class="card">
                <div class="card-content">
                    <h5>filtros</h5>
                    <div class="input-field ">
                        <select @change="filter('categoryId',$event.target.value)">
                            <option :value="category.id" v-for="category in categories">{{category.name}}</option>
                        </select>
                        <label>Materialize Select</label>
                    </div>
        
                </div>
            </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.category.name}}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(item.id)" >delete</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            search: '',
            toFilter: '',
            categories: [],
            payload: {
                name: null,
                price: null,
                categoryId: null
            }
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = value === '' ? '' : '&' + name + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/product/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/products/' + id
                }).
                then((response) => {
                    this.getList();
                }).
                catch((error) => {
                    console.log(error);
                });
            }
        },
        nuevo() {
            this.axios({
                method: 'post',
                url: this.api + '/products',
                data: this.payload
            }).
            then((response) => {
                this.getList();
                console.log(response);
            }).
            catch((error) => {
                console.log(error);
            });
        },
        getList(name, value) {

            this.axios({
                method: 'get',
                url: this.api + '/products?_expand=category&q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.items = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        },
        getCategoryList() {

            this.axios({
                method: 'get',
                url: this.api + '/categories'
            }).
            then((response) => {
                this.categories = response.data;
                const intervalo = setTimeout(() => {
                    this.intSelect(); 
                    clearTimeout(intervalo);
                }, 3000);
                
            }).
            catch((error) => {
                console.log(error);
            })
        },
        intSelect(){
            this.getList();
            this.getCategoryList();
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        this.getCategoryList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>
