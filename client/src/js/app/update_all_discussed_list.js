function update_all_discussed_list(all_discussed_list){

	console.log("This is all_discussed_list on the frontend: ", all_discussed_list);

	localStorage.setItem("all_discussed_list", JSON.stringify(all_discussed_list));

	console.log("Updated localStorage all_discussed_list");

}