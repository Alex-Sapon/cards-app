import {makeStyles, styled} from "@mui/styles";
import {Avatar} from "@mui/material";

export const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '400px',
		maxHeight: '800px',
		background: '#f9f9fe',
		margin: '20px auto 0',
		padding: '20px 20px 20px 20px',
		borderRadius: ' 8px',
	},
	profileWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '8px',
	},
	profileLogOutButton: {
		display: 'flex',
		justifyContent: 'flex-end',
	},

	title: {
		margin: '1.25em'
	},

	button: {
		margin: '30px',
		width: '127px',
		height: '36px',
	},

	nickName: {
		display: "flex",
		justifyContent: 'center',
		padding: '20px 0 5px 0'
	},
	name: {
		padding: '0 5px 0 5px'
	},

	information: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	description: {
		margin: '10px 0 20px 0',
	}

}))
export const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 32,
	height: 32,
}));