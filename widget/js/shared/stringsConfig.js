const stringsConfig = {
	screenOne: {
		title: "Screen One"
		, subtitle: "Strings that are used Screen One"
		, labels: {
			loading: {
				title: "loading"
				, placeholder: "loading..."
				, maxLength: 60
				, defaultValue: "loading..."
			}
			, welcomeMessage: {
				title: "Message shown to users the first time they open the app. To insert the user's name add ${user}"
				,defaultValue:"Welcome to your app"
				, placeholder: "enter message here"
				, maxLength: 500
				, required: true
				, inputType: "wysiwyg"
			}
		}
	}
	, screenTwo: {
		title: "Screen Two"
		//, subtitle: "This is an optional text to clear things up for the user"
		, labels: {
			noMatches: {
				title: "Message to show when no matches found."
				, placeholder: "enter message here"
				, defaultValue: "Sorry no matches found. Please try again latter"
				, maxLength: 600
				, inputType: "wysiwyg"
			}
		}
	}

};
