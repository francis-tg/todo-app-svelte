<script lang="ts">
	import type TodoInterface from '$lib/Interfaces';
	import { API_URL, fetchApi } from '$lib/actions/common';
	import { onMount } from 'svelte';
	import { Todos } from '../store/todo';
	let datas: TodoInterface[] = [];
	onMount(() => {
		const autoUpdata = setInterval(() => {
			fetchApi('GET', `${API_URL}/todos/`, null)
				.then((getdata) => {
					Todos.set(getdata.reverse());
				})
				.catch((error) => {
					console.error('Erreur lors de la requête:', error);
				});

			Todos.subscribe((value) => {
				datas = value;
			});
		}, 2000);
		return () => {
			clearInterval(autoUpdata);
		};
	});
	function setComplete(todo:TodoInterface) {
        todo.completed = !todo.completed;
		fetchApi('PUT', `${API_URL}/todos/${todo._id}`, { ...todo})
			.then((getdata) => {
				//Todos.set(getdata)
			})
			.catch((error) => {
				console.error('Erreur lors de la requête:', error);
			});
	}
    function removeTodo(id:string){
        fetchApi('DELETE', `${API_URL}/todos/${id}`, {})
			.then((getdata) => {
				//Todos.set(getdata)
			})
			.catch((error) => {
				console.error('Erreur lors de la requête:', error);
			});
    }
</script>

<div class="container">
	{#each datas as todo (todo._id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class={'todo ' + (todo.completed ? 'complete' : '')}
			on:dblclick={() => setComplete(todo)}
		>
        <button class="remove-btn" on:click={()=>removeTodo(todo._id)}>
            &times;
        </button>
			<h4 class="title">{todo.title}</h4>
			<div class="rate">
				{todo.rate ?? 0}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
        width: 100%;
		.todo {
            position: relative;
			background: tomato;
			padding: 8px 15px;
			margin-bottom: 10px;
			border-radius: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
            cursor: pointer;
			&.complete {
                opacity: .5;
				border-left: 5px solid #0059ff;
			}
            .remove-btn{
                position: absolute;
                top: -8px;
                right: -5px;
                border: none;
                background-color: tomato;
                color: white;
                border-radius: 50%;
                font-size:25px;
                cursor: pointer;
            }
			.rate {
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
