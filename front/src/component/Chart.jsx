import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchWithoutBody } from '../function';
import { useState, useEffect } from 'react';

const Chart = () => {
	const [getData, setGetData] = useState([]);
	const [data, setData] = useState([]);
	const getMonth = () => {
		return fetchWithoutBody('/api/records/month', 'get').then((data) => setGetData(data.data));
	};

	useEffect(() => {
		getMonth();
	}, []);

	useEffect(() => {
		setData(
			getData.map((detail) => {
				return {
					x: detail.sleep_time,
					y: detail.game_score,
				};
			})
		);
	}, [getData]);

	return (
		<ResponsiveContainer width="100%" height={400}>
			<ScatterChart
				margin={{
					top: 20,
					right: 20,
					left: 20,
					bottom: 20,
				}}
			>
				<CartesianGrid />
				<XAxis type="number" dataKey="x" name="sleep" unit="h" />
				<YAxis type="number" dataKey="y" name="score" unit="pt" />
				<Tooltip cursor={{ strokeDasharray: '3 3' }} />
				<Scatter name="MONTH SCORE" data={data} fill="#E7674C" />
			</ScatterChart>
		</ResponsiveContainer>
	);
};

export default Chart;
