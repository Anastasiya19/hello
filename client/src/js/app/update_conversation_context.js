function update_conversation_context(conversation_context){

	console.log("This is conversation_context on the frontend: ", conversation_context);

	localStorage.setItem("conversation_context", JSON.stringify(conversation_context));

	console.log("Updated localStorage");

}