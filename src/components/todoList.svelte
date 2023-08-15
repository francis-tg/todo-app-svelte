<script lang="ts">
    import type TodoInterface from "$lib/Interfaces";
	import { API_URL, fetchApi } from "$lib/actions/common";
	import { onMount } from "svelte";
  let datas:TodoInterface[] = []
    onMount(()=>{
        
    fetchApi(
     "GET",
     `${API_URL}/todos/`,
     null
).then((getdata) => {
    datas = getdata; // Assignez les données récupérées à la variable datas
}).catch((error) => {
    console.error('Erreur lors de la requête:', error);
});
    })
</script>
<div class="container">
    {#each datas as todo}
        <div class={"todo " + (todo.completed ? "complete" : "")}>
            <h4 class="title">{todo.title}</h4>
            <div class="rate">
                {todo.rate??0}
            </div>
        </div>
    {/each}
</div>
<style lang="scss">
    .container{
        .todo{
            background: tomato;
            padding: 8px;
            margin-bottom: 10px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .complete{
                border-left: 5px solid #0059ff;
            }
            .rate{
                background-color: white;
                padding: 10px;
                width: 20px;
                height: 20px;
                text-align: center;
                border-radius: 50%;
            }
        }
    }
</style>