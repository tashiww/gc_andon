import { SlotElement } from "../types/GCDebug";
// import referenceData from "../config/gamedata.json";
import { Gamedata, MaterialValue } from "../types/GCGameData";

export default function ItemList(props: {data: SlotElement[]}) {

	const list = props.data.map((slot, index) => {
		const MaterialID = slot.Material?.MaterialID ?? "";
		const amount = slot.Material?.Amount ?? 0;
		const gameData: Gamedata  = require('../config/gamedata.json');
		return (<li key={index}>{amount} {gameData.Materials[MaterialID].Name}</li>
	)}
	);

	return (
		<ul>
		{list}
		</ul>
	);
}