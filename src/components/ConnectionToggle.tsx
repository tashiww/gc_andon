export default function ConnectionToggle(props: { clickHandler: any, connected: Boolean, }) {
	const background = props.connected ? 'green' : 'red';

	return (
		<div onClick={props.clickHandler} id="ConnectionToggle" style={{backgroundColor: background}}> </div>
	);
}