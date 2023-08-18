<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import TodoList from './todoList.svelte';
	import { API_URL, fetchApi } from '$lib/actions/common';
	import { Todos } from '../store/todo';

	
	let rate = 0;
	let task = '';
	/**
	 * @type {HTMLInputElement}
	 */
	let inputElement;

	/**
	 * @param {number} newRate
	 */
	function addRate(newRate) {
		rate = newRate;
	}

	onMount(() => {
		// Focus on the input field when the component mounts
		inputElement.focus();
	});

	function addTask() {
    fetchApi("POST",`${API_URL}/todos`,{
      title:task,
      userId:1,
      completed:false,
      rate
    }).then((data)=>{
		task = ''
      /* Todos.update((prevData)=>(
		{
			
			...prevData,
			[data.id-1]:data
			
		}
	  ))
	  Todos.subscribe((value)=>{
		console.log(value)
	  }) */
      //window.location.reload()
    })
	}
</script>

<div class="container">
	<header>
		<h2>Todo APP</h2>
		<div class="form-field">
			<div class="input-group">
				<div class="rate">
					{rate}
				</div>
				<input
					type="text"
					placeholder="Enter la tâche..."
					bind:this={inputElement}
					bind:value={task}
				/>
			</div>
			<button class="btn btn-submit" on:click={addTask}>Ajouter</button>
		</div>
		<div class="todo-rate">
			<button class="rate-item" on:click={() => addRate(5)}>5</button>
			<button class="rate-item" on:click={() => addRate(10)}>10</button>
			<button class="rate-item" on:click={() => addRate(15)}>15</button>
			<button class="rate-item" on:click={() => addRate(20)}>20</button>
		</div>

	</header>
  <section>
    <TodoList/>
  </section>
</div>

<style lang="scss">
	header {
		h2 {
			font-weight: 900;
		}
		.form-field {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 10px;
			width: 100%;
			input {
				width: 100%;
				height: 40px;
				border: 1px solid #ff3e00;
				border-radius: 0 8px 8px 0;
				text-indent: 15px;
				&:focus {
					outline: none;
					box-shadow: 0 0 1rem 0 #ff400091;
				}
			}
			.input-group {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
			}
			.rate {
				background-color: #ff3e00;
				padding: 15px;
				border-radius: 8px 0 0 8px;
				color: white;
			}
			button {
				height: 45px;
				border: 1px solid #ff3e00;
				border-radius: 8px;
				padding: 13px;
				color: #ff3e00;
				&:hover {
					background-color: #ff3e00;
					color: white;
					transition: background-color 0.5s ease-in-out;
					cursor: pointer;
					box-shadow: 0 0 1rem 0 #ff400091;
				}
			}
		}
		.todo-rate {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 10px;
			gap: 10px;
			.rate-item {
				padding: 0 10px;
				background-color: #ff3e00;
				border-radius: 50%;
				width: 40px;
				height: 40px;
				border: 1px solid white;
				text-align: center;
				color: white;
				border-color: #494949;
				&:hover {
					box-shadow: 0 0 1rem 0 #ff400091;
					transition: box-shadow 0.5s ease-in-out;
					cursor: pointer;
				}
			}
		}
	}
	@media screen and (max-width:780px){
		header{
			.form-field{
				width: 100%;
				input{
					width: 100%;
				}
			}
		}
	}
</style>
