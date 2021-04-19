export const initialState = {
	isLoading: true,
	userToken: null,
	email: null,
}

export const loginReducer = (prevState , action) => {
	switch(action.type ){
		case 'RETRIVE_TOKEN':
			return {
				...prevState,
				userToken: action.token,
				isLoading:false,
			};
		case 'LOGIN':
			return {
				...prevState,			
				email: action.id,
				userToken: action.token,
				isLoading:false,
			};
		case 'LOGOUT':
			return {
				...prevState,
				email: null,
				userToken: null,
				isLoading:false,
			};
		case 'REGISTER':
			return {
				...prevState,
				email: action.id,
				userToken: action.token,
				isLoading:false,
			};
		case 'LOADING':
			return {
				...prevState,
				isLoading:true,
			};

	}
}



