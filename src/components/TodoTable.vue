<template>
    <div class="w-fit flex flex-col items-center">

        <div class="flex mt-2 mx-1 w-fit  justify-center items-center">
            <input type="text" placeholder="enter new task" v-model="newTask"
                class="w-full  px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out duration-500 focus:text-gray-700 focus:bg-white focus:border-sky-400 focus:outline-none">
            <button class="rounded ml-1 p-1.5 border-2 border-white focus:border-sky-300 text-white"
                @click="addTask">ADD</button>
        </div>



        <div v-if="isLoading" class="text-sky-400 text-3xl mt-10 mb-6">
            <img :src="loader" alt="loader" class="m-auto">
        </div>
        <div v-else-if="tasks.length < 1">
            <p class="font-bold  mt-10 p-2 rounded-sm flex justify-center items-center w-full bg-black text-gray-500">
                Nothing yet to
                show! Why don't you add some todos :D</p>
        </div>
        <div v-else class=" mt-5 rounded-sm flex justify-center items-center w-fit relative">

            <table class="table-fixed  rounded-lg  border-2 w-full  sm:w-11/12 bg-black h-full">
                <thead class="bg-sky-500 border-b-2">
                    <tr class="border-2">
                        <th class="py-1  w-5 text-lg text-slate-200">#</th>
                        <th class="text-lg text-slate-200 w-full">Task</th>
                        <th class="text-lg text-slate-200 w-7 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class='h-5 w-full text-green-100'
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd" />
                            </svg>
                        </th>
                        <th class="text-lg text-slate-200 mx-10 w-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class='h-5 w-full text-red-600' viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd" />
                            </svg>
                        </th>
                    </tr>
                </thead>
                <tbody class='bg-slate-200'>

                    <tr v-for="(task, index) in tasks" :key="index"
                        class="m-10 border-2 border-black bg-white rounded-md">
                        <td class="text-center py-2 w-5 ">{{ index + 1 + '.' }}</td>
                        <td class="text-center cursor-pointer w-fit overflow-hidden flex-wrap"
                            :class="{ completion: task.completion }" @click="toggleTask(index)">{{
                                    task.name
                            }}</td>

                        <td class="w-5">

                            <svg xmlns="http://www.w3.org/2000/svg" class='h-5 w-full text-green-600 cursor-pointer'
                                viewBox="0 0 20 20" fill="currentColor" @click="editTask(index)">
                                <path
                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd" />
                            </svg>

                        </td>
                        <td class='w-5'>

                            <svg xmlns="http://www.w3.org/2000/svg" class='h-5 w-full text-red-600 cursor-pointer'
                                viewBox="0 0 20 20" fill="currentColor" @click="deleteTask(index)">
                                <path fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd" />
                            </svg>

                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '@/fb'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import loaderGif from '@/assets/loader.gif'

export default {

    name: "TodoTable",
    setup() {
        const isLoading = ref(true)
        const tasksID = ref([])
        const loader = ref(loaderGif)
        const tasks = ref([]);
        const newTask = ref(null);
        const editedTask = ref(null);
        onMounted(async () => {
            const querySnapshot = await getDocs(collection(db, "todos"));
            if (querySnapshot.empty) {
                console.log("No matching documents.");
                isLoading.value = false;
                return;
            } else {
                isLoading.value = false;
                querySnapshot.forEach((doc) => {
                    console.log("on mounted")
                    tasksID.value.push(doc.id)
                    tasks.value.push(doc.data())
                });
                tasks.value.sort((a, b) => {
                    return a.date - b.date
                }).reverse()
                console.log("on sorting")
                console.log(tasksID.value)
            }

        })

        const addTask = async () => {
            if (newTask.value && editedTask.value === null) {
                const todo = {
                    name: newTask.value,
                    completion: false,
                    date: new Date()
                }
                tasks.value.unshift(todo);
                try {
                    const docRef = await addDoc(collection(db, "todos"), todo);
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                const querySnapshot = await getDocs(collection(db, "todos"));
                console.log("before getting")
                tasks.value = []
                tasksID.value = []
                querySnapshot.forEach((doc) => {
                    console.log("on updated")
                    console.log(doc.data())
                    tasksID.value.push(doc.id)
                    tasks.value.push(doc.data())
                });
                console.log("on updated")
                tasks.value.sort((a, b) => {
                    return a.date - b.date
                }).reverse()
                console.log("on sorting")
                console.log(tasksID.value)
                newTask.value = null;
            }
            else {
                tasks.value[editedTask.value].name = newTask.value;
                const updated = doc(db, "todos", tasksID.value[editedTask.value]);
                await updateDoc(updated, {
                    name: tasks.value[editedTask.value].name
                });
                console.log("on updated", tasks.value[editedTask.value].name)
                editedTask.value = null;
                newTask.value = null;
            }
        };
        const editTask = (index) => {
            newTask.value = tasks.value[index].name;
            editedTask.value = index;
        };
        const deleteTask = async (index) => {
            tasks.value.splice(index, 1);
            await deleteDoc(doc(db, "todos", tasksID.value[index]));
            const item = tasksID.value.indexOf(index);
            if (item > -1) { // only splice array when item is found
                tasksID.value.splice(item, 1); // 2nd parameter means remove one item only
            }
        };
        const toggleTask = async (index) => {
            tasks.value[index].completion = !tasks.value[index].completion;
            const updated = doc(db, "todos", tasksID.value[index]);
            await updateDoc(updated, {
                completion: tasks.value[index].completion
            });
            console.log("on toggling", tasks.value[index].completion)
        };
        return {
            tasks,
            newTask,
            editedTask,
            addTask,
            editTask,
            deleteTask,
            toggleTask,
            isLoading,
            loader,
            tasksID
        }
    }

}


</script>

<style scoped>
.completion {
    text-decoration: line-through;
}

.statusGreen {
    color: green;
}

.statusRed {
    color: red;
}
</style>
