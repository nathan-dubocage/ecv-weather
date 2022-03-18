import { Spin } from "antd";

import "antd/dist/antd.css";
import "./Loader.scss";

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-full">
			<Spin size="large" />
		</div>
	);
};

export default Loader;
