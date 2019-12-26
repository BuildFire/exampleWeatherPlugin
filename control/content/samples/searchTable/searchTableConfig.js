
const searchTableConfig ={
	options:{
		showEditButton:true
		,showDeleteButton:true
	}
	,columns:[
		{
			header:"Name"
			,data:"${data.name.firstName} ${data.name.lastName}"
			,type:"string"
			,width:"150px"
			,sortBy: 'name.firstName'
		}
		,{
			header:"e-mail"
			,data:"${data.email}"
			,type:"string"
			,width:"150px"
			,sortBy: 'email'
		}
		,{
			header:"Credits"
			,data:"${data.credits}"
			,type:"number"
			,width:"50px"
			,sortBy: 'credits'
		}
		,{
			header:"Created On"
			,data:"${ new Date(data.createdOn).toLocaleDateString()  }"
			,type:"date"
			,width:"100px"
			,sortBy: 'createdOn'
		},
		{
			header: "Greetings"
			,command: "greeting"
			,text: "Say Hi"
			,type: "command"
			,width: "90px"
		}
	]

};