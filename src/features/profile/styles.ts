import {makeStyles, styled} from "@mui/styles";
import {Avatar} from "@mui/material";

export const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '500px',
		background: '#f9f9fe',
		margin: '20px auto 0',
		padding: '20px 30px 50px 30px',
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
		display: 'flex',
		alignItems: 'center',
		fontSize: '20px',
		marginBottom: '2em',
	},
	button: {
		width: '127px',
		height: '36px',
	},
	information: {
		width: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		marginBottom: '2rem',
	},
	nickName: {
		display: "flex",
		alignItems: 'center',
		marginBottom: '1rem',
	},
	name: {
		width: '100%',
	},
	email: {
		marginBottom: '1rem',
	},
	subtitle: {
		marginRight: '1rem',
		fontSize: '16px',
		fontWeight: '600'
	}
}))

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 36,
	height: 36,
}));