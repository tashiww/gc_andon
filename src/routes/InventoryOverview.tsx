import ConnectionToggle from "../components/ConnectionToggle";

export default function InventoryOverview(props: {connectionToggler: any, connected: Boolean}) {
	return (
		<div>
			<h1>hello</h1>
			<ConnectionToggle clickHandler={props.connectionToggler} connected={props.connected} />
			
		</div>
	)}
