function update_active_list(active_list){

	console.log("This is active_list on the frontend: ", active_list);

	localStorage.setItem("active_list", JSON.stringify(active_list));

	console.log("Updated localStorage active_list");

}