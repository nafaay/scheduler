import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const {days, day, setDay} = props;

	const daysToRender = days.map(({id, name, spots}) => {
		const passProps = {
			key: id,
			selected: day === name,
			name,
			setDay,
			spots
		};
		return <DayListItem {...passProps} />;
	});

	return <ul>{daysToRender}</ul>;
}