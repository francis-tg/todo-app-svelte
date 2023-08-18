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
					Todos.set(getdata);
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
		fetchApi('PUT', `${API_URL}/todos/${todo.id}`, { ...todo})
			.then((getdata) => {
				//Todos.set(getdata)
			})
			.catch((error) => {
				console.error('Erreur lors de la requête:', error);
			});
	}
</script>

<div class="container">
	{#each datas as todo (todo.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class={'todo ' + (todo.completed ? 'complete' : '')}
			on:dblclick={() => setComplete(todo)}
		>
			<h4 class="title">{todo.title}</h4>
			<div class="rate">
				{todo.rate ?? 0}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		.todo {
			background: tomato;
			padding: 8px;
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
